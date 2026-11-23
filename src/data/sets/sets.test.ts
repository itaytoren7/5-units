/**
 * The one generic test for every exercise set: ids, syllabus links, structure, and every numeric
 * answer recomputed from its `verify` expression (an independent mathjs computation from the givens).
 */
import katex from 'katex';
import { derivative, evaluate } from 'mathjs';
import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { questionnaires } from '../syllabus';
import { Diagram } from '../../sets/Diagram';
import type { CatalogEntry } from './catalog';
import type { DiagramSpec, ExerciseSet } from './types';

/**
 * While a set is being written, check that one file on its own:
 *   SET_FILE=my-set.ts npx vitest run src/data/sets/sets.test.ts
 * Without SET_FILE the whole folder and the catalogue are checked.
 */
const onlyFile = process.env.SET_FILE;
let sets: ExerciseSet[];
let setsCatalog: CatalogEntry[] = [];
if (onlyFile) {
  const loaders = import.meta.glob<Record<string, unknown>>('./*.ts');
  const load = loaders[`./${onlyFile}`];
  if (!load) throw new Error(`SET_FILE: no file ${onlyFile} in src/data/sets`);
  const module = await load();
  sets = Object.values(module).filter((value): value is ExerciseSet => typeof value === 'object' && value !== null && Array.isArray((value as ExerciseSet).exercises));
  if (sets.length === 0) throw new Error(`SET_FILE: ${onlyFile} exports no ExerciseSet`);
} else {
  ({ sets, setsCatalog } = await import('./index'));
}

function expectDiagramRenders(spec: DiagramSpec, where: string) {
  let markup = '';
  expect(() => {
    markup = renderToStaticMarkup(createElement(Diagram, { spec }));
  }, `${where}: the diagram must render`).not.toThrow();
  expect(markup, `${where}: the diagram renders an svg`).toContain('<svg');
  expect(markup, `${where}: the diagram has no NaN coordinates`).not.toContain('NaN');
}

/* ---- helpers available inside `verify` ---- */

function integrate(expr: string, a: number, b: number, n = 2000): number {
  const h = (b - a) / n;
  let sum = evaluate(expr, { x: a }) + evaluate(expr, { x: b });
  for (let i = 1; i < n; i += 1) sum += (i % 2 === 0 ? 2 : 4) * Number(evaluate(expr, { x: a + i * h }));
  return (sum * h) / 3;
}

function deriv(expr: string, x0: number): number {
  return Number(derivative(expr, 'x').evaluate({ x: x0 }));
}

function root(expr: string, a: number, b: number): number {
  let lo = a;
  let hi = b;
  let flo = Number(evaluate(expr, { x: lo }));
  if (Math.sign(flo) === Math.sign(Number(evaluate(expr, { x: hi })))) throw new Error(`root: no sign change on [${a}, ${b}]`);
  for (let i = 0; i < 200 && hi - lo > 1e-13; i += 1) {
    const mid = (lo + hi) / 2;
    const fmid = Number(evaluate(expr, { x: mid }));
    if (Math.sign(fmid) === Math.sign(flo)) {
      lo = mid;
      flo = fmid;
    } else hi = mid;
  }
  return (lo + hi) / 2;
}

function nCr(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let result = 1;
  for (let i = 1; i <= k; i += 1) result = (result * (n - k + i)) / i;
  return Math.round(result);
}

const scope = { integrate, deriv, root, nCr };

const controlChars = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

function expectRenderable(text: string, where: string) {
  expect(controlChars.test(text), `${where}: control character — use String.raw`).toBe(false);
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const source = match[1] ?? match[2];
    expect(() => katex.renderToString(source, { throwOnError: true, displayMode: match![1] !== undefined, strict: false }), `${where}: KaTeX failed on "${source}"`).not.toThrow();
  }
  expect((text.replace(/\$\$[\s\S]+?\$\$/g, '').match(/\$/g) ?? []).length % 2, `${where}: unbalanced $`).toBe(0);
}

function subtopicStatus(code: string, subtopicId: string) {
  const questionnaire = questionnaires.find((entry) => entry.code === code);
  for (const topic of questionnaire?.topics ?? []) {
    const subtopic = topic.subtopics.find((entry) => entry.id === subtopicId);
    if (subtopic) return subtopic.status;
  }
  return undefined;
}

