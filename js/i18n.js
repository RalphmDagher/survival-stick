/*
 * Languages.
 *
 * How translation works in this project
 *  - Interface text is written in English inside t('...'). The English sentence
 *    is the key. A translation file (js/locales/fr.js, js/locales/ar.js) maps
 *    each English sentence to its translation in `strings`.
 *  - Long content (guides, skills, stick features, checklist) lives in
 *    js/content/en/*.js. A translation file may export `content` with the same
 *    shape to replace any of those four blocks.
 *  - To switch a language on: translate its file, add the file's content, then
 *    set `available: true` below. Arabic is already marked right-to-left; the
 *    stylesheets use logical properties so the layout mirrors automatically.
 */
import { store } from './store.js';
import guides from './content/en/guides.js';
import skills from './content/en/skills.js';
import stick from './content/en/stick.js';
import checklist from './content/en/checklist.js';

export const LOCALES = {
  en: { name: 'English', dir: 'ltr', available: true },
  fr: { name: 'Français', dir: 'ltr', available: false },
  ar: { name: 'العربية', dir: 'rtl', available: false }
};

const english = { guides, skills, stick, checklist };
let current = 'en';
let strings = {};
let content = english;

export async function setLanguage(code) {
  if (!LOCALES[code] || !LOCALES[code].available) code = 'en';
  if (code === 'en') {
    strings = {};
    content = english;
  } else {
    try {
      const pack = await import(`./locales/${code}.js`);
      strings = pack.strings || {};
      content = { ...english, ...(pack.content || {}) };
    } catch {
      code = 'en';
      strings = {};
      content = english;
    }
  }
  current = code;
  document.documentElement.lang = code;
  document.documentElement.dir = LOCALES[code].dir;
  store.set('lang', code);
  return code;
}

export function initI18n() {
  return setLanguage(store.get('lang', 'en'));
}

export function getLanguage() {
  return current;
}

/** Translate an interface sentence. `vars` fills {placeholders}. */
export function t(text, vars) {
  let out = strings[text] ?? text;
  if (vars) for (const [key, value] of Object.entries(vars)) out = out.split(`{${key}}`).join(String(value));
  return out;
}

export function getContent() {
  return content;
}
