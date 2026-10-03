import { Link } from 'react-router-dom';
import { ChevronLeft, GraduationCap } from 'lucide-react';
import { chapters, isInScope, lessonsOfChapter } from '@/data/lessons';
import { Badge, Notice, PageHeader, ProgressRing } from '../components/ui';
import { hasLearnedFilter } from '../lib/learned';
import { combinedProgress } from '../lib/lessonProgress';
import { useStore } from '../state/store';

export function LearnHub() {
  const { state } = useStore();
  const anyLearned = hasLearnedFilter(state);
  return (
    <>
      <PageHeader
        title="שיעורים"
        description="כל תתי-הנושאים של ספר הלימוד, לפי הסדר. בכל שיעור יש הסבר קצר, נקודות מפתח ותרגילים ממוקדים עם פתרון מוסתר."
      />
      {!anyLearned && (
        <div className="mb-5">
          <Notice tone="primary" icon={<GraduationCap size={18} />}>
            סמנו בכל פרק אילו שיעורים כבר למדתם בכיתה. כך התרגיל היומי, ההמלצות והמתכנן יציעו רק חומר שאתם כבר מכירים.
          </Notice>
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {chapters.map((chapter) => {
          const list = lessonsOfChapter(chapter.id);
          const inScope = list.filter((lesson) => isInScope(lesson.status));
          const progress = combinedProgress(inScope, state);
          const learned = inScope.filter((lesson) => state.learnedLessons[lesson.id]).length;
          const exercises = inScope.reduce((sum, lesson) => sum + lesson.exercises.length, 0);
          return (
            <Link key={chapter.id} to={`/learn/${chapter.id}`} className="card card-hover flex flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-1.5">
                    {chapter.slots.map((slot) => (
                      <Badge key={slot} tone="primary" size="sm">
                        שאלה {slot}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mt-2 text-xl font-bold leading-snug">{chapter.title}</h2>
                  <p className="mt-1 text-sm text-muted">{chapter.description}</p>
                </div>
                <ProgressRing percent={progress.percent} size={84} stroke={9} label={`${progress.percent}% מהתרגילים נפתרו נכון`} />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span>
                  <b className="text-text">{inScope.length}</b> שיעורים בבגרות
                  {list.length > inScope.length ? ` · ${list.length - inScope.length} שירדו` : ''}
                </span>
                <span>
                  <b className="text-text">{exercises}</b> תרגילים
                </span>
                <span>
                  למדתי <b className="text-text">{learned}</b>/{inScope.length}
                </span>
                <ChevronLeft size={18} className="ms-auto text-primary" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
