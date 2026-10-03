import type { NumericAnswer } from '../lessons/types';

/** Seeded random source, so the same seed always rebuilds the same exercise. */
export interface Rng {
  /** Uniform in [0, 1). */
  next(): number;
  /** Integer in [min, max], both inclusive. */
  int(min: number, max: number): number;
  pick<T>(items: readonly T[]): T;
  /** +1 or −1 */
  sign(): 1 | -1;
}

/** One freshly generated exercise. Text is Markdown + KaTeX, like the authored exercises. */
export interface GeneratedExercise {
  statement: string;
  hints: string[];
  solutionSteps: string[];
  finalAnswer: string;
  /** At least one numeric answer — generated exercises are always auto-checked. */
  answers: NumericAnswer[];
  figureSvg?: string;
  /** The random parameters that were drawn (used by the tests to recompute the answers independently). */
  data: Record<string, number>;
}

/** "תרגול אינסופי": a template that produces a new exercise with new numbers on every call. */
export interface ExerciseGenerator {
  /** Stable id, e.g. 'gen-sine-law-side'. */
  id: string;
  /** Lessons whose page shows this generator. */
  lessonIds: string[];
  /** Short Hebrew title, e.g. 'צלע לפי משפט הסינוסים'. */
  title: string;
  difficulty: 1 | 2 | 3;
  generate(rng: Rng): GeneratedExercise;
}
