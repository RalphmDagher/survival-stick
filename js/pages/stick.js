/* PAGE 6 — About the Survival Stick: illustration with clickable hotspots. */
import { h, notice } from '../ui.js';
import { icon, svgFromString } from '../icons.js';
import { t, getContent } from '../i18n.js';
import { STICK_SVG } from '../illustrations.js';

export function stickPage() {
  const features = getContent().stick;
  const panel = h('section', { class: 'card feature-panel', 'aria-live': 'polite' });
  const hotspots = [];
  const listButtons = [];

  const statusBadge = (feature) =>
    h('span', { class: 'badge ' + (feature.status === 'verified' ? 'verified' : 'proposed') }, feature.status === 'verified' ? t('Verified feature') : t('Proposed feature'));

  function select(id, { scroll = false } = {}) {
    const feature = features.find((item) => item.id === id);
    [...hotspots, ...listButtons].forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.id === id)));
    const fresh = h(
      'div',
      { class: 'stack feature-panel' },
      h('div', { class: 'inline' }, h('span', { class: 'icon-box' }, icon(feature.icon)), statusBadge(feature)),
      h('h2', null, feature.title),
      h('p', null, feature.summary),
      h('p', { class: 'muted' }, feature.detail),
      feature.status === 'verified' && feature.evidence ? h('p', { class: 'small' }, h('strong', null, t('How it was verified:') + ' '), feature.evidence) : null,
      feature.status !== 'verified' ? h('p', { class: 'small muted' }, t('Not yet demonstrated or tested. This website shows no live data from the stick.')) : null
    );
    panel.replaceChildren(fresh);
    if (scroll && window.matchMedia('(max-width: 639px)').matches) {
      panel.scrollIntoView({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }

  features.forEach((feature, index) => {
    hotspots.push(
      h(
        'button',
        { class: 'hotspot', type: 'button', 'data-id': feature.id, 'aria-pressed': 'false', 'aria-label': `${index + 1}. ${feature.title}`, style: `left:${feature.x}%;top:${feature.y}%`, onclick: () => select(feature.id, { scroll: true }) },
        h('span', { 'aria-hidden': 'true' }, index + 1)
      )
    );
    listButtons.push(
      h(
        'button',
        { class: 'feature-btn', type: 'button', 'data-id': feature.id, 'aria-pressed': 'false', onclick: () => select(feature.id) },
        h('span', { class: 'num', 'aria-hidden': 'true' }, index + 1),
        h('span', null, feature.title)
      )
    );
  });

  const node = h(
    'div',
    { class: 'page' },
    h(
      'div',
      { class: 'page-head' },
      h('h1', null, t('The Survival Stick')),
      h('p', { class: 'muted' }, t('A mountain safety post designed to stand along hiking routes. Tap a number to see what each part is meant to do.'))
    ),
    h(
      'div',
      { class: 'stick-wrap' },
      h('div', { class: 'stick-stage' }, h('div', { class: 'stick-figure', role: 'group', 'aria-label': t('Illustration of the proposed Survival Stick with numbered parts') }, svgFromString(STICK_SVG), hotspots)),
      h('div', { class: 'stack' }, panel, h('div', { class: 'feature-list' }, listButtons))
    ),
    h(
      'section',
      { class: 'card', 'aria-labelledby': 'stick-legend' },
      h('h2', { id: 'stick-legend' }, t('What the labels mean')),
      h(
        'div',
        { class: 'legend' },
        h('div', null, h('span', { class: 'badge proposed' }, t('Proposed feature')), h('p', { class: 'muted' }, t('A concept still being developed. It may change and has not been demonstrated.'))),
        h('div', null, h('span', { class: 'badge verified' }, t('Verified feature')), h('p', { class: 'muted' }, t('A capability the project team has actually demonstrated or tested.')))
      )
    ),
    notice([
      h('strong', null, t('Illustration only.') + ' '),
      t('The drawing is a concept sketch, not the final product. This website is not connected to any stick: it cannot read sensors, check batteries or send alerts.')
    ])
  );

  select(features[0].id);
  return { title: t('Stick information'), tab: 'more', back: '#/more', node };
}
