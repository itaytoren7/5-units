import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpen, ExternalLink, Infinity as InfinityIcon, Lightbulb, ListChecks, PencilLine } from 'lucide-react';
import { generatorsForLesson } from '@/data/generators';
import { chapterById, isInScope, lessonById, lessonsOfChapter, type LessonExercise } from '@/data/lessons';
import { ExerciseCard, resultLabels, resultTone } from '../components/ExerciseCard';
import { GeneratorPractice } from '../components/GeneratorPractice';
import { Markdown } from '../components/Markdown';
import { DifficultyBadge } from '../components/ProblemCard';
import { LessonStatusBadge } from '../components/StatusBadge';
import { Badge, Button, Card, EmptyState, Notice, PageHeader, SectionTitle, Segmented, Switch } from '../components/ui';
import { exerciseResult, lessonProgress } from '../lib/lessonProgress';
import { questionnaireByCode } from '../lib/questionnaires';
import { useStore } from '../state/store';
import { NotFound } from './NotFound';

type Filter = 'all' | 'todo' | 'wrong';

function Attribution({ exercise }: { exercise: LessonExercise }) {
  if (!exercise.source) return null;
  const { source } = exercise;
  return (
    <span>
      {source.adapted ? 'תורגם ועובד מתוך ' : 'מתוך '}
      <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold underline">
        {source.work}
      </a>
      , {source.section}. רישיון{' '}
      <a href={source.licenseUrl} target="_blank" rel="noreferrer" className="underline">
        {source.license}
      </a>
      . הרמזים והפתרון נכתבו לאתר.
    </span>
  );
}

