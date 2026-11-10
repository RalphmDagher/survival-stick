/* PAGE 7 — Pre-hike preparation: checklist saved on the phone + offline preparation. */
import { h, statusLine } from '../ui.js';
import { icon } from '../icons.js';
import { t, getContent } from '../i18n.js';
import { store } from '../store.js';
import { subscribeOffline } from '../offline.js';
import { offlineCard } from '../components/offline-status.js';

export function prepPage() {
  const items = getContent().checklist;
  let checked = store.get('checklist', {});
  if (!checked || typeof checked !== 'object') checked = {};
  let offlineReady = false;

  const offline = offlineCard();
  const feedback = statusLine();
  const countEl = h('span');
  const fill = h('div', { class: 'progress-fill' });
  const track = h('div', { class: 'progress-track', role: 'progressbar', 'aria-label': t('Checklist progress'), 'aria-valuemin': '0', 'aria-valuemax': String(items.length) }, fill);
  const rows = new Map();

  const isDone = (item) => (item.auto === 'offline' ? offlineReady : Boolean(checked[item.id]));

  function update() {
    let done = 0;
    for (const item of items) {
      const { row, input } = rows.get(item.id);
      const state = isDone(item);
      input.checked = state;
      row.classList.toggle('done', state);
      if (state) done++;
    }
    countEl.textContent = t('{done} of {total} done', { done, total: items.length });
    fill.style.width = `${Math.round((done / items.length) * 100)}%`;
    track.setAttribute('aria-valuenow', String(done));
  }

  const list = h(
    'div',
    { class: 'checklist' },
    items.map((item) => {
      const auto = item.auto === 'offline';
      const input = h('input', {
        type: 'checkbox',
        disabled: auto,
        onchange: () => {
          checked = { ...checked, [item.id]: input.checked };
          const saved = store.set('checklist', checked);
          feedback.set(saved ? t('Checklist saved on this phone.') : t('Could not save: this browser is blocking storage. Your ticks will be lost when you close the page.'), saved ? 'ok' : 'err');
          update();
        }
      });
      const row = h(
        'label',
        { class: 'check-item' + (auto ? ' locked' : '') },
        input,
        h('span', { class: 'check-box', 'aria-hidden': 'true' }, icon('check')),
        h(
          'span',
          { class: 'check-body' },
          h('strong', null, item.title),
          h('span', null, item.detail),
          auto ? h('span', null, t('Ticked automatically once the offline copy is verified below.')) : null,
          item.link ? h('a', { href: item.link.href }, t(item.link.label)) : null
        )
      );
      rows.set(item.id, { row, input });
      return row;
    })
  );

  const stopOffline = subscribeOffline((state) => {
    offlineReady = state.status === 'ready';
    update();
  });

  function reset() {
    checked = {};
    const saved = store.set('checklist', checked);
    feedback.set(saved ? t('Checklist cleared.') : t('Could not save: this browser is blocking storage.'), saved ? 'ok' : 'err');
    update();
  }

  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('h1', null, t('Pre-hike preparation')), h('p', { class: 'muted' }, t('Go through this list before every hike. Your ticks stay on this phone.'))),
    h('div', { class: 'progress' }, h('div', { class: 'progress-meta' }, h('span', null, t('Checklist')), countEl), track),
    list,
    feedback.node,
    h('button', { class: 'btn btn-ghost btn-block', type: 'button', onclick: reset }, icon('refresh'), t('Clear checklist for a new hike')),
    h('section', { class: 'section', 'aria-labelledby': 'prep-offline' }, h('h2', { class: 'section-title', id: 'prep-offline' }, t('Offline preparation')), offline.node)
  );

  return {
    title: t('Pre-hike preparation'),
    tab: 'more',
    back: '#/more',
    node,
    cleanup() {
      offline.destroy();
      stopOffline();
    }
  };
}
