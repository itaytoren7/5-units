import { describe, expect, it } from 'vitest';
import { createRng } from './rng';

describe('createRng', () => {
  it('is deterministic per seed and stays in range', () => {
    const a = createRng(42);
    const b = createRng(42);
    for (let i = 0; i < 200; i += 1) {
      const value = a.int(-5, 7);
      expect(value).toBe(b.int(-5, 7));
      expect(value).toBeGreaterThanOrEqual(-5);
      expect(value).toBeLessThanOrEqual(7);
    }
    const c = createRng(43);
    expect([0, 1, 2, 3, 4].map(() => c.next())).not.toEqual([0, 1, 2, 3, 4].map(() => createRng(42).next()));
  });
});
