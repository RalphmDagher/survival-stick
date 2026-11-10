/* Emergency numbers: verified deployment numbers (config.js) + the user's own (saved on this phone). */
import { store } from './store.js';
import { DEPLOYMENT_EMERGENCY_NUMBERS } from './config.js';

const KEY = 'contacts';

function userContacts() {
  const list = store.get(KEY, []);
  return Array.isArray(list) ? list.filter((c) => c && c.label && c.number) : [];
}

/** All numbers, the primary one first. `source` tells where a number comes from. */
export function getContacts() {
  const deployed = DEPLOYMENT_EMERGENCY_NUMBERS.filter((c) => c && c.label && c.number).map((c, i) => ({
    id: 'deployment-' + i,
    label: c.country ? `${c.label} (${c.country})` : c.label,
    number: String(c.number),
    source: 'deployment'
  }));
  const own = userContacts().map((c) => ({ ...c, source: 'user' }));
  const primaryId = store.get('primaryContact', null);
  const all = [...own, ...deployed];
  const index = all.findIndex((c) => c.id === primaryId);
  if (index > 0) all.unshift(all.splice(index, 1)[0]);
  return all;
}

export function getPrimaryContact() {
  return getContacts()[0] || null;
}

/** Validation. Returns { label, number } error messages (English keys for t()). */
export function validateContact(label, number) {
  const errors = {};
  const cleanLabel = label.trim();
  const cleanNumber = number.trim();
  if (!cleanLabel) errors.label = 'Enter a name for this number, for example "Mountain rescue".';
  else if (cleanLabel.length > 40) errors.label = 'Use 40 characters or fewer.';
  if (!cleanNumber) errors.number = 'Enter the phone number.';
  else if (!/^\+?[0-9][0-9 ()\-.]{1,22}$/.test(cleanNumber) || cleanNumber.replace(/\D/g, '').length < 2)
    errors.number = 'Use digits only. You may start with + and use spaces or dashes.';
  else if (cleanNumber.replace(/\D/g, '').length > 15) errors.number = 'This number is too long (15 digits maximum).';
  return errors;
}

/** Returns true only if the number was really saved to the phone. */
export function addContact(label, number) {
  const list = userContacts();
  const contact = { id: 'user-' + Date.now().toString(36), label: label.trim(), number: number.trim() };
  list.push(contact);
  if (!store.set(KEY, list)) return false;
  if (list.length === 1 && !store.get('primaryContact', null)) store.set('primaryContact', contact.id);
  return true;
}

export function removeContact(id) {
  return store.set(KEY, userContacts().filter((c) => c.id !== id));
}

export function setPrimaryContact(id) {
  return store.set('primaryContact', id);
}

/** tel: link value — keeps digits and a leading +. */
export function telHref(number) {
  return 'tel:' + number.replace(/[^\d+]/g, '');
}
