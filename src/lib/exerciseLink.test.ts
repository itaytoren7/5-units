import { describe, expect, it } from 'vitest';
import { exerciseLink } from './selectors';

describe('exerciseLink', () => {
  it('links a bagrut problem to the practice page', () => {
    expect(exerciseLink('35581-4-1')).toBe('/practice/35581-4-1');
  });

  it('links a lesson exercise to its lesson, not to /practice', () => {
    const link = exerciseLink('trig-sine-law-3');
    expect(link).not.toBeNull();
    expect(link).not.toContain('/practice/');
    expect(link).toContain('#ex-trig-sine-law-3');
  });

  it('returns null for an unknown id', () => {
    expect(exerciseLink('no-such-exercise')).toBeNull();
  });
});
