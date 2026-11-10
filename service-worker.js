/*
 * Survival Stick — service worker.
 *
 * Strategy
 *  - install : download EVERY file listed in offline-manifest.js into a cache
 *              named after the version. cache.addAll is all-or-nothing, so a
 *              half-downloaded version is never used.
 *  - waiting : a new version does NOT take over by itself. The previous,
 *              complete version keeps serving the emergency guides until the
 *              user taps "Apply update" (or every tab of the app is closed).
 *  - activate: only now are older caches deleted.
 *  - fetch   : cache first (works offline), network as a fallback.
 */
importScripts('offline-manifest.js');

const PREFIX = 'survival-stick-';
const CACHE = PREFIX + self.SS_MANIFEST.version;
const FILES = self.SS_MANIFEST.files;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // cache:'reload' bypasses the browser HTTP cache so a new version never
      // mixes fresh and stale files.
      cache.addAll(FILES.map((file) => new Request(file, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key.startsWith(PREFIX) && key !== CACHE).map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return; // e.g. optional online map

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) return cached;
      try {
        return await fetch(request);
      } catch (error) {
        if (request.mode === 'navigate') {
          const shell = await cache.match('index.html');
          if (shell) return shell;
        }
        return new Response('Offline: this file has not been saved on this device.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })()
  );
});
