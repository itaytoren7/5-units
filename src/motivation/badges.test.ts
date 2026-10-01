import { describe, expect, it } from 'vitest';
import { problems } from '@/data/problems';
import { questionnaireList } from '../lib/questionnaires';
import { slotSubtopics } from '../lib/progress';
import { defaultState } from '../state/defaults';
import { badges, evaluateBadges, masteredSlotExists, solvedProblemCount } from './badges';
import type { Streak } from './streak';
import type { SavedState } from '../state/types';

const noStreak: Streak = { current: 0, longest: 0, activeToday: false, atRisk: false };

function exam(score: number, id: string): SavedState['exams'][number] {
  return { id, questionnaire: '35581', startedAt: '2026-09-01T08:00:00.000Z', finishedAt: '2026-09-01T12:00:00.000Z', elapsedSeconds: 1, chosenSlots: [3], problemBySlot: {}, grades: {}, score, notes: '' };
}

describe('badges', () => {
  it('has ten unique badges', () => {
    expect(badges).toHaveLength(10);
    expect(new Set(badges.map((badge) => badge.id)).size).toBe(10);
  });

  it('starts with nothing earned', () => {
    expect(evaluateBadges({ saved: defaultState(), streak: noStreak })).toEqual([]);
  });

  it('unlocks simulation badges by count and score', () => {
    const saved = defaultState();
    saved.exams.push(exam(60, 'a'));
    expect(evaluateBadges({ saved, streak: noStreak })).toEqual(['first-simulation']);
    saved.exams.push(exam(90, 'b'), exam(40, 'c'), exam(40, 'd'), exam(40, 'e'));
    const earned = evaluateBadges({ saved, streak: noStreak });
    expect(earned).toEqual(expect.arrayContaining(['first-simulation', 'five-simulations', 'high-score']));
  });

  it('unlocks streak badges from the longest run', () => {
    const saved = defaultState();
    expect(evaluateBadges({ saved, streak: { ...noStreak, longest: 7 } })).toEqual(['streak-3', 'streak-7']);
    expect(evaluateBadges({ saved, streak: { ...noStreak, longest: 30 } })).toContain('streak-30');
  });

  it('unlocks the mastered-slot badge only when every in-scope subtopic of a slot is mastered', () => {
    const saved = defaultState();
    const questionnaire = questionnaireList[0];
    const slot = questionnaire.slots.find((entry) => entry.number === 3)!;
    const inScope = slotSubtopics(questionnaire, slot).filter((subtopic) => subtopic.status === 'in');
    for (const subtopic of inScope.slice(0, -1)) saved.ratings[subtopic.id] = 'mastered';
    expect(masteredSlotExists(saved)).toBe(false);
    saved.ratings[inScope[inScope.length - 1].id] = 'mastered';
    expect(masteredSlotExists(saved)).toBe(true);
    expect(evaluateBadges({ saved, streak: noStreak })).toContain('slot-mastered');
  });

  it('unlocks progress badges at 50% and 100% of a questionnaire', () => {
    const saved = defaultState();
    const questionnaire = questionnaireList[1];
    const inScope = questionnaire.topics.flatMap((topic) => topic.subtopics).filter((subtopic) => subtopic.status === 'in');
    for (const subtopic of inScope.slice(0, Math.ceil(inScope.length / 2))) saved.ratings[subtopic.id] = 'mastered';
    expect(evaluateBadges({ saved, streak: noStreak })).toContain('half-way');
    expect(evaluateBadges({ saved, streak: noStreak })).not.toContain('full-questionnaire');
    for (const subtopic of inScope) saved.ratings[subtopic.id] = 'mastered';
    expect(evaluateBadges({ saved, streak: noStreak })).toContain('full-questionnaire');
  });

  it('counts a problem as solved only when every section is marked', () => {
    const saved = defaultState();
    const [first, ...rest] = problems;
    saved.practice[first.id] = { problemId: first.id, sectionResults: { [first.sections[0].id]: 'correct' }, attempts: 1, lastPracticedAt: '2026-09-01T10:00:00.000Z' };
    expect(solvedProblemCount(saved)).toBe(0);
    for (const problem of [first, ...rest].slice(0, 10)) {
      saved.practice[problem.id] = { problemId: problem.id, sectionResults: Object.fromEntries(problem.sections.map((section) => [section.id, 'partial' as const])), attempts: 1, lastPracticedAt: '2026-09-01T10:00:00.000Z' };
    }
    expect(solvedProblemCount(saved)).toBe(10);
    expect(evaluateBadges({ saved, streak: noStreak })).toContain('ten-problems');
  });
});
