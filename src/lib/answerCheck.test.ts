import { describe, expect, it } from 'vitest';
import { checkAnswer, parseAnswer } from './answerCheck';

describe('parseAnswer', () => {
  it('understands the ways students type numbers', () => {
    expect(parseAnswer('3.5')).toBe(3.5);
    expect(parseAnswer('3,5')).toBe(3.5);
    expect(parseAnswer('7/2')).toBe(3.5);
    expect(parseAnswer('−2')).toBe(-2);
    expect(parseAnswer('√3/2')).toBeCloseTo(Math.sqrt(3) / 2, 12);
    expect(parseAnswer('2√3')).toBeCloseTo(2 * Math.sqrt(3), 12);
    expect(parseAnswer('sqrt(2)')).toBeCloseTo(Math.SQRT2, 12);
    expect(parseAnswer('π/6')).toBeCloseTo(Math.PI / 6, 12);
    expect(parseAnswer('2pi')).toBeCloseTo(2 * Math.PI, 12);
    expect(parseAnswer('45°')).toBe(45);
    expect(parseAnswer('12%')).toBe(12);
    expect(parseAnswer('2^10')).toBe(1024);
  });

  it('rejects garbage', () => {
    expect(parseAnswer('')).toBeNull();
    expect(parseAnswer('abc')).toBeNull();
    expect(parseAnswer('x=3')).toBeNull();
    expect(parseAnswer('1/0')).toBeNull();
    expect(parseAnswer('sqrt(-1)')).toBeNull();
  });
});

describe('checkAnswer', () => {
  it('accepts correctly rounded answers and rejects wrong ones', () => {
    expect(checkAnswer('0.26', 0.2646)).toBe('correct');
    expect(checkAnswer('0.25', 0.2646)).toBe('wrong');
    expect(checkAnswer('7.81', Math.sqrt(61))).toBe('correct');
    expect(checkAnswer('√61', Math.sqrt(61))).toBe('correct');
    expect(checkAnswer('1500', 1503)).toBe('correct');
    expect(checkAnswer('1490', 1503)).toBe('wrong');
    expect(checkAnswer('0.2646', 0.26460, 0.0001)).toBe('correct');
    expect(checkAnswer('0.26', 0.2646, 0.0001)).toBe('wrong');
    expect(checkAnswer('', 1)).toBe('empty');
    expect(checkAnswer('???', 1)).toBe('invalid');
  });
});
