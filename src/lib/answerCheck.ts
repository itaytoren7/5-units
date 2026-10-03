import { evaluate } from 'mathjs';

/**
 * Turns what a student types into a number: "3.5", "7/2", "2√3", "sqrt(3)/2", "π/6", "3,5", "-1.2e3".
 * Returns null when the text is empty or not a real number.
 */
export function parseAnswer(raw: string): number | null {
  let text = raw.trim();
  if (!text) return null;
  text = text
    .replace(/[‎‏‪-‮]/g, '')
    .replace(/−|–/g, '-')
    .replace(/×|·/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/°/g, '')
    .replace(/%$/, '')
    .replace(/√\s*\(/g, 'sqrt(')
    .replace(/√\s*([0-9.]+)/g, 'sqrt($1)')
    .replace(/(\d),(\d)/g, '$1.$2');
  // implicit multiplication like 2sqrt(3) / 3pi is handled by mathjs; guard against assignments and other syntax
  if (/[=;{}\[\]]/.test(text)) return null;
  try {
    const value: unknown = evaluate(text);
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/** Default tolerance: accepts an answer rounded to two decimals, or within 0.5% for large values. */
export function defaultTolerance(expected: number): number {
  return Math.max(0.006, Math.abs(expected) * 0.005);
}

export type CheckOutcome = 'correct' | 'wrong' | 'invalid' | 'empty';

export function checkAnswer(raw: string, expected: number, tolerance?: number): CheckOutcome {
  if (!raw.trim()) return 'empty';
  const value = parseAnswer(raw);
  if (value === null) return 'invalid';
  return Math.abs(value - expected) <= (tolerance ?? defaultTolerance(expected)) ? 'correct' : 'wrong';
}
