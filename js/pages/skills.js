/* PAGE 5 — Survival skills: lesson cards and short lessons with a quick check. */
import { h, linkRow, prototypeNotice, statusLine } from '../ui.js';
import { icon, svgFromString } from '../icons.js';
import { t, getContent } from '../i18n.js';
import { diagram } from '../illustrations.js';
import { store } from '../store.js';

const doneLessons = () => store.get('lessonsDone', []);

/* #/skills */
export function skillsIndex() {
  const done = doneLessons();
  const node = h(
    'div',
    { class: 'page' },
    h('div', { class: 'page-head' }, h('h1', null, t('Survival skills')), h('p', { class: 'muted' }, t('Short lessons to read before you need them. Each ends with a quick check.'))),
    h(
      'div',
      { class: 'linklist' },
      getContent().skills.map((lesson) =>
        linkRow({
          href: `#/skills/${lesson.id}`,
          iconName: lesson.icon,
          title: lesson.title,
          sub: `${lesson.short} · ${t('{n} min', { n: lesson.minutes })}${done.includes(lesson.id) ? ' · ' + t('check passed') : ''}`
        })
      )
    ),
    prototypeNotice()
  );
  return { title: t('Survival skills'), tab: 'more', back: '#/more', node };
}

/* #/skills/compass */
export function skillLesson(id) {
  const lessons = getContent().skills;
  const index = lessons.findIndex((lesson) => lesson.id === id);
  if (index < 0) return null;
  const lesson = lessons[index];
  const next = lessons[(index + 1) % lessons.length];
  const art = lesson.ill ? diagram(lesson.ill, t) : null;

  /* Quick check */
  const feedback = statusLine();
  const buttons = lesson.quiz.options.map((option) =>
    h(
      'button',
      {
        class: 'quiz-option',
        type: 'button',
        'aria-pressed': 'false',
        onclick: (event) => {
          buttons.forEach((button) => {
            button.setAttribute('aria-pressed', 'false');
            button.classList.remove('right', 'wrong');
          });
          const button = event.currentTarget;
          button.setAttribute('aria-pressed', 'true');
          button.classList.add(option.correct ? 'right' : 'wrong');
          feedback.set(option.why, option.correct ? 'ok' : 'err');
          if (option.correct) {
            const done = doneLessons();
            if (!done.includes(lesson.id)) store.set('lessonsDone', [...done, lesson.id]);
          }
        }
      },
      option.text
    )
  );

  const node = h(
    'div',
    { class: 'page' },
    h(
      'div',
      { class: 'page-head' },
      h('p', { class: 'step-number' }, t('Lesson {n} of {total}', { n: index + 1, total: lessons.length }) + ' · ' + t('{n} min', { n: lesson.minutes })),
      h('h1', null, lesson.title),
      h('p', { class: 'muted' }, lesson.intro)
    ),
    art ? h('div', { class: 'step-ill' }, svgFromString(art)) : null,
    lesson.sections.map((section) => h('section', { class: 'card' }, h('h2', null, section.heading), h('div', { class: 'prose' }, h('ul', null, section.points.map((point) => h('li', null, point)))))),
    h('section', { class: 'card', 'aria-labelledby': 'quiz-title' }, h('h2', { id: 'quiz-title' }, t('Quick check')), h('p', null, lesson.quiz.question), h('div', { class: 'stack' }, buttons), feedback.node),
    h('a', { class: 'btn btn-primary btn-block flip', href: `#/skills/${next.id}` }, t('Next lesson: {title}', next), icon('chevronRight')),
    h('a', { class: 'btn btn-ghost btn-block', href: '#/skills' }, t('All lessons'))
  );

  return { title: t('Survival skills'), tab: 'more', back: '#/skills', node };
}
