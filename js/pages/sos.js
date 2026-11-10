/* PAGE 2 — Emergency SOS. Honest by design: this page never claims to have contacted anyone. */
import { h, linkRow, notice, statusLine } from '../ui.js';
import { icon } from '../icons.js';
import { t } from '../i18n.js';
import { getContacts, telHref } from '../contacts.js';
import { locationCard } from '../components/location-card.js';
import { contactsEditor } from '../components/contacts-editor.js';

export function sos() {
  const location = locationCard();
  const callArea = h('div', { class: 'stack' });
  const callStatus = statusLine();

  function called(contact) {
    callStatus.set(
      t('Your phone was asked to open its dialer for {number}. This app cannot tell whether the call was made or answered. If nothing happened, dial {number} by hand.', contact),
      'warn'
    );
  }

  function renderCalls() {
    const contacts = getContacts();
    callArea.replaceChildren();
    if (!contacts.length) {
      callArea.append(
        notice(
          [
            h('strong', null, t('No emergency number is saved in this app.') + ' '),
            t('Use your phone\'s dialer now and call the emergency number of the country you are in. You can save the number below for next time.')
          ],
          { danger: true, iconName: 'alert' }
        ),
        contactsEditor({ onChange: renderCalls }).node
      );
      return;
    }
    const [main, ...others] = contacts;
    callArea.append(
      h(
        'a',
        { class: 'btn btn-danger btn-lg btn-block', href: telHref(main.number), onclick: () => called(main) },
        icon('phone'),
        h('span', null, t('Call {label}', main), ' · ', h('bdi', null, main.number))
      ),
      others.map((contact) =>
        h('a', { class: 'btn btn-block', href: telHref(contact.number), onclick: () => called(contact) }, icon('phone'), h('span', null, contact.label, ' · ', h('bdi', null, contact.number)))
      ),
      h('p', { class: 'hint' }, t('These numbers were entered by you or by the project team. Make sure they are right for the country you are in.')),
      h('a', { class: 'text-link', href: '#/settings' }, t('Change emergency numbers'))
    );
  }
  renderCalls();

  const tell = [
    t('Who you are and the phone number you are calling from.'),
    t('Where you are: read the two numbers above slowly, digit by digit — latitude first, then longitude. Say they are "decimal degrees".'),
    t('Add the accuracy shown, the trail or summit name, and anything written on the Survival Stick near you.'),
    t('What happened and when.'),
    t('How many people are involved and what injuries they have.'),
    t('The weather and terrain where you are (wind, visibility, snow, steep ground).'),
    t('Do not hang up until you are told to. Keep the phone on and the line free afterwards.')
  ];

  const wait = [
    t('Stay where you said you were, unless the place becomes dangerous.'),
    t('Keep warm: put on all your layers and sit on your backpack, not on the ground.'),
    t('Be visible: bright clothing or an emergency blanket in the open, a light at night.'),
    t('Signal with a whistle or light: six signals in one minute, one minute of silence, repeat.'),
    t('Save battery: lower the screen brightness and close other apps.'),
    t('Keep the group together and look after the injured.'),
    t('Call again if the situation changes.')
  ];

  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('h1', null, t('Emergency SOS')), h('p', { class: 'muted' }, t('Call for help yourself, then give your position.'))),

    notice(
      [
        h('strong', null, t('This page does not call rescuers for you.') + ' '),
        t('It does not send a satellite message and it does not activate the physical stick. Help is only on its way once you have spoken to the emergency services.')
      ],
      { danger: true, iconName: 'alert' }
    ),

    h('section', { class: 'card', 'aria-labelledby': 'sos-call' }, h('h2', { id: 'sos-call' }, t('1. Call')), callArea, callStatus.node),

    h('section', { class: 'section', 'aria-labelledby': 'sos-where' }, h('h2', { id: 'sos-where' }, t('2. Your position')), location.node),

    h('section', { class: 'card', 'aria-labelledby': 'sos-tell' }, h('h2', { id: 'sos-tell' }, t('3. What to tell the rescue team')), h('ol', { class: 'numbered' }, tell.map((line) => h('li', null, h('span', null, line))))),

    h('section', { class: 'card', 'aria-labelledby': 'sos-wait' }, h('h2', { id: 'sos-wait' }, t('While you wait')), h('div', { class: 'prose' }, h('ul', null, wait.map((line) => h('li', null, line))))),

    h(
      'div',
      { class: 'linklist' },
      linkRow({ href: '#/guides', iconName: 'guides', title: t('Emergency guides'), sub: t('Step-by-step help while you wait') }),
      linkRow({ href: '#/', iconName: 'home', title: t('Back to home') })
    )
  );

  return { title: t('Emergency SOS'), tab: 'home', back: '#/', node, cleanup: () => location.destroy() };
}
