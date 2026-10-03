import { chapters, isInScope, lessonCatalog, lessonIdOfExercise, lessonMetaById, lessonPath } from './catalog';
import { analyticContent } from './content/analytic';
import { calculusAContent } from './content/calculus-a';
import { calculusBContent } from './content/calculus-b';
import { geometryAContent } from './content/geometry-a';
import { geometryBContent } from './content/geometry-b';
import { probabilityContent } from './content/probability';
import { sequencesContent } from './content/sequences';
import { trigonometryContent } from './content/trigonometry';
import { wordProblemsContent } from './content/word-problems';
import { openstaxCalculusExercises } from './oss/openstax-calculus';
import { openstaxPrecalcExercises } from './oss/openstax-precalc';
import type { Chapter, ChapterId, Lesson, LessonContent, LessonExercise } from './types';

export const lessonContent: Record<string, LessonContent> = {
  ...geometryAContent,
  ...geometryBContent,
  ...analyticContent,
  ...trigonometryContent,
  ...calculusAContent,
  ...calculusBContent,
  ...sequencesContent,
  ...probabilityContent,
  ...wordProblemsContent,
};

const openSourceSets: Array<Record<string, LessonExercise[]>> = [openstaxPrecalcExercises, openstaxCalculusExercises];

function openSourceFor(lessonId: string): LessonExercise[] {
  return openSourceSets.flatMap((set) => set[lessonId] ?? []);
}

const orderInChapter = new Map<string, number>();
for (const chapter of chapters) {
  lessonCatalog.filter((meta) => meta.chapterId === chapter.id).forEach((meta, index) => orderInChapter.set(meta.id, index + 1));
}

export const lessons: Lesson[] = lessonCatalog.map((meta) => {
  const content = lessonContent[meta.id];
  const exercises = isInScope(meta.status) ? [...(content?.exercises ?? []), ...openSourceFor(meta.id)] : [];
  return {
    ...meta,
    order: orderInChapter.get(meta.id) ?? 0,
    intro: content?.intro ?? '',
    keyFacts: content?.keyFacts ?? [],
    exercises,
  };
});

const lessonsById = new Map(lessons.map((entry) => [entry.id, entry]));
const exerciseIndex = new Map<string, { lesson: Lesson; exercise: LessonExercise; index: number }>();
for (const entry of lessons) entry.exercises.forEach((exercise, index) => exerciseIndex.set(exercise.id, { lesson: entry, exercise, index }));

export function chapterById(id: string | undefined): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function lessonsOfChapter(id: ChapterId): Lesson[] {
  return lessons.filter((entry) => entry.chapterId === id);
}

export function lessonById(id: string | undefined): Lesson | undefined {
  return id ? lessonsById.get(id) : undefined;
}

export function exerciseById(id: string): { lesson: Lesson; exercise: LessonExercise; index: number } | undefined {
  return exerciseIndex.get(id);
}

export function chaptersForTopic(topicId: string): Chapter[] {
  return chapters.filter((chapter) => chapter.topicIds.includes(topicId));
}

export { chapters, isInScope, lessonCatalog, lessonIdOfExercise, lessonMetaById, lessonPath };
export type { Chapter, ChapterId, Lesson, LessonContent, LessonExercise, LessonStatus, NumericAnswer } from './types';
