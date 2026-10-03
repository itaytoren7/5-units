import { analyticGenerators } from './analytic';
import { calculusGenerators } from './calculus';
import { geometryGenerators } from './geometry';
import { probabilityGenerators } from './probability';
import { sequencesGenerators } from './sequences';
import { trigonometryGenerators } from './trigonometry';
import type { ExerciseGenerator } from './types';
import { wordProblemsGenerators } from './word-problems';

/** All "infinite practice" generators. Each chapter file exports an array; they are merged here. */
export const generators: ExerciseGenerator[] = [
  ...geometryGenerators,
  ...analyticGenerators,
  ...trigonometryGenerators,
  ...calculusGenerators,
  ...sequencesGenerators,
  ...probabilityGenerators,
  ...wordProblemsGenerators,
];

export function generatorsForLesson(lessonId: string): ExerciseGenerator[] {
  return generators.filter((generator) => generator.lessonIds.includes(lessonId));
}

export function generatorById(id: string): ExerciseGenerator | undefined {
  return generators.find((generator) => generator.id === id);
}

export { createRng, randomSeed } from './rng';
export type { ExerciseGenerator, GeneratedExercise, Rng } from './types';
