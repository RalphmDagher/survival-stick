/*
 * Offline support seen from the page: registers the service worker and — most
 * importantly — VERIFIES what is really stored before the interface is allowed
 * to say "Offline ready".
 *
 * status values
 *   unsupported : this browser (or an insecure http:// address) cannot store the app
 *   checking    : not verified yet
 *   not-saved   : nothing stored
 *   saving      : download in progress
 *   incomplete  : some files stored, not all — NOT safe to rely on offline
 *   ready       : every file of offline-manifest.js is in the cache AND a
 *                 service worker is active to serve them
 */
const MANIFEST = self.SS_MANIFEST || { version: 'unknown', files: [] };
const CACHE = 'survival-stick-' + MANIFEST.version;

export const VERSION = MANIFEST.version;
export const supported = 'serviceWorker' in navigator && 'caches' in window && window.isSecureContext;

const listeners = new Set();
let state = {
  status: supported ? 'checking' : 'unsupported',
  cached: 0,
  total: MANIFEST.files.length,
  updateWaiting: false,
  online: navigator.onLine,
  error: ''
};
let saving = false;
let reloadOnTakeover = false;

function set(patch) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn(state));
}

export function getOfflineState() {
  return state;
}

export function subscribeOffline(fn) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

const absolute = (file) => new URL(file, document.baseURI).href.split('#')[0];

async function countCached() {
  if (!(await caches.has(CACHE))) return 0;
  const cache = await caches.open(CACHE);
  let count = 0;
  for (const file of MANIFEST.files) {
    if (await cache.match(absolute(file))) count++;
  }
  return count;
}

/** Re-check what is really stored and update the status. */
export async function verifyOffline() {
  if (!supported) return state;
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    const cached = await countCached();
    const active = Boolean(registration && registration.active);
    let status;
    if (cached === state.total && state.total > 0 && active) status = 'ready';
    else if (saving || (registration && registration.installing && !registration.active)) status = 'saving';
    else status = cached > 0 ? 'incomplete' : 'not-saved';
    set({ status, cached, updateWaiting: Boolean(registration && registration.waiting && registration.active) });
  } catch (error) {
    set({ status: 'incomplete', error: String(error && error.message ? error.message : error) });
  }
  return state;
}

function watch(registration) {
  const track = (worker) => {
    if (!worker) return;
    worker.addEventListener('statechange', () => verifyOffline());
  };
  track(registration.installing);
  registration.addEventListener('updatefound', () => {
    track(registration.installing);
    verifyOffline();
  });
}

/** Called once at start-up. The first online visit begins saving automatically. */
export async function initOffline() {
  window.addEventListener('online', () => set({ online: true }));
  window.addEventListener('offline', () => set({ online: false }));
  if (!supported) return;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloadOnTakeover) window.location.reload();
    else verifyOffline();
  });

  try {
    const registration = await navigator.serviceWorker.register('service-worker.js', { updateViaCache: 'none' });
    watch(registration);
  } catch (error) {
    set({ error: String(error && error.message ? error.message : error) });
  }
  await verifyOffline();
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * "Save emergency guides for offline use": downloads every missing file, then
 * verifies. Resolves with the verified state — never assumes success.
 */
export async function saveForOffline() {
  if (!supported || saving) return state;
  saving = true;
  set({ status: 'saving', error: '' });
  let failure = '';
  try {
    const registration = await navigator.serviceWorker.register('service-worker.js', { updateViaCache: 'none' });
    watch(registration);
    const cache = await caches.open(CACHE);
    for (const file of MANIFEST.files) {
      const url = absolute(file);
      if (await cache.match(url)) continue;
      const response = await fetch(url, { cache: 'reload' });
      if (!response.ok) throw new Error(`${file} (HTTP ${response.status})`);
      await cache.put(url, response);
      set({ cached: Math.min(state.cached + 1, state.total) });
    }
    // Wait (max 15 s) for the service worker that will serve these files.
    await Promise.race([navigator.serviceWorker.ready, timeout(15000)]);
  } catch (error) {
    failure = String(error && error.message ? error.message : error);
  }
  saving = false;
  await verifyOffline();
  if (failure && state.status !== 'ready') set({ error: failure });
  return state;
}

/**
 * "Check for updated guides". Returns:
 *   'unsupported' | 'not-installed' | 'failed' (offline / server unreachable)
 *   'current' (no newer version) | 'found' (a newer version is downloading or ready)
 */
export async function checkForUpdate() {
  if (!supported) return 'unsupported';
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return 'not-installed';
  try {
    await registration.update();
  } catch {
    return 'failed';
  }
  if (registration.installing || registration.waiting) {
    watch(registration);
    await verifyOffline();
    return 'found';
  }
  return 'current';
}

/** Switch to the fully downloaded new version and reload. */
export async function applyUpdate() {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration || !registration.waiting) return false;
  reloadOnTakeover = true;
  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  return true;
}
