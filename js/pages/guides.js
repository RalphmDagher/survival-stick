/* PAGE 3 — Interactive emergency guides (branching flows). */
import { h, linkRow, prototypeNotice } from '../ui.js';
import { icon, svgFromString } from '../icons.js';
import { t, getContent } from '../i18n.js';
import { diagram } from '../illustrations.js';

const findGuide = (id) => getContent().guides.find((guide) => guide.id === id);

/* #/guides */
export function guidesIndex() {
  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('h1', null, t('Emergency guides')), h('p', { class: 'muted' }, t('Choose what is happening. You will be guided one step at a time.'))),
    h(
      'div',
      { class: 'linklist' },
      getContent().guides.map((guide) => linkRow({ href: `#/guides/${guide.id}`, iconName: guide.icon, title: guide.title, sub: guide.short }))
    ),
    prototypeNotice()
  );
  return { title: t('Emergency guides'), tab: 'guides', sos: true, node };
}

/* #/guides/avalanche — the branching question */
export function guideStart(id) {
  const guide = findGuide(id);
  if (!guide) return null;
  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('p', { class: 'step-number' }, guide.title), h('h1', null, guide.question)),
    h(
      'div',
      { class: 'stack' },
      guide.options.map((option) =>
        h(
          'a',
          { class: 'choice' + (option.urgent ? ' urgent' : ''), href: `#/guides/${guide.id}/${option.path}/1` },
          h('span', { class: 'icon-box' }, icon(option.icon)),
          h('span', { class: 'linkrow-body' }, h('strong', null, option.label), h('span', null, option.detail)),
          h('span', { class: 'chev flip muted' }, icon('chevronRight'))
        )
      )
    ),
    h('a', { class: 'btn btn-danger btn-block', href: '#/sos' }, icon('phone'), t('Life in danger? Open Emergency SOS')),
    prototypeNotice()
  );
  return { title: guide.title, tab: 'guides', back: '#/guides', sos: true, node };
}

/* #/guides/avalanche/caught/2 — one step. Step number (total + 1) is the end screen. */
export function guideStep(id, pathId, stepParam) {
  const guide = findGuide(id);
  const path = guide && guide.paths[pathId];
  if (!path) return null;
  const total = path.steps.length;
  const number = Number(stepParam || 1);
  if (!Number.isInteger(number) || number < 1 || number > total + 1) return null;

  const base = `#/guides/${guide.id}/${pathId}`;
  const startHref = `#/guides/${guide.id}`;

  if (number === total + 1) {
    const node = h(
      'div',
      { class: 'page' },
      h('div', { class: 'page-head' }, h('p', { class: 'step-number' }, path.title), h('h1', null, t('End of this guide'))),
      h(
        'div',
        { class: 'card' },
        h('p', { class: 'step-instruction' }, t('Keep following the last steps until the situation is safe or help arrives.')),
        h('p', { class: 'step-explain' }, t('Reaching the end of this guide does not mean help has been called. If anyone is in danger, call the emergency services.'))
      ),
      h('a', { class: 'btn btn-danger btn-lg btn-block', href: '#/sos' }, icon('phone'), t('Open Emergency SOS')),
      h('div', { class: 'btn-row' }, h('a', { class: 'btn', href: `${base}/1` }, icon('refresh'), t('Read again')), h('a', { class: 'btn', href: '#/guides' }, icon('guides'), t('All guides')))
    );
    return { title: path.title, tab: 'guides', back: `${base}/${total}`, sos: true, node };
  }

  const step = path.steps[number - 1];
  const art = step.ill ? diagram(step.ill, t) : null;
  const percent = Math.round((number / total) * 100);

  const node = h(
    'div',
    { class: 'page' },
    h(
      'div',
      { class: 'progress' },
      h('div', { class: 'progress-meta' }, h('span', null, path.title), h('span', null, t('Step {n} of {total}', { n: number, total }))),
      h(
        'div',
        { class: 'progress-track', role: 'progressbar', 'aria-label': t('Guide progress'), 'aria-valuemin': '1', 'aria-valuemax': String(total), 'aria-valuenow': String(number) },
        h('div', { class: 'progress-fill', style: `width:${percent}%` })
      )
    ),
    h(
      'article',
      { class: 'card step-card' },
      h('div', { class: 'inline' }, h('span', { class: 'icon-box' }, icon(step.icon || guide.icon)), h('span', { class: 'step-number' }, t('Step {n}', { n: number }))),
      h('h1', null, step.title),
      h('p', { class: 'step-instruction' }, step.instruction),
      art ? h('div', { class: 'step-ill' }, svgFromString(art)) : null,
      h('p', { class: 'step-explain' }, step.explanation),
      step.link ? h('a', { class: 'btn btn-block', href: step.link.href }, icon('gps'), t(step.link.label)) : null,
      step.icon === 'phone' ? h('a', { class: 'btn btn-danger btn-block', href: '#/sos' }, icon('phone'), t('Open Emergency SOS')) : null
    ),
    h(
      'div',
      { class: 'nav-buttons' },
      h('a', { class: 'btn btn-ghost flip', href: number > 1 ? `${base}/${number - 1}` : startHref }, icon('chevronLeft'), t('Back')),
      h('a', { class: 'btn btn-primary flip', href: `${base}/${number + 1}` }, number === total ? t('Finish') : t('Next'), icon('chevronRight'))
    ),
    h('a', { class: 'text-link center', href: startHref }, t('Choose a different situation'))
  );

  return { title: guide.title, tab: 'guides', back: number > 1 ? `${base}/${number - 1}` : startHref, sos: true, node };
}
