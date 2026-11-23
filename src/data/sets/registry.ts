import type { ExerciseSet } from './types';

/**
 * Every set file in this folder registers itself: a new set is one file that exports an
 * `ExerciseSet` (any export name). Nothing else has to be edited.
 */
const modules = import.meta.glob<Record<string, unknown>>(['./*.ts', '!./index.ts', '!./registry.ts', '!./catalog.ts', '!./types.ts', '!./*.test.ts'], { eager: true });

function isExerciseSet(value: unknown): value is ExerciseSet {
  return typeof value === 'object' && value !== null && typeof (value as ExerciseSet).id === 'string' && Array.isArray((value as ExerciseSet).exercises);
}

export const registeredSets: ExerciseSet[] = Object.values(modules).flatMap((module) => Object.values(module).filter(isExerciseSet));
