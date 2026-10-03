import { lazy, Suspense, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Award, BookOpen, CalendarDays, Check, ChevronLeft, GraduationCap, PencilLine, Repeat, Target, Timer, TrendingUp } from 'lucide-react';
import type { Questionnaire, Rating, Subtopic, Topic } from '@/data/syllabus/types';
import { problems } from '@/data/problems';
import { Markdown } from '../components/Markdown';
import { RatingDot } from '../components/RatingControl';
import { PriorityBadge } from '../components/StatusBadge';
import { Badge, Button, Card, EmptyState, Notice, ProgressBar, ProgressRing, SectionTitle } from '../components/ui';
import { daysUntil, formatDate, formatShortDate, todayIso } from '../lib/dates';
import { formatDuration, formatPoints, formatScore } from '../lib/format';
import { buildPlan } from '../lib/planner';
import { hasLearnedFilter, learnedSubtopicIds } from '../lib/learned';
import { startOfWeek } from '../lib/dates';
import { missedSessionsMessage, overdueMessage, streakAtRiskMessage, type CoachMessage } from '../motivation/coach';
import { progressOf, ratingOf, slotProgress, topicsOfSlot } from '../lib/progress';
import { questionnaireList } from '../lib/questionnaires';
import { dueReviews, nextExam, reviewLink, reviewTitle } from '../lib/selectors';
import { BadgeGrid, CoachCard, StreakChip } from '../motivation/components';

const DailyExercise = lazy(() => import('../components/DailyExercise').then((module) => ({ default: module.DailyExercise })));
import { useMotivation } from '../motivation/store';
import { useStore } from '../state/store';

function greeting(now = new Date()): string {
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) return 'בוקר טוב';
  if (hour >= 12 && hour < 17) return 'צהריים טובים';
  if (hour >= 17 && hour < 22) return 'ערב טוב';
  return 'לילה טוב';
}

interface Suggestion {
  questionnaire: Questionnaire;
  topic: Topic;
  subtopic: Subtopic;
  slot: number;
  priority: 'yellow' | 'blue';
  rating: Rating;
}

/** Yellow slots first, then blue; inside a slot the weakest self-rating first; mastered subtopics are skipped. */
function suggestions(ratings: Record<string, Rating>, examDates: Record<string, string>, limit: number, learned?: ReadonlySet<string>): Suggestion[] {
  const ratingRank: Record<Rating, number> = { weak: 0, 'not-started': 1, medium: 2, mastered: 3 };
  const ordered = [...questionnaireList].sort((a, b) => (examDates[a.code] ?? '9999').localeCompare(examDates[b.code] ?? '9999'));
  const result: Suggestion[] = [];
  const seen = new Set<string>();
  for (const questionnaire of ordered) {
    const slots = [...questionnaire.slots].sort((a, b) => (a.priority === b.priority ? a.number - b.number : a.priority === 'yellow' ? -1 : 1));
    for (const slot of slots) {
      const candidates: Suggestion[] = [];
      for (const topic of topicsOfSlot(questionnaire, slot)) {
        for (const subtopic of topic.subtopics) {
          if (subtopic.status !== 'in' || seen.has(subtopic.id)) continue;
          if (learned && learned.size > 0 && !learned.has(subtopic.id)) continue;
          const rating = ratingOf(ratings, subtopic.id);
          if (rating === 'mastered') continue;
          candidates.push({ questionnaire, topic, subtopic, slot: slot.number, priority: slot.priority, rating });
        }
      }
      candidates.sort((a, b) => ratingRank[a.rating] - ratingRank[b.rating]);
      for (const candidate of candidates) {
        if (result.length >= limit) return result;
        seen.add(candidate.subtopic.id);
        result.push(candidate);
      }
    }
  }
  return result;
}

