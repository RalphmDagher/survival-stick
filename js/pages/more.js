/* "More" menu (4th tab). */
import { h, linkRow } from '../ui.js';
import { t } from '../i18n.js';

export function morePage() {
  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('h1', null, t('More'))),
    h(
      'div',
      { class: 'linklist' },
      linkRow({ href: '#/skills', iconName: 'compass', title: t('Survival skills'), sub: t('Eight short lessons with a quick check') }),
      linkRow({ href: '#/stick', iconName: 'info', title: t('Stick information'), sub: t('The parts of the Survival Stick') }),
      linkRow({ href: '#/prep', iconName: 'checklist', title: t('Pre-hike preparation'), sub: t('Checklist and offline download') }),
      linkRow({ href: '#/settings', iconName: 'settings', title: t('Settings'), sub: t('Language, text size, emergency numbers, updates') })
    )
  );
  return { title: t('More'), tab: 'more', sos: true, node };
}
