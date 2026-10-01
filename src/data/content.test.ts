/**
 * Structural + rendering checks for all authored content (problem bank and topic summaries):
 *  - every reference points at a real questionnaire / topic / 'in' subtopic
 *  - ids are unique and well-formed
 *  - every KaTeX segment compiles (throwOnError) so nothing renders as red error text in the app
 *  - no control characters that come from writing '\frac' inside a normal (non-raw) string
 */
import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { problems } from './problems';
import { summaries } from './summaries';
import { questionnaires } from './syllabus';

const controlChars = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

function mathSegments(text: string): Array<{ source: string; display: boolean }> {
  const segments: Array<{ source: string; display: boolean }> = [];
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match[1] !== undefined) segments.push({ source: match[1], display: true });
    else segments.push({ source: match[2], display: false });
  }
  return segments;
}

function expectRenderable(text: string, where: string) {
  expect(controlChars.test(text), `${where}: contains a control character — use String.raw for strings with backslashes`).toBe(false);
  for (const segment of mathSegments(text)) {
    expect(() => katex.renderToString(segment.source, { throwOnError: true, displayMode: segment.display, strict: false }), `${where}: KaTeX failed on "${segment.source}"`).not.toThrow();
  }
}

function questionnaireOf(code: string) {
  const questionnaire = questionnaires.find((item) => item.code === code);
  if (!questionnaire) throw new Error(`Unknown questionnaire ${code}`);
  return questionnaire;
}

describe('problem bank', () => {
  it('has unique, well-formed ids', () => {
    const ids = problems.map((problem) => problem.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const problem of problems) {
      expect(problem.id).toMatch(new RegExp(`^${problem.questionnaire}-${problem.slot}-\\d+$`));
      const sectionIds = problem.sections.map((section) => section.id);
      expect(new Set(sectionIds).size).toBe(sectionIds.length);
      for (const section of problem.sections) expect(section.id.startsWith(`${problem.id}-`), `${section.id} must start with ${problem.id}-`).toBe(true);
    }
  });

  it('references only real slots, topics and in-scope subtopics', () => {
    for (const problem of problems) {
      const questionnaire = questionnaireOf(problem.questionnaire);
      const slot = questionnaire.slots.find((item) => item.number === problem.slot);
      expect(slot, `${problem.id}: slot ${problem.slot} does not exist`).toBeDefined();
      expect(slot?.topicIds, `${problem.id}: topic ${problem.topicId} is not linked to slot ${problem.slot}`).toContain(problem.topicId);
      const topic = questionnaire.topics.find((item) => item.id === problem.topicId);
      expect(topic, `${problem.id}: unknown topic ${problem.topicId}`).toBeDefined();
      const inScope = new Map(questionnaire.topics.flatMap((item) => item.subtopics).map((subtopic) => [subtopic.id, subtopic.status]));
      expect(problem.subtopicIds.length).toBeGreaterThan(0);
      for (const subtopicId of problem.subtopicIds) {
        expect(inScope.has(subtopicId), `${problem.id}: unknown subtopic ${subtopicId}`).toBe(true);
        expect(inScope.get(subtopicId), `${problem.id}: subtopic ${subtopicId} is not in the exam`).toBe('in');
      }
    }
  });

  it('has complete sections with hints, steps and answers', () => {
    for (const problem of problems) {
      expect(problem.title.trim().length, `${problem.id}: title`).toBeGreaterThan(0);
      expect(problem.sections.length, `${problem.id}: sections`).toBeGreaterThanOrEqual(2);
      expect(problem.verified, `${problem.id}: seeded problems must start unverified`).toBe(false);
      expect(problem.estimatedMinutes).toBeGreaterThan(0);
      for (const section of problem.sections) {
        expect(section.statement.trim().length, `${section.id}: statement`).toBeGreaterThan(0);
        expect(section.hints.length, `${section.id}: hints`).toBeGreaterThanOrEqual(1);
        expect(section.solutionSteps.length, `${section.id}: steps`).toBeGreaterThanOrEqual(2);
        expect(section.finalAnswer.trim().length, `${section.id}: answer`).toBeGreaterThan(0);
        if (section.numericAnswer !== undefined) expect(Number.isFinite(section.numericAnswer), `${section.id}: numericAnswer`).toBe(true);
      }
    }
  });

  it('renders every math segment with KaTeX', () => {
    for (const problem of problems) {
      expectRenderable(problem.title, `${problem.id}.title`);
      for (const section of problem.sections) {
        expectRenderable(section.statement, `${section.id}.statement`);
        section.hints.forEach((hint, index) => expectRenderable(hint, `${section.id}.hints[${index}]`));
        section.solutionSteps.forEach((step, index) => expectRenderable(step, `${section.id}.solutionSteps[${index}]`));
        expectRenderable(section.finalAnswer, `${section.id}.finalAnswer`);
      }
      if (problem.figureSvg) expect(problem.figureSvg.trim().startsWith('<svg'), `${problem.id}: figureSvg must be an <svg> element`).toBe(true);
    }
  });
});

