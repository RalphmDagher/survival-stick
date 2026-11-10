/* Emergency numbers: list + validated "add a number" form. Used on SOS and Settings. */
import { h, statusLine } from '../ui.js';
import { icon } from '../icons.js';
import { t } from '../i18n.js';
import { store } from '../store.js';
import { getContacts, validateContact, addContact, removeContact, setPrimaryContact } from '../contacts.js';

let uid = 0;

export function contactsEditor({ onChange } = {}) {
  const id = 'contact-' + ++uid;
  const list = h('ul', { class: 'stack' });
  const feedback = statusLine();
  const labelInput = h('input', { class: 'input', id: id + '-label', type: 'text', maxlength: '40', autocomplete: 'off', placeholder: t('For example: Mountain rescue'), 'aria-describedby': id + '-label-error' });
  const numberInput = h('input', { class: 'input', id: id + '-number', type: 'tel', inputmode: 'tel', maxlength: '24', autocomplete: 'off', dir: 'ltr', 'aria-describedby': `${id}-number-hint ${id}-number-error` });
  const labelError = h('p', { class: 'field-error', id: id + '-label-error' });
  const numberError = h('p', { class: 'field-error', id: id + '-number-error' });

  function changed() {
    renderList();
    if (onChange) onChange();
  }

  function renderList() {
    const contacts = getContacts();
    list.replaceChildren(
      ...contacts.map((contact, index) =>
        h(
          'li',
          { class: 'contact-row' },
          h(
            'span',
            { class: 'linkrow-body' },
            h('strong', null, contact.number),
            h('span', null, contact.label + (index === 0 ? ' · ' + t('main number') : '') + (contact.source === 'deployment' ? ' · ' + t('set by the project team') : ''))
          ),
          index > 0
            ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('Make {label} the main number', contact), onclick: () => { setPrimaryContact(contact.id); feedback.set(t('{label} is now the main number.', contact), 'ok'); changed(); } }, icon('star'))
            : null,
          contact.source === 'user'
            ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('Delete {label}', contact), onclick: () => { const ok = removeContact(contact.id); feedback.set(ok ? t('{label} was deleted.', contact) : t('Could not delete: this browser is blocking storage.'), ok ? 'ok' : 'err'); changed(); } }, icon('trash'))
            : null
        )
      )
    );
    list.hidden = contacts.length === 0;
  }

  function submit(event) {
    event.preventDefault();
    const errors = validateContact(labelInput.value, numberInput.value);
    labelError.textContent = errors.label ? t(errors.label) : '';
    numberError.textContent = errors.number ? t(errors.number) : '';
    labelInput.setAttribute('aria-invalid', errors.label ? 'true' : 'false');
    numberInput.setAttribute('aria-invalid', errors.number ? 'true' : 'false');
    if (errors.label) return labelInput.focus();
    if (errors.number) return numberInput.focus();
    const saved = addContact(labelInput.value, numberInput.value);
    if (!saved) {
      feedback.set(t('Could not save: this browser is blocking storage (for example in private browsing).'), 'err');
      return;
    }
    feedback.set(t('Number saved on this phone. Check it carefully: this app cannot verify that it is correct.'), 'ok');
    labelInput.value = '';
    numberInput.value = '';
    changed();
  }

  renderList();

  const node = h(
    'div',
    { class: 'stack' },
    list,
    feedback.node,
    h(
      'form',
      { class: 'stack', novalidate: true, onsubmit: submit },
      h('div', { class: 'field' }, h('label', { class: 'label', for: id + '-label' }, t('Name')), labelInput, labelError),
      h(
        'div',
        { class: 'field' },
        h('label', { class: 'label', for: id + '-number' }, t('Phone number')),
        numberInput,
        h('p', { class: 'hint', id: id + '-number-hint' }, t('Enter the official emergency or mountain-rescue number for the country you are hiking in. Look it up from an official source.')),
        numberError
      ),
      h('button', { class: 'btn btn-block', type: 'submit' }, icon('plus'), t('Add number'))
    ),
    !store.available ? h('p', { class: 'field-error' }, t('This browser is blocking storage, so numbers cannot be saved.')) : null
  );

  return { node };
}