function ExamCard({ questionnaire }: { questionnaire: Questionnaire }) {
  const { state } = useStore();
  const progress = progressOf(questionnaire, state.ratings);
  const date = state.examDates[questionnaire.code];
  const days = date ? daysUntil(date) : null;
  const yellow = questionnaire.slots.filter((slot) => slot.priority === 'yellow');
  return (
    <Card as="article" className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Badge tone={questionnaire.code === '35581' ? 'primary' : 'green'}>שאלון {questionnaire.nickname}</Badge>
          <h3 className="mt-2 text-2xl font-bold">שאלון {questionnaire.code}</h3>
          <p className="mt-1 text-sm text-muted">
            {questionnaire.weightPercent}% מהציון · {formatDuration(questionnaire.durationMinutes)}
            <br />
            {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions} שאלות · {formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה
          </p>
        </div>
        <ProgressRing percent={progress.percent} size={104} stroke={10} label={`התקדמות בשאלון ${questionnaire.nickname}: ${progress.percent}%`} />
      </div>
      <div className="flex flex-col gap-2">
        {yellow.map((slot) => {
          const slotPercent = slotProgress(questionnaire, slot, state.ratings).percent;
          return (
            <div key={slot.number} className="flex items-center gap-3 text-sm">
              <span className="w-16 shrink-0 font-semibold">שאלה {slot.number}</span>
              <ProgressBar percent={slotPercent} tone="yellow" size="sm" className="flex-1" label={slot.title} />
              <span className="w-10 text-end tabular-nums text-muted">{slotPercent}%</span>
            </div>
          );
        })}
        <div className="text-xs text-muted">השאלות הצהובות, ללמוד קודם. ההתקדמות המלאה במפת הסילבוס.</div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
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
        <div className="flex gap-2">
          <Button size="sm" to={`/syllabus/${questionnaire.code}`} icon={<BookOpen size={15} />}>
            סילבוס
          </Button>
          <Button size="sm" to={`/practice?code=${questionnaire.code}`} icon={<PencilLine size={15} />}>
            תרגול
          </Button>
          <Button size="sm" to={`/simulator/${questionnaire.code}`} icon={<Timer size={15} />}>
            סימולציה
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function Dashboard() {
  const { state, actions } = useStore();
  const { earnedCount, badgeStatuses, streak, coach, dismissBanner, activeDays } = useMotivation();
  const [params] = useSearchParams();
  const today = todayIso();
  const hour = new Date().getHours();
  const learned = useMemo(() => learnedSubtopicIds(state), [state]);
  const anyLearned = hasLearnedFilter(state);
  const upcoming = nextExam(state, today);
  const upcomingQuestionnaire = upcoming ? questionnaireList.find((questionnaire) => questionnaire.code === upcoming.code) : undefined;
  const due = dueReviews(state, today);
  const overall = Math.round(questionnaireList.reduce((sum, questionnaire) => sum + progressOf(questionnaire, state.ratings).percent, 0) / questionnaireList.length);
  const practiced = Object.keys(state.practice).length;

  const plan = useMemo(
    () => buildPlan({ questionnaires: questionnaireList, examDates: state.examDates, ratings: state.ratings, hoursPerWeek: state.planner.hoursPerWeek, studyDays: state.planner.studyDays, sessionMinutes: state.planner.sessionMinutes, today, learnedSubtopicIds: learned }),
    [state.examDates, state.ratings, state.planner, today, learned],
  );
  // Sessions planned earlier this week on days with no study at all (only for students who use the planner).
  const usesPlanner = Object.values(state.planOverrides).some((override) => override.done);
  const missed = useMemo(() => {
    const weekStart = startOfWeek(today);
    if (weekStart === today || !usesPlanner) return 0;
    const earlier = buildPlan({ questionnaires: questionnaireList, examDates: state.examDates, ratings: state.ratings, hoursPerWeek: state.planner.hoursPerWeek, studyDays: state.planner.studyDays, sessionMinutes: state.planner.sessionMinutes, today: weekStart, learnedSubtopicIds: learned });
    const active = new Set(activeDays);
    return earlier.weeks
      .flatMap((week) => week.sessions)
      .filter((session) => session.date < today && !active.has(session.date) && !state.planOverrides[session.id]?.done && !state.planOverrides[session.id]?.removed).length;
  }, [state.examDates, state.ratings, state.planner, state.planOverrides, today, learned, activeDays, usesPlanner]);
  const coachBanners = [overdueMessage(state.reviews, today), streakAtRiskMessage(streak.current, streak.activeToday, hour, today), missedSessionsMessage(missed, today)].filter(
    (message): message is CoachMessage => message !== null && !coach.dismissed[message.id],
  );
  useEffect(() => {
    if (params.get('daily') !== '1') return;
    const timer = window.setTimeout(() => document.getElementById('daily')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
    return () => window.clearTimeout(timer);
  }, [params]);
  const todaySessions = plan.weeks.flatMap((week) => week.sessions).filter((session) => session.date === today && !state.planOverrides[session.id]?.removed);
  const nextSessions = plan.weeks
    .flatMap((week) => week.sessions)
    .filter((session) => session.date > today && !state.planOverrides[session.id]?.removed)
    .slice(0, 3);
  const nextUp = useMemo(() => suggestions(state.ratings, state.examDates, 6, learned), [state.ratings, state.examDates, learned]);
  const recentExams = state.exams.slice(0, 3);

  return (
    <>
      <section className="card relative mb-6 overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-primary-soft opacity-70 blur-2xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[60ch]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-primary">{greeting()}</span>
              <StreakChip />
            </div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              {upcoming && upcomingQuestionnaire ? (
                <>
                  עוד <span className="tabular-nums text-primary">{upcoming.days}</span> ימים לשאלון {upcomingQuestionnaire.nickname}
                </>
              ) : (
                'כל צעד קטן מקרב אותך ל־100'
              )}
            </h1>
            <p className="mt-3 text-base text-muted">
              {upcoming ? `הבחינה ב-${formatDate(upcoming.date)}. ` : 'הגדירו תאריך בחינה כדי לקבל ספירה לאחור ותוכנית שבועית. '}
              {practiced > 0 ? `תרגלתם עד עכשיו ${practiced} תרגילים.` : 'המקום הכי טוב להתחיל בו: מפת הלמידה.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="primary" size="lg" to="/learn" icon={<GraduationCap size={18} />}>
                לשיעורים
              </Button>
              <Button size="lg" to="/syllabus" icon={<BookOpen size={18} />}>
                מפת הלמידה
              </Button>
              <Button size="lg" to="/practice" icon={<PencilLine size={18} />}>
                לתרגול
              </Button>
              {!upcoming && (
                <Button size="lg" variant="ghost" to="/settings" icon={<CalendarDays size={18} />}>
                  הגדרת תאריך
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-2xl bg-surface-2 px-5 py-4 lg:flex-col lg:items-center lg:px-7 lg:py-6">
            <ProgressRing percent={overall} size={96} stroke={9} label={`התקדמות כוללת: ${overall}%`} />
            <div className="text-sm lg:text-center">
              <b className="block text-base">התקדמות כוללת</b>
              <span className="text-muted">מהחומר שבבגרות, בשני השאלונים</span>
            </div>
          </div>
        </div>
      </section>

      {coachBanners.length > 0 && (
        <div className="mb-6 flex flex-col gap-3">
          {coachBanners.map((message) => (
            <CoachCard key={message.id} message={message} variant="banner" onClose={() => dismissBanner(message.id)} />
          ))}
        </div>
      )}

      {!anyLearned && (
        <div className="mb-6">
          <Notice tone="primary" icon={<GraduationCap size={18} />}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>עוד לא סימנתם מה למדתם בכיתה, ולכן ההמלצות והתרגיל היומי כוללים את כל החומר.</span>
              <Link to="/learn" className="inline-flex items-center gap-1 font-bold">
                לסימון <ArrowLeft size={16} />
              </Link>
            </div>
          </Notice>
        </div>
      )}

      <div id="daily" className="mb-6 scroll-mt-24">
        <Suspense fallback={<Card><div className="py-8 text-center text-sm text-muted">טוען את התרגיל היומי…</div></Card>}>
          <DailyExercise today={today} hour={hour} />
        </Suspense>
      </div>

      {state.activeExam && state.activeExam.phase !== 'setup' && (
        <div className="mb-6">
          <Notice tone="primary" icon={<Timer size={18} />}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>יש לך סימולציה פעילה בשאלון {questionnaireList.find((questionnaire) => questionnaire.code === state.activeExam?.questionnaire)?.nickname}.</span>
              <Link to={`/simulator/${state.activeExam.questionnaire}`} className="inline-flex items-center gap-1 font-bold">
                להמשיך <ArrowLeft size={16} />
              </Link>
            </div>
          </Notice>
        </div>
      )}

      <div className="mb-6 grid gap-5 md:grid-cols-2">
        {questionnaireList.map((questionnaire) => (
          <ExamCard key={questionnaire.code} questionnaire={questionnaire} />
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <SectionTitle icon={<Target size={18} />} title="מה ללמוד עכשיו" description={anyLearned ? 'מתוך מה שלמדתם בכיתה: קודם הצהוב, ובתוכו מה שסימנתם כחלש' : 'קודם השאלות הצהובות, ובתוכן מה שסימנתם כחלש'} />
          {nextUp.length === 0 ? (
            <EmptyState icon={<Check size={22} />} title="הכול מסומן ״שולט״" description="כל הכבוד. עכשיו סימולציות וחזרות." />
          ) : (
            <ul className="flex flex-col gap-1.5">
              {nextUp.map((item) => (
                <li key={item.subtopic.id}>
                  <Link to={`/topic/${item.questionnaire.code}/${item.topic.id}`} className="flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition hover:bg-surface-2">
                    <span className="mt-2 shrink-0">
                      <RatingDot rating={item.rating} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-muted">
                        שאלון {item.questionnaire.nickname} · שאלה {item.slot} · {item.topic.title}
                      </span>
                      <span className="block text-base leading-snug">
                        <Markdown inline>{item.subtopic.title}</Markdown>
                      </span>
                    </span>
                    <span className="mt-1 hidden shrink-0 sm:block">
                      <PriorityBadge priority={item.priority} short />
                    </span>
                    <ChevronLeft size={18} className="mt-1.5 shrink-0 text-muted" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <SectionTitle icon={<CalendarDays size={18} />} title="היום" description={todaySessions.length ? 'מהתוכנית השבועית שלך' : 'אין מפגש מתוכנן להיום'} actions={<Link to="/planner" className="text-sm font-semibold text-primary">למתכנן</Link>} />
            {todaySessions.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {todaySessions.map((session) => {
                  const done = Boolean(state.planOverrides[session.id]?.done);
                  return (
                    <li key={session.id} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3.5 py-3">
                      <button
                        type="button"
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${done ? 'border-green bg-green text-white' : 'border-border-strong bg-surface'}`}
                        aria-pressed={done}
                        aria-label={done ? 'סמן כלא בוצע' : 'סמן כבוצע'}
                        onClick={() => actions.setPlanOverride(session.id, { done: !done })}
                      >
                        {done && <Check size={16} />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className={`font-semibold ${done ? 'text-muted line-through' : ''}`}>{session.title}</div>
                        <div className="flex items-center gap-1.5 text-sm text-muted">
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
                    <span className="shrink-0 tabular-nums">{formatShortDate(session.date)}</span>
                  </li>
                ))}
                {nextSessions.length === 0 && <li>הגדירו זמן פנוי במתכנן כדי לקבל תוכנית.</li>}
              </ul>
            )}
          </Card>

          <Card>
            <SectionTitle icon={<Repeat size={18} />} title="חזרות להיום" description={due.length ? `${due.length} פריטים ממתינים לחזרה` : 'אין חזרות ממתינות'} actions={<Link to="/mistakes" className="text-sm font-semibold text-primary">ליומן</Link>} />
            {due.length > 0 && (
              <ul className="flex flex-col gap-2">
                {due.slice(0, 5).map((review) => (
                  <li key={review.id} className="flex items-center gap-2 rounded-xl bg-surface-2 px-3.5 py-2.5 text-sm">
                    <span className="min-w-0 flex-1 truncate">
                      <Link to={reviewLink(review)} className="font-semibold hover:text-primary">
                        {reviewTitle(review, state)}
                      </Link>
                    </span>
                    <Badge tone="orange" size="sm">
                      שלב {review.stage + 1}/4
                    </Badge>
                    <Button size="sm" onClick={() => actions.completeReview(review.id)} icon={<Check size={15} />} aria-label="סיימתי לחזור" />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <SectionTitle icon={<TrendingUp size={18} />} title="סימולציות אחרונות" description={recentExams.length ? 'הציונים שלך בבחינות הדמה' : `${problems.length} תרגילים במאגר מוכנים לסימולציה`} actions={<Link to="/simulator" className="text-sm font-semibold text-primary">לסימולטור</Link>} />
            {recentExams.length > 0 && (
              <ul className="flex flex-col gap-1.5 text-sm">
                {recentExams.map((exam) => (
                  <li key={exam.id} className="flex items-center justify-between gap-2 rounded-xl bg-surface-2 px-3.5 py-2.5">
                    <span>
                      שאלון {questionnaireList.find((questionnaire) => questionnaire.code === exam.questionnaire)?.nickname} · {formatShortDate(exam.finishedAt.slice(0, 10))}
                    </span>
                    <b className="tabular-nums text-primary">{formatScore(exam.score)}</b>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <SectionTitle icon={<Award size={18} />} title="ההישגים שלי" description={`${earnedCount} מתוך ${badgeStatuses.length} תגים. תג נפתח ברגע שמגיעים ליעד.`} />
        <BadgeGrid />
      </Card>
    </>
  );
}
