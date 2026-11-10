/*
 * Hash router. Addresses look like  .../survival-stick/#/guides/avalanche
 * Everything after "#" is handled in the browser, so reloading a page or
 * opening a direct link works on GitHub Pages without any server set-up.
 *
 * A page function returns:
 *   { title, node, tab, back?, sos?, cleanup? }
 *     tab     : which bottom-navigation item is highlighted
 *     back    : address for the back arrow (omit on top-level pages)
 *     sos     : show the red SOS shortcut in the top bar
 *     cleanup : called when the user leaves the page (stop GPS, timers ...)
 */
import { h } from './ui.js';
import { icon, logo } from './icons.js';
import { t } from './i18n.js';
import { home } from './pages/home.js';
import { sos } from './pages/sos.js';
import { guidesIndex, guideStart, guideStep } from './pages/guides.js';
import { locationPage } from './pages/location.js';
import { skillsIndex, skillLesson } from './pages/skills.js';
import { stickPage } from './pages/stick.js';
import { prepPage } from './pages/prep.js';
import { settingsPage } from './pages/settings.js';
import { morePage } from './pages/more.js';

const ROUTES = [
  [/^\/?$/, home],
  [/^\/sos$/, sos],
  [/^\/guides$/, guidesIndex],
  [/^\/guides\/([\w-]+)$/, guideStart],
  [/^\/guides\/([\w-]+)\/([\w-]+)(?:\/(\d+))?$/, guideStep],
  [/^\/location$/, locationPage],
  [/^\/skills$/, skillsIndex],
  [/^\/skills\/([\w-]+)$/, skillLesson],
  [/^\/stick$/, stickPage],
  [/^\/prep$/, prepPage],
  [/^\/settings$/, settingsPage],
  [/^\/more$/, morePage]
];

const TABS = [
  { id: 'home', href: '#/', label: 'Home', icon: 'home' },
  { id: 'guides', href: '#/guides', label: 'Guides', icon: 'guides' },
  { id: 'location', href: '#/location', label: 'Location', icon: 'pin' },
  { id: 'more', href: '#/more', label: 'More', icon: 'more' }
];

let cleanup = null;
let firstRender = true;

function notFound() {
  return {
    title: t('Page not found'),
    tab: 'home',
    back: '#/',
    sos: true,
    node: h(
      'div',
      { class: 'page' },
      h('div', { class: 'page-head' }, h('h1', null, t('Page not found')), h('p', { class: 'muted' }, t('This address does not match any page of the app.'))),
      h('a', { class: 'btn btn-primary', href: '#/' }, icon('home'), t('Back to home'))
    )
  };
}

function resolve() {
  const path = (window.location.hash.replace(/^#/, '') || '/').split('?')[0].replace(/\/+$/, '') || '/';
  for (const [pattern, page] of ROUTES) {
    const match = path.match(pattern);
    if (match) {
      try {
        const result = page(...match.slice(1));
        if (result) return result;
      } catch (error) {
        console.error(error);
      }
      break;
    }
  }
  return notFound();
}

function renderTopbar(page) {
  const bar = document.getElementById('topbar');
  const inner = h('div', { class: 'topbar-inner' });
  if (page.back) {
    inner.append(
      h('a', { class: 'icon-btn flip', href: page.back, 'aria-label': t('Back') }, icon('chevronLeft')),
      h('span', { class: 'topbar-title' }, page.title)
    );
  } else {
    inner.append(h('a', { class: 'brand', href: '#/', 'aria-label': t('Survival Stick — home') }, logo(), 'Survival Stick'));
  }
  if (page.sos) inner.append(h('a', { class: 'sos-pill', href: '#/sos', 'aria-label': t('Open Emergency SOS') }, icon('phone'), 'SOS'));
  bar.replaceChildren(inner);
}

function renderNav(page) {
  const nav = document.getElementById('bottomnav');
  nav.setAttribute('aria-label', t('Main navigation'));
  nav.replaceChildren(
    h(
      'ul',
      null,
      TABS.map((tab) =>
        h('li', null, h('a', { href: tab.href, 'aria-current': page.tab === tab.id ? 'page' : null }, icon(tab.icon), h('span', null, t(tab.label))))
      )
    )
  );
}

export function render() {
  if (cleanup) {
    try { cleanup(); } catch (error) { console.error(error); }
    cleanup = null;
  }
  const page = resolve();
  cleanup = page.cleanup || null;
  document.title = page.back ? `${page.title} · Survival Stick` : 'Survival Stick';
  renderTopbar(page);
  renderNav(page);
  const main = document.getElementById('main');
  main.replaceChildren(page.node);
  window.scrollTo(0, 0);
  if (!firstRender) main.focus({ preventScroll: true });
  firstRender = false;
}

export function startRouter() {
  window.addEventListener('hashchange', render);
  document.getElementById('skip-link').addEventListener('click', () => document.getElementById('main').focus());
  render();
}
