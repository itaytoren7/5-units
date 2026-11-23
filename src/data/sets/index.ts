import { setsCatalog } from './catalog';
import { registeredSets } from './registry';
import type { ExerciseSet } from './types';

const order = new Map(setsCatalog.map((entry, index) => [entry.id, index]));

/** Every written set, in catalogue (study) order. Set files register themselves, see ./registry. */
export const sets: ExerciseSet[] = [...registeredSets].sort((a, b) => (order.get(a.id) ?? Infinity) - (order.get(b.id) ?? Infinity));

export function setById(id: string | undefined): ExerciseSet | undefined {
  return id ? sets.find((set) => set.id === id) : undefined;
}

export { setsCatalog, nextPlanned } from './catalog';
export type { Check, DiagramSpec, Exercise, ExerciseSet, Section } from './types';
