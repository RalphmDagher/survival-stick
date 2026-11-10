/* PAGE 1 — Home dashboard (opened by the NFC tag). */
import { h, linkRow, prototypeNotice } from '../ui.js';
import { icon, svgFromString } from '../icons.js';
import { t, getContent } from '../i18n.js';
import { HERO_RIDGE } from '../illustrations.js';
import { locationCard } from '../components/location-card.js';
import { offlineBadge } from '../components/offline-status.js';

export function home() {
  const location = locationCard();
  const offline = offlineBadge();

  const node = h(
    'div',
    { class: 'page' },
    h(
      'section',
      { class: 'hero' },
      h('span', { class: 'tag' }, t('Prototype')),
      h('h1', null, t('Stay safe out there.')),
      h('p', null, t('Emergency guidance, your GPS coordinates and survival skills — from the Survival Stick beside you.')),
      svgFromString(HERO_RIDGE)
    ),

    h(
      'a',
      { class: 'sos-cta', href: '#/sos' },
      h('span', { class: 'sos-cta-icon' }, icon('phone')),
      h('span', { class: 'sos-cta-text' }, h('strong', null, t('Emergency SOS')), h('span', null, t('Call for help and share your position'))),
      h('span', { class: 'flip' }, icon('chevronRight'))
    ),

    h(
      'section',
      { class: 'section', 'aria-labelledby': 'home-guides' },
      h('h2', { class: 'section-title', id: 'home-guides' }, t('What is happening?')),
      h(
        'div',
        { class: 'tiles' },
        getContent().guides.map((guide) =>
          h('a', { class: 'tile', href: `#/guides/${guide.id}` }, h('span', { class: 'icon-box' }, icon(guide.icon)), h('span', null, guide.title, h('small', null, guide.short)))
        )
      )
    ),

    h('section', { class: 'section', 'aria-labelledby': 'home-location' }, h('h2', { class: 'section-title', id: 'home-location' }, t('Where am I?')), location.node),

    h(
      'section',
      { class: 'section', 'aria-labelledby': 'home-more' },
      h('h2', { class: 'section-title', id: 'home-more' }, t('Be prepared')),
      h(
        'div',
        { class: 'linklist' },
        offline.node,
        linkRow({ href: '#/skills', iconName: 'compass', title: t('Survival skills'), sub: t('Short lessons: compass, map, weather, signaling') }),
        linkRow({ href: '#/stick', iconName: 'info', title: t('Stick information'), sub: t('What the Survival Stick is designed to do') }),
        linkRow({ href: '#/prep', iconName: 'checklist', title: t('Pre-hike preparation'), sub: t('Checklist before you leave') })
      )
    ),

    prototypeNotice()
  );

  return {
    title: t('Home'),
    tab: 'home',
    node,
    cleanup() {
      location.destroy();
      offline.destroy();
    }
  };
}
