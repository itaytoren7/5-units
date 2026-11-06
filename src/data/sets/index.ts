import type { ExerciseSet } from './types';
import { trigRightTriangle } from './trig-right-triangle';

export const sets: ExerciseSet[] = [trigRightTriangle];

export function setById(id: string | undefined): ExerciseSet | undefined {
  return id ? sets.find((set) => set.id === id) : undefined;
}

export { setsCatalog, nextPlanned } from './catalog';
export type { Check, DiagramSpec, Exercise, ExerciseSet, Section } from './types';