describe('topic summaries', () => {
  it('map to real topics, one summary per (questionnaire, topic)', () => {
    const keys = summaries.map((summary) => `${summary.questionnaire}:${summary.topicId}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const summary of summaries) {
      const questionnaire = questionnaireOf(summary.questionnaire);
      expect(questionnaire.topics.some((topic) => topic.id === summary.topicId), `${summary.questionnaire}:${summary.topicId} unknown topic`).toBe(true);
    }
  });

  it('are complete and render with KaTeX', () => {
    for (const summary of summaries) {
      const where = `${summary.questionnaire}:${summary.topicId}`;
      expect(summary.overview.trim().length, `${where}.overview`).toBeGreaterThan(0);
      expect(summary.keyPoints.length, `${where}.keyPoints`).toBeGreaterThanOrEqual(3);
      expect(summary.formulas.length, `${where}.formulas`).toBeGreaterThanOrEqual(1);
      expect(summary.bagrutPatterns.length, `${where}.bagrutPatterns`).toBeGreaterThanOrEqual(2);
      expect(summary.commonMistakes.length, `${where}.commonMistakes`).toBeGreaterThanOrEqual(2);
      expect(summary.workedExamples.length, `${where}.workedExamples`).toBeGreaterThanOrEqual(1);
      expectRenderable(summary.overview, `${where}.overview`);
      summary.keyPoints.forEach((point, index) => expectRenderable(point, `${where}.keyPoints[${index}]`));
      summary.bagrutPatterns.forEach((point, index) => expectRenderable(point, `${where}.bagrutPatterns[${index}]`));
      summary.commonMistakes.forEach((point, index) => expectRenderable(point, `${where}.commonMistakes[${index}]`));
      for (const formula of summary.formulas) {
        expect(formula.name.trim().length, `${where}: formula name`).toBeGreaterThan(0);
        expect(controlChars.test(formula.latex), `${where}: formula "${formula.name}" contains a control character`).toBe(false);
        expect(() => katex.renderToString(formula.latex, { throwOnError: true, displayMode: true, strict: false }), `${where}: KaTeX failed on formula "${formula.name}"`).not.toThrow();
        if (formula.note) expectRenderable(formula.note, `${where}: formula note "${formula.name}"`);
      }
      for (const example of summary.workedExamples) {
        expectRenderable(example.title, `${where}: example title`);
        expectRenderable(example.problem, `${where}: example "${example.title}" problem`);
        expect(example.steps.length, `${where}: example "${example.title}" steps`).toBeGreaterThanOrEqual(2);
        example.steps.forEach((step, index) => expectRenderable(step, `${where}: example "${example.title}" step ${index}`));
        expectRenderable(example.answer, `${where}: example "${example.title}" answer`);
      }
    }
  });
});
