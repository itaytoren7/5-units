import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, BookOpen, CalendarDays, Check, ChevronLeft, PencilLine, Repeat, Sparkles, Timer, TrendingUp } from 'lucide-react';
import type { Questionnaire } from '@/data/syllabus/types';
import { problems } from '@/data/problems';
import { Badge, Button, Card, Notice, ProgressBar, ProgressRing, SectionTitle } from '../components/ui';
import { PriorityBadge } from '../components/StatusBadge';
import { daysUntil, formatDate, formatShortDate, todayIso } from '../lib/dates';
import { formatDuration, formatPoints, formatScore } from '../lib/format';
import { buildPlan } from '../lib/planner';
import { progressOf, ratingOf, slotProgress } from '../lib/progress';
import { questionnaireList } from '../lib/questionnaires';
import { dueReviews, nextExam, reviewTitle } from '../lib/selectors';
import { useStore } from '../state/store';

function ExamCard({ questionnaire }: { questionnaire: Questionnaire }) {
  const { state } = useStore();
  const progress = progressOf(questionnaire, state.ratings);
  const date = state.examDates[questionnaire.code];
  const days = date ? daysUntil(date) : null;
  const yellow = questionnaire.slots.filter((slot) => slot.priority === 'yellow');
  return (
    <Card as="article" className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone={questionnaire.code === '35581' ? 'primary' : 'green'}>שאלון {questionnaire.nickname}</Badge>
          <h3 className="mt-2 text-lg font-extrabold">שאלון {questionnaire.code}</h3>
          <p className="text-sm text-muted">
            {questionnaire.weightPercent}% מהציון · {formatDuration(questionnaire.durationMinutes)} · {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions} שאלות · {formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה
          </p>
        </div>
        <ProgressRing percent={progress.percent} size={64} />
      </div>
      <div className="flex flex-col gap-1.5">
        {yellow.map((slot) => {
          const slotPercent = slotProgress(questionnaire, slot, state.ratings).percent;
          return (
            <div key={slot.number} className="flex items-center gap-2 text-xs">
              <span className="w-14 shrink-0 font-semibold">שאלה {slot.number}</span>
              <ProgressBar percent={slotPercent} tone="yellow" className="flex-1" label={slot.title} />
              <span className="w-9 text-end text-muted">{slotPercent}%</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border pt-3 text-sm">
        {days === null ? (
          <Link to="/settings" className="font-semibold text-primary">
            הגדר תאריך בחינה
          </Link>
        ) : days >= 0 ? (
          <span>
            <b className="text-primary">{days === 0 ? 'היום!' : `עוד ${days} ימים`}</b> <span className="text-muted">· {formatDate(date!)}</span>
          </span>
        ) : (
          <span className="text-muted">מועד הבחינה עבר</span>
        )}
        <div className="flex gap-1">
          <Button size="sm" to={`/syllabus/${questionnaire.code}`} icon={<BookOpen size={14} />}>
            סילבוס
          </Button>
          <Button size="sm" to={`/simulator/${questionnaire.code}`} icon={<Timer size={14} />}>
            סימולציה
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function Dashboard() {
  const { state, actions } = useStore();
  const today = todayIso();
  const upcoming = nextExam(state, today);
  const due = dueReviews(state, today);
  const overall = Math.round(questionnaireList.reduce((sum, questionnaire) => sum + progressOf(questionnaire, state.ratings).percent, 0) / questionnaireList.length);

  const plan = useMemo(
    () => buildPlan({ questionnaires: questionnaireList, examDates: state.examDates, ratings: state.ratings, hoursPerWeek: state.planner.hoursPerWeek, studyDays: state.planner.studyDays, sessionMinutes: state.planner.sessionMinutes, today }),
    [state.examDates, state.ratings, state.planner, today],
  );
  const todaySessions = plan.weeks.flatMap((week) => week.sessions).filter((session) => session.date === today && !state.planOverrides[session.id]?.removed);
  const nextSessions = plan.weeks
    .flatMap((week) => week.sessions)
    .filter((session) => session.date > today && !state.planOverrides[session.id]?.removed)
    .slice(0, 3);

  const weakest = questionnaireList
    .flatMap((questionnaire) =>
      questionnaire.topics.flatMap((topic) =>
        topic.subtopics
          .filter((subtopic) => subtopic.status === 'in' && ratingOf(state.ratings, subtopic.id) === 'weak')
          .map((subtopic) => ({ questionnaire, topic, subtopic })),
      ),
    )
    .slice(0, 5);

  const recentExams = state.exams.slice(0, 3);
  const practiced = Object.keys(state.practice).length;

  return (
    <>
      <section className="card relative mb-5 overflow-hidden bg-gradient-to-br from-primary-soft via-surface to-surface p-5 sm:p-7">
        <div className="relative z-10 max-w-xl">
          <div className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-primary">
            <Sparkles size={14} /> מרכז הלמידה שלך לבגרות 5 יח״ל
          </div>
          <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            {upcoming ? (
              <>
                עוד <span className="text-primary">{upcoming.days}</span> ימים לשאלון {questionnaireList.find((questionnaire) => questionnaire.code === upcoming.code)?.nickname ?? upcoming.code}
              </>
            ) : (
              'כל צעד קטן מקרב אותך ל־100'
            )}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {upcoming ? `הבחינה ב-${formatDate(upcoming.date)}. ` : 'הגדירו תאריך בחינה כדי לקבל ספירה לאחור ותוכנית שבועית. '}
            התקדמות כוללת בסילבוס: <b className="text-text">{overall}%</b>
            {practiced > 0 && <> · תרגלת {practiced} תרגילים</>}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="primary" to="/syllabus" icon={<BookOpen size={16} />}>
              למפת הלמידה
            </Button>
            <Button to="/practice" icon={<PencilLine size={16} />}>
              לתרגול
            </Button>
            {!upcoming && (
              <Button to="/settings" icon={<CalendarDays size={16} />}>
                הגדרת תאריך
              </Button>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute -end-10 -top-10 hidden h-48 w-48 rounded-full border border-primary/20 sm:block" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-16 end-16 hidden h-40 w-40 rounded-full border border-primary/10 sm:block" aria-hidden="true" />
      </section>

      {state.activeExam && state.activeExam.phase !== 'setup' && (
        <div className="mb-5">
          <Notice tone="primary" icon={<Timer size={16} />}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>
                יש לך סימולציה פעילה בשאלון {questionnaireList.find((questionnaire) => questionnaire.code === state.activeExam?.questionnaire)?.nickname}.
              </span>
              <Link to={`/simulator/${state.activeExam.questionnaire}`} className="inline-flex items-center gap-1 font-bold">
                להמשיך <ArrowLeft size={14} />
              </Link>
            </div>
          </Notice>
        </div>
      )}

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        {questionnaireList.map((questionnaire) => (
          <ExamCard key={questionnaire.code} questionnaire={questionnaire} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <SectionTitle icon={<CalendarDays size={16} />} title="היום" description={todaySessions.length ? 'מהתוכנית השבועית שלך' : 'אין מפגש מתוכנן להיום'} actions={<Link to="/planner" className="text-sm font-semibold text-primary">למתכנן</Link>} />
          {todaySessions.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {todaySessions.map((session) => {
                const done = Boolean(state.planOverrides[session.id]?.done);
                return (
                  <li key={session.id} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
                    <button
                      type="button"
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${done ? 'border-green bg-green text-white' : 'border-border bg-surface'}`}
                      aria-pressed={done}
                      aria-label={done ? 'סמן כלא בוצע' : 'סמן כבוצע'}
                      onClick={() => actions.setPlanOverride(session.id, { done: !done })}
                    >
                      {done && <Check size={14} />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-semibold ${done ? 'text-muted line-through' : ''}`}>{session.title}</div>
                      <div className="text-xs text-muted">
                        {session.minutes} דק׳ {session.priority && <PriorityBadge priority={session.priority} short />}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex flex-col gap-1.5 text-sm text-muted">
              {nextSessions.map((session) => (
                <li key={session.id} className="flex justify-between gap-2">
                  <span className="truncate">{session.title}</span>
                  <span className="shrink-0">{formatShortDate(session.date)}</span>
                </li>
              ))}
              {nextSessions.length === 0 && <li>הגדירו זמן פנוי במתכנן כדי לקבל תוכנית.</li>}
            </ul>
          )}
        </Card>

        <Card>
          <SectionTitle icon={<Repeat size={16} />} title="חזרות להיום" description={due.length ? `${due.length} פריטים ממתינים לחזרה` : 'אין חזרות ממתינות — כל הכבוד'} actions={<Link to="/mistakes" className="text-sm font-semibold text-primary">ליומן</Link>} />
          {due.length > 0 && (
            <ul className="flex flex-col gap-2">
              {due.slice(0, 5).map((review) => (
                <li key={review.id} className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2.5 text-sm">
                  <span className="min-w-0 flex-1 truncate">
                    {review.sourceType === 'problem' ? (
                      <Link to={`/practice/${review.sourceId}`} className="font-semibold hover:text-primary">
                        {reviewTitle(review, state)}
                      </Link>
                    ) : (
                      <Link to="/mistakes" className="font-semibold hover:text-primary">
                        {reviewTitle(review, state)}
                      </Link>
                    )}
                  </span>
                  <Badge tone="orange">שלב {review.stage + 1}/4</Badge>
                  <Button size="sm" onClick={() => actions.completeReview(review.id)} icon={<Check size={14} />} aria-label="סיימתי לחזור" />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <SectionTitle icon={<AlertTriangle size={16} />} title="נושאים חלשים" description={weakest.length ? 'מה שסימנת כ״חלש״ — כדאי להתחיל כאן' : 'סמנו רמת שליטה בסילבוס כדי לראות כאן במה להתמקד'} />
          {weakest.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {weakest.map(({ questionnaire, topic, subtopic }) => (
                <li key={subtopic.id}>
                  <Link to={`/topic/${questionnaire.code}/${topic.id}`} className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm hover:bg-surface-2">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-red" />
                    <span className="min-w-0 flex-1 truncate">{subtopic.title.replace(/\$[^$]*\$/g, '')}</span>
                    <span className="shrink-0 text-xs text-muted">{questionnaire.nickname}</span>
                    <ChevronLeft size={14} className="shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <SectionTitle icon={<TrendingUp size={16} />} title="סימולציות אחרונות" description={recentExams.length ? 'הציונים שלך בבחינות הדמה' : `${problems.length} תרגילים במאגר מוכנים לסימולציה`} actions={<Link to="/simulator" className="text-sm font-semibold text-primary">לסימולטור</Link>} />
          {recentExams.length > 0 && (
            <ul className="flex flex-col gap-1.5 text-sm">
              {recentExams.map((exam) => (
                <li key={exam.id} className="flex items-center justify-between gap-2 rounded-xl bg-surface-2 px-3 py-2">
                  <span>
                    שאלון {questionnaireList.find((questionnaire) => questionnaire.code === exam.questionnaire)?.nickname} · {formatShortDate(exam.finishedAt.slice(0, 10))}
                  </span>
                  <b className="text-primary">{formatScore(exam.score)}</b>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
