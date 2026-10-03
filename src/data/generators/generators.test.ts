/**
 * Contract for every "infinite practice" generator: deterministic per seed, complete, renderable,
 * attached to real in-scope lessons, unique ids. Numeric correctness is tested per chapter
 * (<chapter>.test.ts) by recomputing the answers from `data` independently.
 */
import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { isInScope, lessonById } from '../lessons';
import { createRng, generators } from './index';

const controlChars = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

function expectRenderable(text: string, where: string) {
  expect(controlChars.test(text), `${where}: control character`).toBe(false);
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const source = match[1] ?? match[2];
    expect(() => katex.renderToString(source, { throwOnError: true, displayMode: match![1] !== undefined, strict: false }), `${where}: KaTeX failed on "${source}"`).not.toThrow();
  }
  expect((text.replace(/\$\$[\s\S]+?\$\$/g, '').match(/\$/g) ?? []).length % 2, `${where}: unbalanced $`).toBe(0);
  expect(text, `${where}: unformatted number`).not.toMatch(/\d\.\d{7,}/);
  expect(text, `${where}: NaN / Infinity / undefined`).not.toMatch(/NaN|Infinity|undefined/);
}

describe('generators', () => {
  it('have unique ids and point at in-scope lessons', () => {
    const ids = generators.map((generator) => generator.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const generator of generators) {
      expect(generator.id).toMatch(/^gen-[a-z0-9-]+$/);
      expect(generator.lessonIds.length).toBeGreaterThan(0);
      for (const lessonId of generator.lessonIds) {
        const lesson = lessonById(lessonId);
        expect(lesson, `${generator.id}: unknown lesson ${lessonId}`).toBeDefined();
        expect(lesson && isInScope(lesson.status), `${generator.id}: lesson ${lessonId} is out of the exam`).toBe(true);
      }
    }
  });

  it.each(generators.map((generator) => [generator.id, generator] as const))('%s is deterministic, complete and renderable over 150 seeds', (_id, generator) => {
    for (let seed = 1; seed <= 150; seed += 1) {
      const exercise = generator.generate(createRng(seed));
      const again = generator.generate(createRng(seed));
      expect(again).toEqual(exercise);
      const where = `${generator.id} seed ${seed}`;
      expect(exercise.statement.trim().length).toBeGreaterThan(10);
      expect(exercise.hints.length).toBeGreaterThanOrEqual(1);
      expect(exercise.hints.length).toBeLessThanOrEqual(3);
      expect(exercise.solutionSteps.length).toBeGreaterThanOrEqual(2);
      expect(exercise.solutionSteps.length).toBeLessThanOrEqual(8);
      expect(exercise.answers.length).toBeGreaterThan(0);
      for (const answer of exercise.answers) {
        expect(Number.isFinite(answer.value), `${where}: answer`).toBe(true);
        expectRenderable(answer.label, `${where}: label`);
      }
      expectRenderable(exercise.statement, `${where}: statement`);
      exercise.hints.forEach((hint) => expectRenderable(hint, `${where}: hint`));
      exercise.solutionSteps.forEach((step) => expectRenderable(step, `${where}: step`));
      expectRenderable(exercise.finalAnswer, `${where}: final answer`);
      for (const value of Object.values(exercise.data)) expect(Number.isFinite(value), `${where}: data`).toBe(true);
      if (exercise.figureSvg) {
        expect(exercise.figureSvg.trim().startsWith('<svg')).toBe(true);
        expect(exercise.figureSvg).not.toMatch(/<svg[^>]*\s(width|height)=/);
      }
    }
  });
});
