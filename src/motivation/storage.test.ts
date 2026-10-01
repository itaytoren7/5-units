import { describe, expect, it } from 'vitest';
import { defaultState } from '../state/defaults';
import { exportState, parseImportedState } from '../state/storage';
import { defaultMotivation, motivationFromBackup, sanitizeMotivation } from './storage';

describe('motivation storage', () => {
  it('sanitizes garbage into defaults', () => {
    expect(sanitizeMotivation(null)).toEqual(defaultMotivation());
    expect(sanitizeMotivation({ activityDays: ['2026-01-01', 'nope', '2026-01-01'], unlockedBadges: { a: '2026-01-02T00:00:00.000Z', b: 5 }, reducedMotion: 'yes' })).toEqual({
      version: 1,
      activityDays: ['2026-01-01'],
      unlockedBadges: { a: '2026-01-02T00:00:00.000Z' },
      seeded: false,
      reducedMotion: false,
    });
  });

  it('rides along in the backup as an optional field and leaves the main state untouched', () => {
    const state = defaultState();
    state.ratings['probability-basics'] = 'weak';
    const motivation = { ...defaultMotivation(), activityDays: ['2026-03-01'], unlockedBadges: { 'first-simulation': '2026-03-01T10:00:00.000Z' }, seeded: true, reducedMotion: true };
    const text = exportState(state, { motivation });
    expect(parseImportedState(text)).toEqual(state);
    expect(motivationFromBackup(text)).toEqual(motivation);
  });

  it('returns null for backups made before the motivation layer existed', () => {
    expect(motivationFromBackup(exportState(defaultState()))).toBeNull();
    expect(motivationFromBackup('not json')).toBeNull();
  });
});
