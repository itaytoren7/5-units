import { describe, expect, it } from 'vitest';
import { coef, fmt, fracTex, polyTex, signed } from './helpers';

describe('generator helpers', () => {
  it('format numbers and polynomials', () => {
    expect(fmt(2.5)).toBe('2.5');
    expect(fmt(3)).toBe('3');
    expect(fmt(-0.001)).toBe('0');
    expect(fracTex(6, 8)).toBe('\\frac{3}{4}');
    expect(fracTex(-4, 2)).toBe('-2');
    expect(signed(-3)).toBe('- 3');
    expect(coef(-1)).toBe('-');
    expect(polyTex([1, -3, 0, 2])).toBe('x^{3} - 3x^{2} + 2');
    expect(polyTex([-1, 1, 0])).toBe('-x^{2} + x');
  });
});
