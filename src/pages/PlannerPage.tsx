import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CalendarDays, Check, ChevronDown, RotateCcw, Timer, Trash2, Undo2 } from 'lucide-react';
import { PriorityBadge } from '../components/StatusBadge';
import { Badge, Button, Card, Collapse, Field, Notice, PageHeader, ProgressBar, SectionTitle, Stat } from '../components/ui';
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
  const totalHours = Math.round(plan.totalStudyMinutes / 60);

  const toggleDay = (day: number) => {
    const days = state.planner.studyDays.includes(day) ? state.planner.studyDays.filter((entry) => entry !== day) : [...state.planner.studyDays, day].sort();
    if (days.length) actions.setPlanner({ studyDays: days });
  };

  return (
    <>
      <PageHeader title="מתכנן למידה" description="תוכנית שבועית מהזמן הפנוי שלך: קודם השאלות הצהובות, אחר כך הכחולות, וסימולציות מלאות בשלושת השבועות האחרונים. נושאים שסימנת ״חלש״ מקבלים יותר זמן." />

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <SectionTitle icon={<CalendarDays size={18} />} title="הזמן שלי" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={`שעות בשבוע: ${state.planner.hoursPerWeek}`}>
              <input type="range" min={2} max={40} value={state.planner.hoursPerWeek} onChange={(event) => actions.setPlanner({ hoursPerWeek: Number(event.target.value) })} />
            </Field>
            <Field label={`אורך מפגש: ${state.planner.sessionMinutes} דק׳`}>
              <input type="range" min={30} max={150} step={15} value={state.planner.sessionMinutes} onChange={(event) => actions.setPlanner({ sessionMinutes: Number(event.target.value) })} />
            </Field>
            <div className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold">ימי לימוד</span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="ימי לימוד">
                {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                  const on = state.planner.studyDays.includes(day);
                  return (
                    <button key={day} type="button" aria-pressed={on} onClick={() => toggleDay(day)} className={`chip ${on ? 'chip-chosen' : ''}`}>
                      {weekdayName(day)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
            {questionnaireList.map((questionnaire) => (
              <span key={questionnaire.code}>
                שאלון {questionnaire.nickname}:{' '}
                {state.examDates[questionnaire.code] ? (
                  <b>{formatShortDate(state.examDates[questionnaire.code])}</b>
                ) : (
                  <Link to="/settings" className="font-semibold text-primary">
                    הגדרת תאריך
                  </Link>
                )}
              </span>
            ))}
            {Object.keys(state.planOverrides).length > 0 && (
              <Button size="sm" variant="ghost" icon={<RotateCcw size={15} />} onClick={actions.clearPlanOverrides}>
                איפוס שינויים
              </Button>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="שעות לימוד בתוכנית" value={totalHours} />
            <Stat label="מפגשים" value={allSessions.length} />
          </div>
          {allSessions.length > 0 && (
            <Card padding="sm">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold">בוצעו</span>
                <span className="tabular-nums text-muted">
                  {doneCount}/{allSessions.length}
                </span>
              </div>
              <ProgressBar percent={(doneCount / allSessions.length) * 100} tone="green" label="מפגשים שבוצעו" />
            </Card>
          )}
          {!hasDates && (
            <Notice tone="primary" icon={<CalendarDays size={18} />}>
              אין תאריכי בחינה, אז התוכנית נבנית ל-8 שבועות קדימה ובלי סימולציות.{' '}
              <Link to="/settings" className="font-bold underline">
                הגדירו תאריכים
              </Link>{' '}
              לתוכנית מדויקת.
            </Notice>
          )}
          {plan.unscheduledMinutes > 0 && (
            <Notice tone="red" icon={<AlertTriangle size={18} />}>
              כ-{Math.ceil(plan.unscheduledMinutes / 60)} שעות לימוד לא נכנסות לפני הבחינה. הגדילו את השעות השבועיות או הוסיפו ימי לימוד.
            </Notice>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {plan.weeks
          .filter((week) => week.sessions.length > 0)
          .map((week) => {
            const days = [...new Set(week.sessions.map((session) => session.date))];
            const minutes = week.sessions.filter((session) => !state.planOverrides[session.id]?.removed).reduce((sum, session) => sum + (state.planOverrides[session.id]?.minutes ?? session.minutes), 0);
            return (
              <WeekCard key={week.index} index={week.index} start={week.start} end={week.end} hours={Math.round((minutes / 60) * 10) / 10} sessions={week.sessions.length} defaultOpen={week.index < 2}>
                <div className="flex flex-col gap-4">
                  {days.map((date) => (
                    <div key={date}>
                      <div className={`mb-1.5 text-sm font-bold ${date === today ? 'text-primary' : 'text-muted'}`}>
                        יום {weekdayName(weekdayOf(date))} · {formatShortDate(date)}
                        {date === today && ' · היום'}
                      </div>
                      <ul className="flex flex-col gap-2">
                        {week.sessions
                          .filter((session) => session.date === date)
                          .map((session) => {
                            const override = state.planOverrides[session.id] ?? {};
                            const questionnaire = questionnaireByCode(session.questionnaire);
                            if (override.removed) {
                              return (
                                <li key={session.id} className="flex items-center gap-3 rounded-2xl border border-dashed border-border px-4 py-2.5 text-sm text-muted">
                                  <span className="min-w-0 flex-1 line-through">{session.title}</span>
                                  <Button size="sm" variant="ghost" icon={<Undo2 size={15} />} onClick={() => actions.setPlanOverride(session.id, { removed: false })} aria-label="החזרה לתוכנית" />
                                </li>
                              );
                            }
                            const subtopicTitles = session.subtopicIds.map((id) => questionnaire?.topics.flatMap((topic) => topic.subtopics).find((subtopic) => subtopic.id === id)?.title ?? '').filter(Boolean);
                            return (
                              <li key={session.id} className={`flex items-start gap-3 rounded-2xl px-4 py-3 ${session.kind === 'simulation' ? 'bg-primary-soft' : 'bg-surface-2'}`}>
                                <button
                                  type="button"
                                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${override.done ? 'border-green bg-green text-white' : 'border-border-strong bg-surface'}`}
                                  aria-pressed={Boolean(override.done)}
                                  aria-label={override.done ? 'סמן כלא בוצע' : 'סמן כבוצע'}
                                  onClick={() => actions.setPlanOverride(session.id, { done: !override.done })}
                                >
                                  {override.done && <Check size={16} />}
                                </button>
                                <div className="min-w-0 flex-1">
                                  <div className={`flex flex-wrap items-center gap-1.5 text-base font-semibold ${override.done ? 'text-muted line-through' : ''}`}>
                                    {session.kind === 'simulation' && <Timer size={16} />}
                                    {session.title}
                                    {session.priority && <PriorityBadge priority={session.priority} short />}
                                    <Badge size="sm">שאלון {questionnaire?.nickname}</Badge>
                                  </div>
                                  {subtopicTitles.length > 0 && <div className="mt-0.5 line-clamp-2 text-sm text-muted">{subtopicTitles.map((title) => title.replace(/\$[^$]*\$/g, '…')).join(' · ')}</div>}
                                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                                    <label className="flex items-center gap-1.5 text-muted">
                                      <input type="number" min={10} max={300} step={5} value={override.minutes ?? session.minutes} onChange={(event) => actions.setPlanOverride(session.id, { minutes: Number(event.target.value) })} className="!min-h-0 w-20 !rounded-lg !px-2 !py-1 text-sm" aria-label="דקות" />
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
                                <Button size="sm" variant="ghost" icon={<Trash2 size={15} />} aria-label="הסרה מהתוכנית" onClick={() => actions.setPlanOverride(session.id, { removed: true })} />
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ))}
                </div>
              </WeekCard>
            );
          })}
      </div>
    </>
  );
}

function WeekCard({ index, start, end, hours, sessions, defaultOpen, children }: { index: number; start: string; end: string; hours: number; sessions: number; defaultOpen: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card padding="none">
      <button type="button" className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start sm:px-6" aria-expanded={open} onClick={() => setOpen(!open)}>
        <h2 className="text-xl font-bold">
          {index === 0 ? 'השבוע' : `שבוע ${index + 1}`} <span className="text-sm font-normal text-muted">· {formatShortDate(start)} עד {formatShortDate(end)}</span>
        </h2>
        <span className="flex items-center gap-2">
          <Badge tone="primary">{hours} שעות</Badge>
          <Badge>{sessions} מפגשים</Badge>
          <ChevronDown size={20} className={`text-muted transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </span>
      </button>
      <Collapse open={open}>
        <div className="border-t border-border px-5 py-4 sm:px-6">{children}</div>
      </Collapse>
    </Card>
  );
}
