/* Offline status: a small badge (home) and a full card with the save / verify / update actions. */
import { h, statusLine } from '../ui.js';
import { icon } from '../icons.js';
import { t } from '../i18n.js';
import { subscribeOffline, saveForOffline, verifyOffline, applyUpdate } from '../offline.js';

function describe(state) {
  switch (state.status) {
    case 'ready':
      return { kind: 'ok', label: t('Offline ready'), text: t('All {total} files are saved in this browser and were verified. The guides can open without a connection.', state) };
    case 'saving':
      return { kind: 'warn', label: t('Saving…'), text: t('Downloading the guides: {cached} of {total} files saved. Keep this page open.', state) };
    case 'incomplete':
      return { kind: 'warn', label: t('Offline copy incomplete'), text: t('Only {cached} of {total} files are saved. Do not rely on this app without a connection yet.', state) };
    case 'not-saved':
      return { kind: 'warn', label: t('Not saved for offline use'), text: t('The guides are not saved on this phone yet. Without a connection this app will not open.') };
    case 'unsupported':
      return { kind: 'err', label: t('Offline use unavailable'), text: t('This browser, or this address, cannot store the app. Open the site in Safari or Chrome with an https:// address, outside private browsing.') };
    default:
      return { kind: '', label: t('Checking…'), text: t('Checking what is saved on this phone.') };
  }
}

/** Compact row for the home page. */
export function offlineBadge() {
  const badge = h('span', { class: 'badge' });
  const sub = h('span');
  const node = h(
    'a',
    { class: 'linkrow', href: '#/prep' },
    h('span', { class: 'icon-box' }, icon('download')),
    h('span', { class: 'linkrow-body' }, h('strong', null, t('Offline guides')), sub),
    badge
  );
  const destroy = subscribeOffline((state) => {
    const d = describe(state);
    badge.className = 'badge ' + d.kind;
    badge.textContent = d.label;
    if (state.updateWaiting) sub.textContent = t('Update downloaded — tap to apply it');
    else sub.textContent = state.status === 'ready' ? t('Verified on this phone') : t('Tap to prepare before you lose signal');
  });
  return { node, destroy };
}

/** Full card with actions. */
export function offlineCard() {
  const badge = h('span', { class: 'badge', role: 'status' });
  const text = h('p', { class: 'muted' });
  const connection = h('p', { class: 'small muted' });
  const fill = h('div', { class: 'progress-fill' });
  const track = h('div', { class: 'progress-track', role: 'progressbar', 'aria-label': t('Files saved for offline use'), 'aria-valuemin': '0' }, fill);
  const feedback = statusLine();
  const saveBtn = h('button', { class: 'btn btn-primary btn-block', type: 'button', onclick: save }, icon('download'), h('span', null, t('Save emergency guides for offline use')));
  const verifyBtn = h('button', { class: 'btn btn-ghost btn-block', type: 'button', onclick: verify }, icon('refresh'), t('Verify offline copy again'));
  const updateBox = h(
    'div',
    { class: 'stack', hidden: true },
    h('p', null, t('An updated version of the guides has been downloaded. Your current version keeps working until you apply it.')),
    h('button', { class: 'btn btn-primary btn-block', type: 'button', onclick: () => applyUpdate() }, icon('refresh'), t('Apply update and reload'))
  );

  async function save() {
    feedback.set('');
    const state = await saveForOffline();
    if (state.status === 'ready') feedback.set(t('Saved and verified: {total} of {total} files.', state), 'ok');
    else if (!state.online) feedback.set(t('You appear to be offline. Connect to the internet and try again.'), 'err');
    else feedback.set(t('Saving did not complete ({cached} of {total} files). Check your connection and try again.', state) + (state.error ? ` [${state.error}]` : ''), 'err');
  }

  async function verify() {
    const state = await verifyOffline();
    feedback.set(
      state.status === 'ready' ? t('Checked just now: all {total} files are present.', state) : t('Checked just now: {cached} of {total} files are present.', state),
      state.status === 'ready' ? 'ok' : 'warn'
    );
  }

  const destroy = subscribeOffline((state) => {
    const d = describe(state);
    badge.className = 'badge ' + d.kind;
    badge.textContent = d.label;
    text.textContent = d.text;
    connection.textContent = state.online
      ? t('Connection: your phone reports that it is online.')
      : t('Connection: your phone reports that it is offline.');
    fill.style.width = state.total ? `${Math.round((state.cached / state.total) * 100)}%` : '0%';
    track.setAttribute('aria-valuemax', String(state.total));
    track.setAttribute('aria-valuenow', String(state.cached));
    track.hidden = state.status === 'unsupported';
    saveBtn.hidden = state.status === 'ready' || state.status === 'unsupported' || state.status === 'checking';
    saveBtn.disabled = state.status === 'saving';
    verifyBtn.hidden = state.status !== 'ready';
    updateBox.hidden = !state.updateWaiting;
  });

  const node = h(
    'section',
    { class: 'card', 'aria-label': t('Offline status') },
    h('div', { class: 'card-head' }, h('h2', null, t('Offline status')), badge),
    text,
    track,
    connection,
    saveBtn,
    verifyBtn,
    feedback.node,
    updateBox,
    h('p', { class: 'hint' }, t('The first visit always needs an internet connection: the NFC tag only opens a web address, it does not transfer the app. Offline copies can be removed by the phone if storage runs low or if you clear browser data, so verify again before each trip.'))
  );
  return { node, destroy };
}
