/*
 * Location from the phone's own Geolocation API. Nothing is sent anywhere:
 * the coordinates only exist on this device until the user copies or shares them.
 *
 * status values
 *   idle | unsupported | insecure | requesting | active | denied | unavailable | timeout
 */
const listeners = new Set();
let watchId = null;
let state = { status: 'idle', coords: null, time: null };

function set(patch) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn(state));
}

function onPosition(position) {
  const c = position.coords;
  set({
    status: 'active',
    time: position.timestamp || Date.now(),
    coords: {
      latitude: c.latitude,
      longitude: c.longitude,
      accuracy: c.accuracy,
      altitude: typeof c.altitude === 'number' ? c.altitude : null
    }
  });
}

function onError(error) {
  if (error.code === 1) {
    stop();
    set({ status: 'denied' });
  } else if (error.code === 3) {
    set({ status: 'timeout' });
  } else {
    set({ status: 'unavailable' });
  }
}

function stop() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}

export const geo = {
  getState: () => state,

  /** Ask for the position (shows the browser permission prompt the first time). */
  start() {
    if (!('geolocation' in navigator)) return set({ status: 'unsupported' });
    if (!window.isSecureContext) return set({ status: 'insecure' });
    stop();
    set({ status: 'requesting' });
    watchId = navigator.geolocation.watchPosition(onPosition, onError, {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 30000
    });
  },

  /** Start without a prompt, only if the user already allowed location earlier. */
  async startIfAllowed() {
    if (watchId !== null || !('geolocation' in navigator) || !navigator.permissions) return;
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      if (permission.state === 'granted' && listeners.size) geo.start();
    } catch {
      /* Permissions API not available for geolocation: wait for a tap. */
    }
  },

  /** Subscribe to updates. Returns an unsubscribe function; GPS stops when nobody listens. */
  subscribe(fn) {
    listeners.add(fn);
    fn(state);
    return () => {
      listeners.delete(fn);
      if (!listeners.size) {
        stop();
        if (state.status === 'requesting') set({ status: 'idle' });
      }
    };
  }
};

/* ---- Formatting helpers ---- */

export function formatDecimal(coords) {
  return `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
}

function dms(value, positive, negative) {
  const abs = Math.abs(value);
  let deg = Math.floor(abs);
  let min = Math.floor((abs - deg) * 60);
  let sec = Math.round(((abs - deg) * 60 - min) * 600) / 10;
  if (sec >= 60) { sec = 0; min += 1; }
  if (min >= 60) { min = 0; deg += 1; }
  return `${deg}° ${min}′ ${sec.toFixed(1)}″ ${value >= 0 ? positive : negative}`;
}

export function formatDMS(coords) {
  return `${dms(coords.latitude, 'N', 'S')}  ${dms(coords.longitude, 'E', 'W')}`;
}

/** 3 = good (≤ 20 m), 2 = moderate (≤ 100 m), 1 = poor. */
export function accuracyLevel(meters) {
  if (meters <= 20) return 3;
  if (meters <= 100) return 2;
  return 1;
}

export function osmLink(coords) {
  const lat = coords.latitude.toFixed(5);
  const lon = coords.longitude.toFixed(5);
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
}

export function osmEmbed(coords) {
  const d = 0.01;
  const { latitude: lat, longitude: lon } = coords;
  const bbox = [lon - d, lat - d, lon + d, lat + d].map((n) => n.toFixed(5)).join('%2C');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(5)}%2C${lon.toFixed(5)}`;
}
