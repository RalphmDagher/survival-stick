/* PAGE 4 — Location and navigation. The coordinates need no map and no internet service. */
import { h, statusLine } from '../ui.js';
import { icon } from '../icons.js';
import { t } from '../i18n.js';
import { geo, osmEmbed, osmLink } from '../geo.js';
import { subscribeOffline } from '../offline.js';
import { locationCard } from '../components/location-card.js';

export function locationPage() {
  const card = locationCard({ detailed: true });

  /* ---- Optional online map ---- */
  const mapStatus = statusLine();
  const mapHolder = h('div');
  const showBtn = h('button', { class: 'btn btn-block', type: 'button', onclick: showMap }, icon('map'), t('Show online map'));
  const openLink = h('a', { class: 'btn btn-ghost btn-block', target: '_blank', rel: 'noopener noreferrer' }, icon('external'), t('Open in OpenStreetMap'));
  let online = navigator.onLine;
  let coords = null;
  let mapShown = false;

  function showMap() {
    if (!coords || !online) return;
    mapShown = true;
    mapHolder.replaceChildren(
      h('iframe', { class: 'map-frame', src: osmEmbed(coords), title: t('Online map centred on your position'), loading: 'lazy', referrerpolicy: 'no-referrer' })
    );
    mapStatus.set(t('Map requested from openstreetmap.org for the position measured at that moment. If it stays blank, the connection is too weak. The map does not follow you.'), '');
    updateMap();
  }

  function updateMap() {
    showBtn.hidden = !online || !coords || mapShown;
    openLink.hidden = !online || !coords;
    if (coords) openLink.href = osmLink(coords);
    if (!online) {
      mapShown = false;
      mapHolder.replaceChildren();
      mapStatus.set(t('Map data is not available offline. This app does not store maps. Your coordinates above do not need a map or an internet connection.'), 'warn');
    } else if (!coords) {
      mapStatus.set(t('Get your location first to see it on a map.'), '');
    } else if (!mapShown) {
      mapStatus.set(t('Optional. Showing the map sends this position to openstreetmap.org, an external service, and needs an internet connection.'), '');
    }
  }

  const stopGeo = geo.subscribe((state) => {
    coords = state.coords;
    updateMap();
  });
  const stopOffline = subscribeOffline((state) => {
    online = state.online;
    updateMap();
  });

  const facts = [
    t('The coordinates come from your phone\'s own GPS receiver.'),
    t('GPS can work without mobile signal or internet on supported phones, but the first position may take longer.'),
    t('Availability and accuracy vary: forests, gorges, cliffs, buildings and bad weather make it worse.'),
    t('The position is only shown on this screen. It is not tracked, recorded or sent to rescuers. Nobody receives it unless you copy or share it yourself.'),
    t('Carry a paper map and compass: a phone can break, freeze or run out of battery.')
  ];

  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('h1', null, t('Location')), h('p', { class: 'muted' }, t('Your coordinates, ready to read out or share.'))),
    card.node,
    h('section', { class: 'card', 'aria-labelledby': 'loc-map' }, h('h2', { id: 'loc-map' }, t('Map (optional)')), mapStatus.node, showBtn, mapHolder, openLink),
    h('section', { class: 'card', 'aria-labelledby': 'loc-facts' }, h('h2', { id: 'loc-facts' }, t('Good to know')), h('div', { class: 'prose' }, h('ul', null, facts.map((line) => h('li', null, line))))),
    h('a', { class: 'btn btn-block', href: '#/skills/compass' }, icon('compass'), t('Learn compass basics'))
  );

  return {
    title: t('Location'),
    tab: 'location',
    sos: true,
    node,
    cleanup() {
      card.destroy();
      stopGeo();
      stopOffline();
    }
  };
}
