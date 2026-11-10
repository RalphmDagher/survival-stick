/* Small safe wrapper around localStorage. Everything stays on the device. */
const PREFIX = 'survival-stick:';

function available() {
  try {
    const key = PREFIX + 'test';
    localStorage.setItem(key, '1');
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export const store = {
  available: available(),

  get(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  /** Returns true only if the value was really saved. */
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
};
