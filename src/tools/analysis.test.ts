import { describe, expect, it } from 'vitest';
import { analyze, compileFunction } from './analysis';

describe('function explorer analysis', () => {
  it('finds extrema and inflection of a cubic', () => {
    const result = analyze(compileFunction('x^3-6x^2+9x+2'), -2, 6);
    const max = result.points.find((point) => point.kind === 'max');
    const min = result.points.find((point) => point.kind === 'min');
    const inflection = result.points.find((point) => point.kind === 'inflection');
    expect(max?.x).toBeCloseTo(1, 4);
    expect(min?.x).toBeCloseTo(3, 4);
    expect(inflection?.x).toBeCloseTo(2, 4);
  });
  it('finds asymptotes of a rational function', () => {
    const result = analyze(compileFunction('x^2/(x^2-4)'), -6, 6);
    expect(result.vertical.map((x) => Math.round(x))).toEqual(expect.arrayContaining([-2, 2]));
    expect(result.horizontal).toContain(1);
  });
  it('understands ln and e', () => {
    const fn = compileFunction('x*ln(x)');
    const min = analyze(fn, 0.01, 3).points.find((point) => point.kind === 'min');
    expect(min?.x).toBeCloseTo(Math.exp(-1), 4);
  });
});