export function LessonPage() {
  const { chapterId, lessonId } = useParams();
  const { hash } = useLocation();
  const { state, actions } = useStore();
  const [filter, setFilter] = useState<Filter>('all');
  const lesson = lessonById(lessonId);
  const chapter = chapterById(chapterId);
  const generators = useMemo(() => (lesson ? generatorsForLesson(lesson.id) : []), [lesson]);

  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => window.clearTimeout(timer);
  }, [hash, lessonId]);

  useEffect(() => setFilter('all'), [lessonId]);

  if (!lesson || !chapter || lesson.chapterId !== chapter.id) return <NotFound />;

  const questionnaire = questionnaireByCode(lesson.questionnaire)!;
  const siblings = lessonsOfChapter(chapter.id);
  const position = siblings.findIndex((entry) => entry.id === lesson.id);
  const previous = siblings[position - 1];
  const next = siblings[position + 1];
  const scope = isInScope(lesson.status);
  const progress = lessonProgress(lesson, state);
  const learned = Boolean(state.learnedLessons[lesson.id]);
  const authoredCount = lesson.exercises.filter((exercise) => !exercise.source).length;
  const shown = lesson.exercises.filter((exercise) => {
    const result = exerciseResult(state, exercise.id);
    if (filter === 'todo') return result !== 'correct';
    if (filter === 'wrong') return result === 'wrong' || result === 'partial';
    return true;
  });

  const exerciseNav = (
    <nav className="flex flex-wrap gap-2" aria-label="מעבר בין תרגילים">
      {lesson.exercises.map((exercise, index) => {
        const result = exerciseResult(state, exercise.id);
        return (
          <a key={exercise.id} href={`#ex-${exercise.id}`} className={`chip ${result ? `chip-${resultTone[result]}` : ''}`} title={result ? resultLabels[result] : 'עוד לא תורגל'}>
            {exercise.source ? `פ${index + 1 - authoredCount}` : index + 1}
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-1.5">
            <Link to="/learn" className="hover:underline">
              שיעורים
            </Link>
            ·
            <Link to={`/learn/${chapter.id}`} className="hover:underline">
              {chapter.title}
            </Link>
            · שיעור {lesson.order} מתוך {siblings.length}
          </span>
        }
        title={lesson.title}
        actions={
          scope ? (
            <label className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3 text-base">
              <span className={learned ? 'font-semibold text-primary' : ''}>למדתי בכיתה</span>
              <Switch checked={learned} onChange={(value) => actions.setLessonsLearned([lesson.id], value)} label="למדתי את השיעור בכיתה" />
            </label>
          ) : undefined
        }
      >
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <LessonStatusBadge status={lesson.status} />
          {lesson.slots.map((slot) => (
            <Badge key={slot} tone="primary">
              שאלון {questionnaire.nickname} · שאלה {slot}
            </Badge>
          ))}
          {scope && (
            <Badge>
              {progress.correct}/{progress.total} נכונים
            </Badge>
          )}
        </div>
      </PageHeader>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
        <div className="flex min-w-0 flex-col gap-5">
          {lesson.statusNote && (
            <Notice tone={lesson.status === 'in' ? 'primary' : lesson.status === 'partial' ? 'blue' : 'red'} icon={<AlertTriangle size={18} />}>
              <Markdown inline>{lesson.statusNote}</Markdown>
            </Notice>
          )}

          {scope ? (
            <>
              <Card>
                <SectionTitle icon={<Lightbulb size={18} />} title="הרעיון" />
                {lesson.intro ? <Markdown className="prose text-base leading-relaxed">{lesson.intro}</Markdown> : <p className="text-muted">ההסבר לשיעור הזה עדיין בהכנה.</p>}
                {lesson.keyFacts.length > 0 && (
                  <>
                    <h3 className="mb-3 mt-5 text-base font-bold">נקודות מפתח</h3>
                    <ul className="prose flex flex-col gap-2.5">
                      {lesson.keyFacts.map((fact, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          <Markdown inline className="min-w-0 text-base leading-relaxed">
                            {fact}
                          </Markdown>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button size="sm" variant="ghost" to={`/topic/${lesson.questionnaire}/${lesson.topicId}`} icon={<BookOpen size={15} />}>
                    לסיכום הנושא
                  </Button>
                  {lesson.slots.map((slot) => (
                    <Button key={slot} size="sm" variant="ghost" to={`/practice?code=${lesson.questionnaire}&slot=${slot}`} icon={<PencilLine size={15} />}>
                      שאלות בגרות (שאלה {slot})
                    </Button>
                  ))}
                </div>
              </Card>

              <div>
                <SectionTitle
                  icon={<ListChecks size={18} />}
                  title="תרגילים ממוקדים"
                  description={lesson.exercises.length ? `${lesson.exercises.length} תרגילים, מהקל לקשה. נסו לבד לפני רמז, ורמז לפני פתרון.` : undefined}
                  actions={
                    lesson.exercises.length > 0 ? (
                      <Segmented
                        label="סינון"
                        value={filter}
                        onChange={setFilter}
                        options={[
                          { value: 'all', label: 'הכול' },
                          { value: 'todo', label: 'לא נפתרו' },
                          { value: 'wrong', label: 'טעיתי' },
                        ]}
                      />
                    ) : undefined
                  }
                />
                <div className="mb-4 lg:hidden">{exerciseNav}</div>
                {lesson.exercises.length === 0 ? (
                  <Card>
                    <EmptyState icon={<ListChecks size={22} />} title="התרגילים לשיעור הזה בהכנה" description="בינתיים אפשר לתרגל את שאלות הבגרות של הנושא." />
                  </Card>
                ) : shown.length === 0 ? (
                  <Card>
                    <EmptyState icon={<ListChecks size={22} />} title={filter === 'wrong' ? 'אין טעויות פתוחות בשיעור הזה' : 'פתרתם נכון את כל התרגילים'} description={filter === 'wrong' ? 'יפה. אם משהו עדיין לא יושב, תעברו לתרגול האינסופי.' : 'עכשיו תוכיחו שזה לא היה מזל: תרגול אינסופי או השיעור הבא.'} />
                  </Card>
                ) : (
                  <div className="flex flex-col gap-5">
                    {shown.map((exercise) => {
                      const index = lesson.exercises.indexOf(exercise);
                      return (
                        <ExerciseCard
                          key={exercise.id}
                          id={exercise.id}
                          heading={exercise.source ? `תרגיל ממקור פתוח ${index + 1 - authoredCount}` : `תרגיל ${index + 1}`}
                          badges={<DifficultyBadge difficulty={exercise.difficulty} />}
                          statement={exercise.statement}
                          figureSvg={exercise.figureSvg}
                          hints={exercise.hints}
                          solutionSteps={exercise.solutionSteps}
                          finalAnswer={exercise.finalAnswer}
                          answers={exercise.answers}
                          questionnaire={lesson.questionnaire}
                          topicId={lesson.topicId}
                          result={exerciseResult(state, exercise.id)}
                          onResult={(value) => actions.recordSectionResult(exercise.id, exercise.id, value, lesson.questionnaire)}
                          footer={exercise.source ? <Attribution exercise={exercise} /> : undefined}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {generators.length > 0 && (
                <div id="infinite" className="scroll-mt-24">
                  <SectionTitle icon={<InfinityIcon size={18} />} title="תרגול אינסופי" description="מספרים חדשים בכל פעם, בדיקה אוטומטית. ממשיכים עד שזה יושב." />
                  <GeneratorPractice lessonId={lesson.id} questionnaire={lesson.questionnaire} topicId={lesson.topicId} />
                </div>
              )}
            </>
          ) : (
            <Card>
              <EmptyState icon={<AlertTriangle size={22} />} title="לא בבגרות 2026" description="השיעור מוצג כדי שתדעו שהוא קיים בספר. אין בו תרגילים, כי הוא לא ייבחן בקיץ 2026. אם יחזור במיקוד של שנה הבאה, נוסיף תרגילים." />
            </Card>
          )}

          <nav className="mt-2 grid grid-cols-2 gap-2" aria-label="מעבר בין שיעורים">
            {previous ? (
              <Button size="lg" to={`/learn/${chapter.id}/${previous.id}`} icon={<ArrowRight size={18} />} className="min-w-0 max-w-full justify-self-start" title={previous.title}>
                <span className="min-w-0 truncate">{previous.title}</span>
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button size="lg" variant="primary" to={`/learn/${chapter.id}/${next.id}`} className="min-w-0 max-w-full justify-self-end" title={next.title}>
                <span className="min-w-0 truncate">{next.title}</span> <ArrowLeft size={18} className="shrink-0" />
              </Button>
            ) : (
              <Button size="lg" variant="primary" to={`/learn/${chapter.id}`} className="justify-self-end">
                סוף הפרק <ArrowLeft size={18} />
              </Button>
            )}
          </nav>
        </div>

        <aside className="no-print hidden lg:block">
          {scope && lesson.exercises.length > 0 && (
            <div className="toc gap-4">
              <div>
                <div className="mb-2 px-1 text-sm font-semibold text-muted">תרגילים</div>
                {exerciseNav}
              </div>
              {generators.length > 0 && (
                <a href="#infinite" className="rounded-2xl bg-surface-2 p-4 text-sm font-semibold text-primary">
                  <InfinityIcon size={16} className="me-1 inline" aria-hidden="true" />
                  תרגול אינסופי
                </a>
              )}
              {lesson.exercises.some((exercise) => exercise.source) && (
                <div className="rounded-2xl bg-surface-2 p-4 text-xs text-muted">
                  <ExternalLink size={13} className="me-1 inline" aria-hidden="true" />
                  תרגילים שמסומנים ״פ״ תורגמו ממקורות פתוחים.
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
