import { describe, expect, it } from 'vitest';
import { defaultState } from '../state/defaults';
import { exportState, parseImportedState } from '../state/storage';
import { coachFromBackup, defaultCoach, sanitizeCoach } from './coachStorage';

describe('coach storage', () => {
  it('sanitizes garbage', () => {
    expect(sanitizeCoach(null)).toEqual(defaultCoach());
    expect(sanitizeCoach({ streakBreakAck: 'x', peeks: { '2026-09-01': 2, nope: 3, '2026-09-02': -1 }, wrongRuns: { a: 2, b: 'x' }, dismissed: { d: true, e: 1 } })).toEqual({
      version: 1,
      streakBreakAck: null,
      peeks: { '2026-09-01': 2 },
      wrongRuns: { a: 2 },
      dismissed: { d: true },
    });
  });

  it('rides along in the backup as an optional field', () => {
    const coach = { ...defaultCoach(), streakBreakAck: '2026-09-20', peeks: { '2026-09-21': 1 } };
    const text = exportState(defaultState(), { coach });
    expect(parseImportedState(text)).toEqual(defaultState());
    expect(coachFromBackup(text)).toEqual(coach);
    expect(coachFromBackup(exportState(defaultState()))).toBeNull();
  });
});
