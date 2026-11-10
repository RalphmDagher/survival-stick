/* PAGE 8 — Settings and information. */
import { h, statusLine, prototypeNotice } from '../ui.js';
import { icon } from '../icons.js';
import { t, LOCALES, getLanguage, setLanguage } from '../i18n.js';
import { store } from '../store.js';
import { PROJECT } from '../config.js';
import { VERSION, checkForUpdate } from '../offline.js';
import { offlineCard } from '../components/offline-status.js';
import { contactsEditor } from '../components/contacts-editor.js';

const SIZES = [
  { id: 'm', label: 'Standard' },
  { id: 'l', label: 'Large' },
  { id: 'xl', label: 'Extra large' }
];

const SOURCES = [
  'Wilderness Medical Society — clinical practice guidelines (hypothermia, heat illness, avalanche and lightning)',
  'International Commission for Alpine Rescue (ICAR)',
  'Avalanche Canada and Avalanche.org',
  'UK National Health Service (NHS)',
  'US National Weather Service — lightning safety',
  'US National Park Service — Ten Essentials; US Forest Service — if you get lost',
  'International Federation of Red Cross and Red Crescent Societies — first aid guidelines'
];

export function settingsPage() {
  const offline = offlineCard();

  /* Language */
  const langStatus = statusLine();
  const select = h(
    'select',
    {
      class: 'select',
      id: 'language',
      onchange: async () => {
        await setLanguage(select.value);
        window.dispatchEvent(new Event('hashchange')); // redraw the page in the new language
      }
    },
    Object.entries(LOCALES).map(([code, locale]) =>
      h('option', { value: code, disabled: !locale.available, selected: code === getLanguage() }, locale.available ? locale.name : `${locale.name} — ${t('not translated yet')}`)
    )
  );

  /* Text size */
  const sizeStatus = statusLine();
  const sizeButtons = SIZES.map((size) =>
    h(
      'button',
      {
        type: 'button',
        'aria-pressed': String(store.get('textSize', 'm') === size.id),
        onclick: () => {
          document.documentElement.dataset.textSize = size.id;
          const saved = store.set('textSize', size.id);
          sizeButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(SIZES[i].id === size.id)));
          sizeStatus.set(saved ? t('Text size: {size}.', { size: t(size.label) }) : t('Text size changed for now, but this browser cannot remember it.'), saved ? 'ok' : 'warn');
        }
      },
      t(size.label)
    )
  );

  /* Updates */
  const updateStatus = statusLine();
  const updateBtn = h('button', { class: 'btn btn-block', type: 'button', onclick: check }, icon('refresh'), t('Check for updated guides'));
  async function check() {
    updateBtn.disabled = true;
    updateStatus.set(t('Checking…'), '');
    const result = await checkForUpdate();
    updateBtn.disabled = false;
    const messages = {
      current: [t('No newer version was found. You have version {v}.', { v: VERSION }), 'ok'],
      found: [t('A newer version was found. It is downloading; when it is complete, an "Apply update" button appears in the offline status above. Your current guides keep working meanwhile.'), 'warn'],
      failed: [t('Could not check: the server could not be reached. You are probably offline. Your saved guides are unchanged.'), 'err'],
      'not-installed': [t('The app is not saved on this phone yet, so there is nothing to update. Use "Save emergency guides for offline use" first.'), 'warn'],
      unsupported: [t('This browser cannot store or update the app.'), 'err']
    };
    updateStatus.set(...messages[result]);
  }

  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('h1', null, t('Settings'))),

    h(
      'section',
      { class: 'card' },
      h('div', { class: 'inline' }, h('span', { class: 'icon-box' }, icon('globe')), h('h2', null, t('Language'))),
      h('div', { class: 'field' }, h('label', { class: 'label', for: 'language' }, t('App language')), select),
      h('p', { class: 'hint' }, t('French and Arabic are planned. They will be switched on once the translations have been checked.')),
      langStatus.node
    ),

    h(
      'section',
      { class: 'card' },
      h('div', { class: 'inline' }, h('span', { class: 'icon-box' }, icon('textSize')), h('h2', null, t('Text size'))),
      h('div', { class: 'segmented', role: 'group', 'aria-label': t('Text size') }, sizeButtons),
      sizeStatus.node
    ),

    h(
      'section',
      { class: 'card' },
      h('div', { class: 'inline' }, h('span', { class: 'icon-box' }, icon('phone')), h('h2', null, t('Emergency numbers'))),
      h('p', { class: 'muted' }, t('Emergency numbers are different in every country, so this app does not guess them. Add the official numbers for where you hike. The first one becomes the big call button on the SOS page.')),
      contactsEditor().node
    ),

    offline.node,

    h(
      'section',
      { class: 'card' },
      h('div', { class: 'inline' }, h('span', { class: 'icon-box' }, icon('refresh')), h('h2', null, t('Updates'))),
      h('dl', { class: 'kv' }, h('dt', null, t('Version')), h('dd', null, VERSION), h('dt', null, t('Status')), h('dd', null, t(PROJECT.stage))),
      updateBtn,
      updateStatus.node
    ),

    h(
      'section',
      { class: 'card' },
      h('div', { class: 'inline' }, h('span', { class: 'icon-box' }, icon('info')), h('h2', null, t('About and disclaimer'))),
      h('p', null, t('Survival Stick is a university engineering project. This website is the guidance that opens when a hiker scans the NFC tag on a stick.')),
      h(
        'div',
        { class: 'prose muted' },
        h(
          'ul',
          null,
          [
            t('This website cannot contact rescuers, send satellite messages, or control or read the physical stick.'),
            t('It provides general information only. It is not medical advice and does not replace first-aid training, mountain experience or the instructions of emergency services.'),
            t('Emergency numbers, checklist ticks and settings are stored only in this browser. Nothing is sent to a server; there are no accounts, cookies or tracking.'),
            t('Your location is read only when you ask for it and stays on your phone unless you share it or open the optional online map.')
          ].map((line) => h('li', null, line))
        )
      ),
      h('h3', null, t('Sources used for the guidance')),
      h('div', { class: 'prose muted small' }, h('ul', null, SOURCES.map((line) => h('li', null, line)))),
      h('p', { class: 'hint' }, t('The full list is in the REFERENCES.md file of the project. Fonts: Inter and Outfit, SIL Open Font License.'))
    ),

    prototypeNotice()
  );

  return { title: t('Settings'), tab: 'more', back: '#/more', node, cleanup: () => offline.destroy() };
}
