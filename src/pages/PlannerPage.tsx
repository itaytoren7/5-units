import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CalendarDays, Check, RotateCcw, Timer, Trash2, Undo2 } from 'lucide-react';
import { PriorityBadge } from '../components/StatusBadge';
import { Badge, Button, Card, Field, Notice, PageHeader, ProgressBar, SectionTitle } from '../components/ui';
import { formatShortDate, todayIso, weekdayName, weekdayOf } from '../lib/dates';
import { buildPlan } from '../lib/planner';
import { questionnaireByCode, questionnaireList } from '../lib/questionnaires';
import { useStore } from '../state/store';

export function PlannerPage() {
  const { state, actions } = useStore();
  const today = todayIso();
  const plan = useMemo(
    () => buildPlan({ questionnaires: questionnaireList, examDates: state.examDates, ratings: state.ratings, hoursPerWeek: state.planner.hoursPerWeek, studyDays: state.planner.studyDays, sessionMinutes: state.planner.sessionMinutes, today }),
    [state.examDates, state.ratings, state.planner, today],
  );
  const hasDates = Object.keys(state.examDates).length > 0;
  const allSessions = plan.weeks.flatMap((week) => week.sessions);
  const doneCount = allSessions.filter((session) => state.planOverrides[session.id]?.done).length;

  const toggleDay = (day: number) => {
    const days = state.planner.studyDays.includes(day) ? state.planner.studyDays.filter((entry) => entry !== day) : [...state.planner.studyDays, day].sort();
    if (days.length) actions.setPlanner({ studyDays: days });
  };

  return (
    <>
      <PageHeader title="מתכנן למידה" description="תוכנית שבועית שנבנית מהזמן הפנוי שלך: קודם השאלות הצהובות, אחר כך הכחולות, וסימולציות מלאות ב-3 השבועות האחרונים. נושאים שסימנת ״חלש״ מקבלים יותר זמן." />

      <Card className="mb-4">
        <SectionTitle icon={<CalendarDays size={16} />} title="הזמן שלי" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={`שעות בשבוע: ${state.planner.hoursPerWeek}`}>
            <input type="range" min={2} max={40} value={state.planner.hoursPerWeek} onChange={(event) => actions.setPlanner({ hoursPerWeek: Number(event.target.value) })} />
          </Field>
          <Field label={`אורך מפגש: ${state.planner.sessionMinutes} דק׳`}>
            <input type="range" min={30} max={150} step={15} value={state.planner.sessionMinutes} onChange={(event) => actions.setPlanner({ sessionMinutes: Number(event.target.value) })} />
          </Field>
          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold">ימי לימוד</span>
            <div className="flex flex-wrap gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                const on = state.planner.studyDays.includes(day);
                return (
                  <button key={day} type="button" aria-pressed={on} onClick={() => toggleDay(day)} className={`btn btn-sm ${on ? 'btn-primary' : ''}`}>
                    {weekdayName(day)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-3 text-sm">
          {questionnaireList.map((questionnaire) => (
            <span key={questionnaire.code}>
              שאלון {questionnaire.nickname}: {state.examDates[questionnaire.code] ? <b>{formatShortDate(state.examDates[questionnaire.code])}</b> : <Link to="/settings" className="font-semibold text-primary">הגדרת תאריך</Link>}
            </span>
          ))}
          {Object.keys(state.planOverrides).length > 0 && (
            <Button size="sm" variant="ghost" icon={<RotateCcw size={14} />} onClick={actions.clearPlanOverrides}>
              איפוס שינויים
            </Button>
          )}
        </div>
      </Card>

      {!hasDates && (
        <div className="mb-4">
          <Notice tone="primary" icon={<CalendarDays size={16} />}>
            אין תאריכי בחינה, אז התוכנית נבנית ל-8 שבועות קדימה ובלי סימולציות. <Link to="/settings" className="font-bold underline">הגדירו תאריכים</Link> לתוכנית מדויקת.
          </Notice>
        </div>
      )}
      {plan.unscheduledMinutes > 0 && (
        <div className="mb-4">
          <Notice tone="red" icon={<AlertTriangle size={16} />}>
            כ-{Math.ceil(plan.unscheduledMinutes / 60)} שעות לימוד לא נכנסות לפני הבחינה. הגדילו את השעות השבועיות או הוסיפו ימי לימוד.
          </Notice>
        </div>
      )}

      {allSessions.length > 0 && (
        <div className="mb-4 flex items-center gap-3 text-sm">
          <span className="shrink-0 text-muted">
            בוצעו {doneCount}/{allSessions.length}
          </span>
          <ProgressBar percent={(doneCount / allSessions.length) * 100} className="flex-1" tone="green" />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {plan.weeks
          .filter((week) => week.sessions.length > 0)
          .map((week) => {
            const days = [...new Set(week.sessions.map((session) => session.date))];
            const minutes = week.sessions.filter((session) => !state.planOverrides[session.id]?.removed).reduce((sum, session) => sum + (state.planOverrides[session.id]?.minutes ?? session.minutes), 0);
            return (
              <Card key={week.index}>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-bold">
                    {week.index === 0 ? 'השבוע' : `שבוע ${week.index + 1}`} <span className="text-sm font-normal text-muted">· {formatShortDate(week.start)}–{formatShortDate(week.end)}</span>
                  </h2>
                  <Badge>{Math.round((minutes / 60) * 10) / 10} ש׳</Badge>
                </div>
                <div className="flex flex-col gap-3">
                  {days.map((date) => (
                    <div key={date}>
                      <div className={`mb-1 text-xs font-bold ${date === today ? 'text-primary' : 'text-muted'}`}>
                        יום {weekdayName(weekdayOf(date))} · {formatShortDate(date)} {date === today && '· היום'}
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {week.sessions
                          .filter((session) => session.date === date)
                          .map((session) => {
                            const override = state.planOverrides[session.id] ?? {};
                            const questionnaire = questionnaireByCode(session.questionnaire);
                            if (override.removed) {
                              return (
                                <li key={session.id} className="flex items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2 text-sm text-muted">
                                  <span className="min-w-0 flex-1 line-through">{session.title}</span>
                                  <Button size="sm" variant="ghost" icon={<Undo2 size={14} />} onClick={() => actions.setPlanOverride(session.id, { removed: false })} aria-label="החזרה" />
                                </li>
                              );
                            }
                            const subtopicTitles = session.subtopicIds.map((id) => questionnaire?.topics.flatMap((topic) => topic.subtopics).find((subtopic) => subtopic.id === id)?.title ?? '').filter(Boolean);
                            return (
                              <li key={session.id} className={`flex items-start gap-2 rounded-xl px-3 py-2.5 ${session.kind === 'simulation' ? 'bg-primary-soft' : 'bg-surface-2'}`}>
                                <button type="button" className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${override.done ? 'border-green bg-green text-white' : 'border-border bg-surface'}`} aria-pressed={Boolean(override.done)} aria-label={override.done ? 'סמן כלא בוצע' : 'סמן כבוצע'} onClick={() => actions.setPlanOverride(session.id, { done: !override.done })}>
                                  {override.done && <Check size={13} />}
                                </button>
                                <div className="min-w-0 flex-1">
                                  <div className={`flex flex-wrap items-center gap-1.5 text-sm font-semibold ${override.done ? 'text-muted line-through' : ''}`}>
                                    {session.kind === 'simulation' && <Timer size={14} />}
                                    {session.title}
                                    {session.priority && <PriorityBadge priority={session.priority} short />}
                                    <Badge>שאלון {questionnaire?.nickname}</Badge>
                                  </div>
                                  {subtopicTitles.length > 0 && <div className="mt-0.5 line-clamp-2 text-xs text-muted">{subtopicTitles.map((title) => title.replace(/\$[^$]*\$/g, '…')).join(' · ')}</div>}
                                  <div className="mt-1 flex items-center gap-2 text-xs">
                                    <label className="flex items-center gap-1 text-muted">
                                      <input type="number" min={10} max={300} step={5} value={override.minutes ?? session.minutes} onChange={(event) => actions.setPlanOverride(session.id, { minutes: Number(event.target.value) })} className="!min-h-0 w-16 !px-1.5 !py-0.5 text-xs" aria-label="דקות" />
                                      דק׳
                                    </label>
                                    {session.kind === 'simulation' && (
                                      <Link to={`/simulator/${session.questionnaire}`} className="font-semibold text-primary">
                                        לסימולטור
                                      </Link>
                                    )}
                                    {session.kind === 'study' && session.slot && (
                                      <Link to={`/practice?code=${session.questionnaire}&slot=${session.slot}`} className="font-semibold text-primary">
                                        לתרגול
                                      </Link>
                                    )}
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost" icon={<Trash2 size={14} />} aria-label="הסרה מהתוכנית" onClick={() => actions.setPlanOverride(session.id, { removed: true })} />
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
}
