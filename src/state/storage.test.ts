import { describe, expect, it } from 'vitest';
import { defaultState } from './defaults';
import { exportState, parseImportedState, sanitizeState } from './storage';

describe('state storage', () => {
  it('falls back to defaults for garbage', () => {
    expect(sanitizeState(null)).toEqual(defaultState());
    expect(sanitizeState('nope')).toEqual(defaultState());
    expect(sanitizeState({ theme: 'neon', ratings: { a: 'great', b: 'weak' }, examDates: { '35581': 'soon', '35582': '2026-07-01' } })).toMatchObject({
      theme: 'light',
      ratings: { b: 'weak' },
      examDates: { '35582': '2026-07-01' },
    });
  });

  it('round-trips an export', () => {
    const state = defaultState();
    state.ratings['probability-basics'] = 'mastered';
    state.mistakes.push({ id: 'm1', createdAt: '2026-01-01T00:00:00.000Z', questionnaire: '35581', topicId: 'probability', type: 'reading', description: 'x', correctApproach: 'y' });
    state.reviews.push({ id: 'r1', createdAt: '2026-01-01T00:00:00.000Z', sourceType: 'mistake', sourceId: 'm1', questionnaire: '35581', stage: 1, dueAt: '2026-01-04' });
    const restored = parseImportedState(exportState(state));
    expect(restored).toEqual(state);
  });

  it('keeps learned lessons and official-exam progress, and imports old backups without them', () => {
    const state = defaultState();
    state.learnedLessons['trig-sine-law'] = true;
    state.officialExams['35581-2025-6'] = { status: 'done', score: 82, date: '2026-09-30' };
    expect(parseImportedState(exportState(state))).toEqual(state);
    const old = JSON.parse(exportState(defaultState()));
    delete old.learnedLessons;
    delete old.officialExams;
    expect(parseImportedState(JSON.stringify(old))).toEqual(defaultState());
    expect(sanitizeState({ version: 1, learnedLessons: { a: true, b: 'yes' }, officialExams: { x: { status: 'done', score: 140 }, y: 3 } })).toMatchObject({
      learnedLessons: { a: true },
      officialExams: { x: { status: 'done', score: 100 } },
    });
  });

  it('rejects files without a version marker', () => {
    expect(() => parseImportedState('{"ratings":{}}')).toThrow();
    expect(() => parseImportedState('not json')).toThrow();
  });
});
