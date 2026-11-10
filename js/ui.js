/* Tiny DOM helpers shared by every page. No framework needed. */
import { icon } from './icons.js';
import { t } from './i18n.js';

/**
 * Create an element. Text children are inserted as text (never as HTML),
 * so content can not inject markup.
 *   h('a', { class: 'btn', href: '#/sos' }, 'Open SOS')
 */
export function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
    else if (value === true) el.setAttribute(key, '');
    else el.setAttribute(key, value);
  }
  for (const child of children.flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return el;
}

/** A row that links somewhere: icon, title, subtitle, chevron. */
export function linkRow({ href, iconName, title, sub, external }) {
  return h(
    'a',
    { class: 'linkrow', href, target: external ? '_blank' : null, rel: external ? 'noopener noreferrer' : null },
    h('span', { class: 'icon-box' }, icon(iconName)),
    h('span', { class: 'linkrow-body' }, h('strong', null, title), sub ? h('span', null, sub) : null),
    h('span', { class: 'chev flip' }, icon(external ? 'external' : 'chevronRight'))
  );
}

/** A polite live region for honest status messages. */
export function statusLine() {
  const el = h('p', { class: 'status-line', role: 'status', 'aria-live': 'polite' });
  return {
    node: el,
    set(text, kind) {
      el.className = 'status-line' + (kind ? ' ' + kind : '');
      el.textContent = text || '';
    }
  };
}

export function notice(children, { danger = false, iconName = 'info' } = {}) {
  return h('div', { class: 'notice' + (danger ? ' danger' : '') }, icon(iconName), h('div', null, children));
}

export function prototypeNotice() {
  return notice([
    h('strong', null, t('Prototype.') + ' '),
    t('This guidance has not yet been reviewed by qualified mountain rescue or medical experts. It does not replace training, professional advice or emergency services.')
  ]);
}

/** Copy text. Resolves true only when the browser confirms the copy. */
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy method */
  }
  try {
    const area = h('textarea', { readonly: true, style: 'position:fixed;opacity:0;inset:0 auto auto 0' });
    area.value = text;
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}
