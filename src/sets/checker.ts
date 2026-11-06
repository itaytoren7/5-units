import type { Check } from '@/data/sets/types';
import { parseAnswer } from '../lib/answerCheck';

export type Verdict = 'correct' | 'wrong' | 'invalid' | 'empty';

/** Default tolerance: relative 1e-3 (with a tiny floor so an answer of 0 is checkable). */
export function tolerance(answer: number, tol?: number): number {
  return tol ?? Math.max(Math.abs(answer) * 1e-3, 1e-6);
}

export function checkNumeric(raw: string, check: Extract<Check, { kind: 'numeric' }>): Verdict {
  if (!raw.trim()) return 'empty';
  const value = parseAnswer(raw);
  if (value === null) return 'invalid';
  return Math.abs(value - check.answer) <= tolerance(check.answer, check.tol) ? 'correct' : 'wrong';
}

export function checkChoice(index: number | null, check: Extract<Check, { kind: 'choice' }>): Verdict {
  if (index === null) return 'empty';
  return index === check.correct ? 'correct' : 'wrong';
}
