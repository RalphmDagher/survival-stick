/* GPS coordinates card: get position, accuracy, copy, share. Used on Home, SOS and Location. */
import { h, statusLine, copyText } from '../ui.js';
import { icon } from '../icons.js';
import { t } from '../i18n.js';
import { geo, formatDecimal, formatDMS, accuracyLevel, osmLink } from '../geo.js';

const timeOf = (ms) => new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export function shareText(state) {
  const c = state.coords;
  return t('My location: {coords} (decimal degrees, latitude then longitude). Accuracy about ±{acc} m at {time}. Map: {link}', {
    coords: formatDecimal(c),
    acc: Math.round(c.accuracy),
    time: timeOf(state.time),
    link: osmLink(c)
  });
}

export function locationCard({ detailed = false, heading = true } = {}) {
  const coordsEl = h('p', { class: 'coords empty' });
  const details = h('dl', { class: 'kv' });
  const gps = statusLine();
  const feedback = statusLine();
  const getLabel = h('span');
  const getBtn = h('button', { class: 'btn btn-primary btn-block', type: 'button', onclick: () => geo.start() }, icon('gps'), getLabel);
  const copyBtn = h('button', { class: 'btn', type: 'button', onclick: copy }, icon('copy'), t('Copy coordinates'));
  const canShare = typeof navigator.share === 'function';
  const shareBtn = canShare ? h('button', { class: 'btn', type: 'button', onclick: share }, icon('share'), t('Share location')) : null;
  const actions = h('div', { class: 'btn-row' }, copyBtn, shareBtn);
  let lastGps = '';

  async function copy() {
    const state = geo.getState();
    if (!state.coords) return;
    const ok = await copyText(formatDecimal(state.coords));
    feedback.set(
      ok ? t('Coordinates copied to this phone\'s clipboard. Nothing has been sent to anyone.') : t('Copy failed. Press and hold the coordinates to select them, or read them out.'),
      ok ? 'ok' : 'err'
    );
  }

  async function share() {
    const state = geo.getState();
    if (!state.coords) return;
    try {
      await navigator.share({ title: t('My location'), text: shareText(state) });
      feedback.set(t('The share menu was used. This app cannot confirm that your message was sent or received — check in the app you chose.'), 'warn');
    } catch (error) {
      if (error && error.name === 'AbortError') feedback.set(t('Sharing was cancelled. Nothing was sent.'), 'warn');
      else feedback.set(t('Sharing did not work on this phone. Copy the coordinates instead.'), 'err');
    }
  }

  function setGps(text, kind) {
    const key = kind + text;
    if (key !== lastGps) gps.set(text, kind);
    lastGps = key;
  }

  function render(state) {
    const c = state.coords;
    coordsEl.className = 'coords' + (c ? '' : ' empty');
    coordsEl.textContent = c ? formatDecimal(c) : t('No position yet');
    actions.hidden = !c;
    details.hidden = !c;

    details.replaceChildren();
    if (c) {
      const level = accuracyLevel(c.accuracy);
      const label = [t('Poor'), t('Moderate'), t('Good')][level - 1];
      const bars = h('span', { class: 'accuracy-bars', 'data-level': String(level), 'aria-hidden': 'true' }, h('i'), h('i'), h('i'));
      details.append(
        h('dt', null, t('Accuracy')),
        h('dd', null, h('span', { class: 'accuracy' }, bars, `± ${Math.round(c.accuracy)} m · ${label}`)),
        h('dt', null, t('Fix time')),
        h('dd', null, timeOf(state.time))
      );
      if (detailed) {
        details.append(h('dt', null, t('Latitude')), h('dd', null, c.latitude.toFixed(6)), h('dt', null, t('Longitude')), h('dd', null, c.longitude.toFixed(6)));
        details.append(h('dt', null, t('Deg/min/sec')), h('dd', null, formatDMS(c)));
        if (c.altitude !== null) details.append(h('dt', null, t('Altitude')), h('dd', null, `${Math.round(c.altitude)} m (${t('approximate')})`));
      }
    }

    getBtn.hidden = false;
    getBtn.disabled = false;
    getLabel.textContent = c ? t('Refresh my location') : t('Get my location');
    switch (state.status) {
      case 'idle':
        setGps(c ? t('GPS paused. This is the last position measured; tap Refresh to update.') : t('Tap the button and allow location access when your phone asks.'), '');
        break;
      case 'requesting':
        getBtn.disabled = true;
        getLabel.textContent = t('Searching for GPS…');
        setGps(t('Waiting for a position. Outdoors under open sky this can take up to a minute.'), 'warn');
        break;
      case 'active':
        setGps(
          c.accuracy > 100
            ? t('Position received, but accuracy is poor. Move to open sky and wait for it to improve.')
            : t('Position received from this phone. It updates while this page is open.'),
          c.accuracy > 100 ? 'warn' : 'ok'
        );
        break;
      case 'denied':
        getLabel.textContent = t('Try again');
        setGps(t('Location access was refused. Allow location for this site in your browser or phone settings, then try again.'), 'err');
        break;
      case 'unavailable':
        getLabel.textContent = t('Try again');
        setGps(t('The phone could not determine a position. Check that location services are on, move to open sky and try again.'), 'err');
        break;
      case 'timeout':
        getLabel.textContent = t('Try again');
        setGps(t('No position after 30 seconds. Move to open sky and try again.'), 'err');
        break;
      case 'insecure':
        getBtn.hidden = true;
        setGps(t('Location only works when this site is opened with a secure https:// address.'), 'err');
        break;
      default:
        getBtn.hidden = true;
        setGps(t('This browser does not provide location. Use your phone\'s maps or compass app to read your coordinates.'), 'err');
    }
  }

  const unsubscribe = geo.subscribe(render);
  geo.startIfAllowed();

  const node = h(
    'section',
    { class: 'card', 'aria-label': t('GPS coordinates') },
    heading ? h('div', { class: 'card-head' }, h('h2', null, t('GPS coordinates')), h('span', { class: 'muted small' }, t('Latitude, longitude'))) : null,
    coordsEl,
    details,
    gps.node,
    getBtn,
    actions,
    !canShare ? h('p', { class: 'hint' }, t('Sharing is not available in this browser. Use Copy, then paste the coordinates into a message.')) : null,
    feedback.node
  );

  return { node, destroy: unsubscribe };
}
