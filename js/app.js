/* Survival Stick — start-up. */
import { store } from './store.js';
import { initI18n, t } from './i18n.js';
import { initOffline } from './offline.js';
import { startRouter } from './router.js';

async function start() {
  document.documentElement.dataset.textSize = store.get('textSize', 'm');
  await initI18n();
  document.getElementById('skip-link').textContent = t('Skip to content');
  startRouter();
  initOffline(); // registers the service worker; saving starts in the background
}

start().catch((error) => {
  console.error(error);
  const main = document.getElementById('main');
  const p = document.createElement('p');
  p.className = 'boot-help';
  p.textContent = 'The app could not start in this browser. In an emergency, use your phone\'s dialer to call the emergency number of the country you are in.';
  main.append(p);
});
