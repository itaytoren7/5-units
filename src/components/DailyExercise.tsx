import { Link } from 'react-router-dom';
import { CalendarCheck, CheckCircle2, ChevronLeft, GraduationCap } from 'lucide-react';
import { isInScope, lessonPath, lessons, type Lesson, type LessonExercise } from '@/data/lessons';
import { hasLearnedFilter } from '../lib/learned';
import { exerciseResult } from '../lib/lessonProgress';
import { useStore } from '../state/store';
import type { SavedState } from '../state/types';
import { Markdown } from './Markdown';
import { DifficultyBadge } from './ProblemCard';
import { Button, Card, EmptyState, SectionTitle } from './ui';

function hash(text: string): number {
  let value = 2166136261;
  for (let index = 0; index < text.length; index += 1) value = Math.imul(value ^ text.charCodeAt(index), 16777619);
  return value >>> 0;
}

/**
 * The exercise of the day: from lessons learned in class (all in-scope lessons when none are marked),
 * open mistakes first, then exercises never tried — the same pick all day.
 */
export function pickDailyExercise(state: Pick<SavedState, 'learnedLessons' | 'practice'>, today: string, pool: Lesson[] = lessons): { lesson: Lesson; exercise: LessonExercise } | null {
  const filter = hasLearnedFilter(state);
  const candidates = pool.filter((lesson) => isInScope(lesson.status) && lesson.exercises.length > 0 && (!filter || state.learnedLessons[lesson.id]));
  const all = candidates.flatMap((lesson) => lesson.exercises.map((exercise) => ({ lesson, exercise })));
  if (all.length === 0) return null;
  const wrong = all.filter(({ exercise }) => exerciseResult(state, exercise.id) === 'wrong');
  const fresh = all.filter(({ exercise }) => !exerciseResult(state, exercise.id) && exercise.difficulty >= 2);
  const untried = all.filter(({ exercise }) => !exerciseResult(state, exercise.id));
  const notCorrect = all.filter(({ exercise }) => exerciseResult(state, exercise.id) !== 'correct');
  const bucket = [wrong, fresh, untried, notCorrect, all].find((list) => list.length > 0)!;
  return bucket[hash(today) % bucket.length];
}

export function DailyExercise({ today, hour }: { today: string; hour: number }) {
  const { state } = useStore();
  const anyLearned = hasLearnedFilter(state);
  const pick = pickDailyExercise(state, today);
  if (!pick) {
    return (
      <Card>
        <SectionTitle icon={<CalendarCheck size={18} />} title="התרגיל היומי" />
        <EmptyState icon={<GraduationCap size={22} />} title="עוד אין תרגילים בשיעורים שסימנתם" description="סמנו עוד שיעורים שלמדתם, או התחילו מהשיעורים עצמם." action={<Button to="/learn">לשיעורים</Button>} />
      </Card>
    );
  }
  const { lesson, exercise } = pick;
  const record = state.practice[exercise.id];
  const result = exerciseResult(state, exercise.id);
  const doneToday = result === 'correct' && record?.lastPracticedAt.slice(0, 10) === today;
  return (
    <Card className="daily-card">
      <SectionTitle
        icon={<CalendarCheck size={18} />}
        title="התרגיל היומי"
        description={anyLearned ? 'מתוך השיעורים שסימנתם שלמדתם בכיתה' : 'מכל החומר שבבגרות. סמנו מה למדתם כדי לצמצם.'}
        actions={doneToday ? <span className="inline-flex items-center gap-1 text-sm font-bold text-green"><CheckCircle2 size={16} /> בוצע</span> : undefined}
      />
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link to={lessonPath(lesson)} className="font-semibold text-primary hover:underline">
          {lesson.title}
        </Link>
        <DifficultyBadge difficulty={exercise.difficulty} />
        {result === 'wrong' && <span className="font-semibold text-red">טעיתם בו בעבר. היום סוגרים את זה.</span>}
      </div>
      <div className="prose line-clamp-4">
        <Markdown className="text-base leading-relaxed">{exercise.statement}</Markdown>
      </div>
      {!doneToday && hour >= 20 && <p className="mt-3 text-sm font-bold text-red">השעה {hour}:00, והתרגיל היומי עוד מחכה. 15 דקות וזה מאחוריכם.</p>}
      <div className="mt-4">
        <Button variant={doneToday ? 'secondary' : 'primary'} to={`${lessonPath(lesson)}#ex-${exercise.id}`}>
          {doneToday ? 'לראות שוב' : 'לפתור עכשיו'} <ChevronLeft size={16} />
        </Button>
      </div>
    </Card>
  );
}
