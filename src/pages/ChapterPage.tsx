import { Link, useParams } from 'react-router-dom';
import { BookOpen, CheckCheck, ChevronLeft, PencilLine } from 'lucide-react';
import { chapterById, isInScope, lessonsOfChapter } from '@/data/lessons';
import { LessonStatusBadge } from '../components/StatusBadge';
import { Badge, Button, PageHeader, ProgressBar, ProgressRing, Switch } from '../components/ui';
import { combinedProgress, lessonProgress } from '../lib/lessonProgress';
import { questionnaireByCode, topicOf } from '../lib/questionnaires';
import { useStore } from '../state/store';
import { NotFound } from './NotFound';

export function ChapterPage() {
  const { chapterId } = useParams();
  const { state, actions, notify } = useStore();
  const chapter = chapterById(chapterId);
  if (!chapter) return <NotFound />;
  const questionnaire = questionnaireByCode(chapter.questionnaire)!;
  const list = lessonsOfChapter(chapter.id);
  const inScope = list.filter((lesson) => isInScope(lesson.status));
  const progress = combinedProgress(inScope, state);
  const allLearned = inScope.length > 0 && inScope.every((lesson) => state.learnedLessons[lesson.id]);

  return (
    <>
      <PageHeader
        eyebrow={
          <Link to="/learn" className="hover:underline">
            שיעורים
          </Link>
        }
        title={chapter.title}
        description={chapter.description}
        actions={
          <div className="flex items-center gap-3">
            <ProgressRing percent={progress.percent} size={72} stroke={8} label={`${progress.percent}% מהתרגילים נפתרו נכון`} />
            <div className="text-sm">
              <b className="block">
                {progress.correct}/{progress.total} נכונים
              </b>
              <span className="text-muted">{progress.wrong ? `${progress.wrong} טעויות פתוחות` : 'בלי טעויות פתוחות'}</span>
            </div>
          </div>
        }
      >
        <div className="mt-4 flex flex-wrap gap-2">
          {chapter.topicIds.map((topicId) => {
            const topic = topicOf(questionnaire, topicId);
            return topic ? (
              <Button key={topicId} size="sm" to={`/topic/${questionnaire.code}/${topicId}`} icon={<BookOpen size={15} />}>
                סיכום: {topic.title}
              </Button>
            ) : null;
          })}
          {chapter.slots.map((slot) => (
            <Button key={slot} size="sm" to={`/practice?code=${questionnaire.code}&slot=${slot}`} icon={<PencilLine size={15} />}>
              שאלות בגרות: שאלה {slot}
            </Button>
          ))}
          <Button
            size="sm"
            variant={allLearned ? 'ghost' : 'soft'}
            icon={<CheckCheck size={15} />}
            onClick={() => {
              actions.setLessonsLearned(
                inScope.map((lesson) => lesson.id),
                !allLearned,
              );
              notify(allLearned ? 'הסימון בוטל לכל הפרק' : 'כל הפרק סומן כנלמד');
            }}
          >
            {allLearned ? 'ביטול "למדתי" לכל הפרק' : 'למדתי את כל הפרק'}
          </Button>
        </div>
      </PageHeader>

      <ol className="lesson-path">
        {list.map((lesson) => {
          const scope = isInScope(lesson.status);
          const lessonState = lessonProgress(lesson, state);
          const learned = Boolean(state.learnedLessons[lesson.id]);
          return (
            <li key={lesson.id} className={`lesson-step ${scope ? '' : 'lesson-step-out'}`}>
              <span className={`lesson-num ${lessonState.total && lessonState.correct === lessonState.total ? 'lesson-num-done' : ''}`} aria-hidden="true">
                {lesson.order}
              </span>
              <div className="card flex min-w-0 flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <Link to={`/learn/${chapter.id}/${lesson.id}`} className="min-w-0 flex-1 hover:text-primary">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <b className="text-base">{lesson.title}</b>
                    {lesson.status !== 'in' && <LessonStatusBadge status={lesson.status} size="sm" />}
                    {lesson.kind === 'review' && (
                      <Badge size="sm" tone="neutral">
                        מסכם
                      </Badge>
                    )}
                    {lesson.questionnaire !== chapter.questionnaire && (
                      <Badge size="sm" tone="neutral">
                        שאלון {questionnaireByCode(lesson.questionnaire)?.nickname}
                      </Badge>
                    )}
                  </div>
                  {scope ? (
                    <div className="mt-2 flex items-center gap-3 text-sm text-muted">
                      <ProgressBar percent={lessonState.percent} size="sm" className="max-w-[12rem] flex-1" label={`${lessonState.correct} מתוך ${lessonState.total} נכונים`} />
                      <span className="tabular-nums">
                        {lessonState.correct}/{lessonState.total}
                      </span>
                      {lessonState.wrong > 0 && <span className="text-red">{lessonState.wrong} טעויות</span>}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-muted">מוצג לידיעה, בלי תרגילים.</p>
                  )}
                </Link>
                {scope && (
                  <label className="flex shrink-0 items-center gap-2 text-sm">
                    <span className={learned ? 'font-semibold text-primary' : 'text-muted'}>למדתי בכיתה</span>
                    <Switch checked={learned} onChange={(next) => actions.setLessonsLearned([lesson.id], next)} label={`למדתי בכיתה: ${lesson.title}`} />
                  </label>
                )}
                <Link to={`/learn/${chapter.id}/${lesson.id}`} className="hidden text-primary sm:block" aria-hidden="true" tabIndex={-1}>
                  <ChevronLeft size={20} />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
