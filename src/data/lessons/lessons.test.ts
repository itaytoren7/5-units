/**
 * Structure + rendering checks for the lessons (study-book sub-topics) and their focused exercises.
 * Numeric correctness is checked in the per-chapter tests next to each content file.
 */
import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { problems } from '../problems';
import { questionnaires } from '../syllabus';
import { chapters, isInScope, lessonCatalog, lessonContent, lessons } from './index';

const controlChars = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

function expectRenderable(text: string, where: string) {
  expect(controlChars.test(text), `${where}: contains a control character — use String.raw for strings with backslashes`).toBe(false);
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const source = match[1] ?? match[2];
    const display = match[1] !== undefined;
    expect(() => katex.renderToString(source, { throwOnError: true, displayMode: display, strict: false }), `${where}: KaTeX failed on "${source}"`).not.toThrow();
  }
  const withoutDisplay = text.replace(/\$\$[\s\S]+?\$\$/g, '');
  expect((withoutDisplay.match(/\$/g) ?? []).length % 2, `${where}: unbalanced $`).toBe(0);
}

function syllabusStatus(code: string, subtopicId: string) {
  const questionnaire = questionnaires.find((entry) => entry.code === code);
  for (const topic of questionnaire?.topics ?? []) {
    const subtopic = topic.subtopics.find((entry) => entry.id === subtopicId);
    if (subtopic) return subtopic.status;
  }
  return undefined;
}

describe('lesson catalog', () => {
  it('has unique ids and known chapters, topics and subtopics', () => {
    const ids = lessonCatalog.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const meta of lessonCatalog) {
      expect(chapters.some((chapter) => chapter.id === meta.chapterId), meta.id).toBe(true);
      const questionnaire = questionnaires.find((entry) => entry.code === meta.questionnaire)!;
      expect(questionnaire.topics.some((topic) => topic.id === meta.topicId), `${meta.id}: unknown topic ${meta.topicId}`).toBe(true);
      expect(meta.subtopicIds.length, meta.id).toBeGreaterThan(0);
      for (const subtopicId of meta.subtopicIds) {
        const status = syllabusStatus(meta.questionnaire, subtopicId);
        expect(status, `${meta.id}: unknown subtopic ${subtopicId}`).toBeDefined();
        if (isInScope(meta.status)) expect(status, `${meta.id}: in-scope lesson uses out-of-scope subtopic ${subtopicId}`).toBe('in');
      }
      for (const slot of meta.slots) expect(questionnaire.slots.some((entry) => entry.number === slot), `${meta.id}: slot ${slot}`).toBe(true);
      if (meta.status !== 'in') expect(meta.statusNote, `${meta.id}: partial / out lessons explain why`).toBeTruthy();
      if (meta.statusNote) expectRenderable(meta.statusNote, `${meta.id}.statusNote`);
    }
  });

  it('only has content for catalogued lessons, and none for lessons removed by the מיקוד', () => {
    for (const id of Object.keys(lessonContent)) {
      const meta = lessonCatalog.find((entry) => entry.id === id);
      expect(meta, `content for unknown lesson ${id}`).toBeDefined();
      if (meta) expect(isInScope(meta.status), `${id} is out of the exam and must not have content`).toBe(true);
    }
    for (const entry of lessons) if (!isInScope(entry.status)) expect(entry.exercises.length, entry.id).toBe(0);
  });
});

describe('lesson content', () => {
  const inScope = lessons.filter((entry) => isInScope(entry.status));

  it.each(inScope.map((entry) => [entry.id, entry] as const))('%s has an intro, key facts and enough focused exercises', (_id, entry) => {
    expect(entry.intro.trim().length, `${entry.id}.intro`).toBeGreaterThan(40);
    expect(entry.keyFacts.length, `${entry.id}.keyFacts`).toBeGreaterThanOrEqual(3);
    expect(entry.keyFacts.length, `${entry.id}.keyFacts`).toBeLessThanOrEqual(8);
    const authored = entry.exercises.filter((exercise) => !exercise.source);
    expect(authored.length, `${entry.id}: authored exercises`).toBeGreaterThanOrEqual(entry.kind === 'review' ? 5 : 6);
    expect(authored.map((exercise) => exercise.id)).toEqual(authored.map((_, index) => `${entry.id}-${index + 1}`));
    const difficulties = new Set(authored.map((exercise) => exercise.difficulty));
    if (entry.kind === 'core') expect(difficulties.has(1), `${entry.id}: needs a warm-up (difficulty 1)`).toBe(true);
    expect(difficulties.has(2) || difficulties.has(3), `${entry.id}: needs bagrut-level exercises`).toBe(true);
  });

  it('exercises are complete, unique and render with KaTeX', () => {
    const seen = new Set(problems.flatMap((problem) => [problem.id, ...problem.sections.map((section) => section.id)]));
    for (const entry of lessons) {
      expectRenderable(entry.intro, `${entry.id}.intro`);
      entry.keyFacts.forEach((fact, index) => expectRenderable(fact, `${entry.id}.keyFacts[${index}]`));
      let openSourceIndex = 0;
      for (const exercise of entry.exercises) {
        expect(seen.has(exercise.id), `duplicate id ${exercise.id}`).toBe(false);
        seen.add(exercise.id);
        if (exercise.source) {
          openSourceIndex += 1;
          expect(exercise.id).toBe(`${entry.id}-os${openSourceIndex}`);
          expect(exercise.source.url).toMatch(/^https:\/\//);
          expect(exercise.source.license.length).toBeGreaterThan(0);
          expect(exercise.source.licenseUrl).toMatch(/^https:\/\//);
          expect(exercise.source.section.length).toBeGreaterThan(0);
        }
        expect([1, 2, 3]).toContain(exercise.difficulty);
        expect(exercise.hints.length, `${exercise.id}: hints`).toBeGreaterThanOrEqual(1);
        expect(exercise.hints.length, `${exercise.id}: hints`).toBeLessThanOrEqual(3);
        expect(exercise.solutionSteps.length, `${exercise.id}: steps`).toBeGreaterThanOrEqual(2);
        expect(exercise.solutionSteps.length, `${exercise.id}: steps`).toBeLessThanOrEqual(8);
        expect(exercise.finalAnswer.trim().length, `${exercise.id}: final answer`).toBeGreaterThan(0);
        expectRenderable(exercise.statement, `${exercise.id}.statement`);
        exercise.hints.forEach((hint, index) => expectRenderable(hint, `${exercise.id}.hints[${index}]`));
        exercise.solutionSteps.forEach((step, index) => expectRenderable(step, `${exercise.id}.steps[${index}]`));
        expectRenderable(exercise.finalAnswer, `${exercise.id}.finalAnswer`);
        for (const answer of exercise.answers ?? []) {
          expect(Number.isFinite(answer.value), `${exercise.id}: answer value`).toBe(true);
          expect(answer.label.trim().length, `${exercise.id}: answer label`).toBeGreaterThan(0);
          expectRenderable(answer.label, `${exercise.id}: answer label`);
          if (answer.tolerance !== undefined) expect(answer.tolerance).toBeGreaterThan(0);
        }
        if (exercise.figureSvg) {
          expect(exercise.figureSvg.trim().startsWith('<svg'), `${exercise.id}: figure`).toBe(true);
          expect(exercise.figureSvg).toContain('viewBox=');
          expect(exercise.figureSvg).not.toMatch(/<svg[^>]*\s(width|height)=/);
        }
      }
    }
   }, 60_000);
});