describe('exercise sets', () => {
  it.skipIf(Boolean(onlyFile))('have unique ids and are listed in the catalog as done', () => {
    const ids = sets.map((set) => set.id);
    expect(new Set(ids).size).toBe(ids.length);
    const exerciseIds = sets.flatMap((set) => set.exercises.map((exercise) => exercise.id));
    expect(new Set(exerciseIds).size).toBe(exerciseIds.length);
    for (const set of sets) {
      const entry = setsCatalog.find((item) => item.id === set.id);
      expect(entry, `${set.id}: missing from catalog`).toBeDefined();
      expect(entry?.status, `${set.id}: catalog status`).toBe('done');
      expect(entry?.questionnaire).toBe(set.questionnaire);
    }
    for (const entry of setsCatalog) if (entry.status === 'done') expect(ids, `${entry.id}: marked done but has no file`).toContain(entry.id);
    const catalogIds = setsCatalog.map((entry) => entry.id);
    expect(new Set(catalogIds).size).toBe(catalogIds.length);
    for (const entry of setsCatalog) {
      const questionnaire = questionnaires.find((item) => item.code === entry.questionnaire);
      expect(questionnaire?.topics.some((topic) => topic.id === entry.topicId), `${entry.id}: topic ${entry.topicId}`).toBe(true);
      expect(entry.summary.trim().length, `${entry.id}: summary`).toBeGreaterThan(20);
    }
  });

  it.each(sets.map((set) => [set.id, set] as const))('%s: syllabus links, structure and numeric answers', (_id, set) => {
    const questionnaire = questionnaires.find((entry) => entry.code === set.questionnaire)!;
    for (const topicId of set.topicIds) expect(questionnaire.topics.some((topic) => topic.id === topicId), `${set.id}: topic ${topicId}`).toBe(true);
    expect(set.exercises.length, `${set.id}: 12 exercises`).toBe(12);
    let level = 0;
    for (const exercise of set.exercises) {
      expect(exercise.level, `${exercise.id}: levels never go down`).toBeGreaterThanOrEqual(level);
      level = exercise.level;
      expect(questionnaire.topics.some((topic) => topic.id === exercise.topicId), `${exercise.id}: topic ${exercise.topicId}`).toBe(true);
      expect(exercise.subtopicIds.length, `${exercise.id}: subtopics`).toBeGreaterThan(0);
      for (const subtopicId of exercise.subtopicIds) expect(subtopicStatus(set.questionnaire, subtopicId), `${exercise.id}: subtopic ${subtopicId} must exist and be in the exam`).toBe('in');
      expect(exercise.sections.length, `${exercise.id}: sections`).toBeGreaterThan(0);
      if (exercise.level === 1) expect(exercise.sections.length, `${exercise.id}: level 1 is one step`).toBe(1);
      if (exercise.level >= 2) expect(exercise.sections.length, `${exercise.id}: level ${exercise.level} has several sections`).toBeGreaterThanOrEqual(2);
      expectRenderable(exercise.intro, `${exercise.id}.intro`);
      expect(exercise.diagram.kind.length).toBeGreaterThan(0);
      expectDiagramRenders(exercise.diagram, `${exercise.id}.diagram`);
      if (exercise.solutionDiagram) expectDiagramRenders(exercise.solutionDiagram, `${exercise.id}.solutionDiagram`);
      expect(exercise.id, `${exercise.id}: ids are unique inside the set`).toBe(set.exercises.find((other) => other.id === exercise.id)?.id);
      const labels = exercise.sections.map((section) => section.label);
      expect(labels).toEqual(['א', 'ב', 'ג', 'ד', 'ה', 'ו'].slice(0, labels.length));
      for (const section of exercise.sections) {
        const where = `${exercise.id}:${section.label}`;
        expect(section.hints.length, `${where}: at least one hint`).toBeGreaterThanOrEqual(1);
        expect(section.hints.length, `${where}: at most three hints`).toBeLessThanOrEqual(3);
        expect(section.short.trim().length, `${where}: short`).toBeGreaterThan(0);
        expect(section.full.length, `${where}: full steps`).toBeGreaterThanOrEqual(1);
        expectRenderable(section.prompt, `${where}.prompt`);
        section.hints.forEach((hint, index) => expectRenderable(hint, `${where}.hints[${index}]`));
        expectRenderable(section.short, `${where}.short`);
        section.full.forEach((step, index) => expectRenderable(step, `${where}.full[${index}]`));
        const { check } = section;
        if (check.kind === 'numeric') {
          expect(Number.isFinite(check.answer), `${where}: answer`).toBe(true);
          expect(check.verify.trim().length, `${where}: verify`).toBeGreaterThan(0);
          expect(check.verify.trim(), `${where}: verify must recompute, not restate the number`).not.toBe(String(check.answer));
          const computed = Number(evaluate(check.verify, { ...scope }));
          expect(Number.isFinite(computed), `${where}: verify evaluates`).toBe(true);
          expect(Math.abs(computed - check.answer), `${where}: verify ≈ answer (${computed} vs ${check.answer})`).toBeLessThanOrEqual(Math.max(Math.abs(check.answer) * 1e-6, 1e-9));
        } else if (check.kind === 'choice') {
          expect(check.options.length, `${where}: options`).toBeGreaterThanOrEqual(2);
          expect(check.correct, `${where}: correct index`).toBeGreaterThanOrEqual(0);
          expect(check.correct, `${where}: correct index`).toBeLessThan(check.options.length);
          check.options.forEach((option, index) => expectRenderable(option, `${where}.options[${index}]`));
        }
      }
    }
  });
});
