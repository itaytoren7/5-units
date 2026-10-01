import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, Check, ChevronDown, Eye, Flag, Play, Shuffle, Square, Timer, X } from 'lucide-react';
import { problemById, problemsFor } from '@/data/problems';
import type { QuestionnaireCode } from '@/data/problems/types';
import { Figure } from '../components/Figure';
import { Markdown } from '../components/Markdown';
import { PriorityBadge } from '../components/StatusBadge';
import { Accordion, Badge, Button, Card, Notice, PageHeader, ProgressBar, SectionTitle, Stat } from '../components/ui';
import { formatClock } from '../lib/dates';
import { formatDuration, formatPoints, formatScore } from '../lib/format';
import { calculateExamScore, getQuestionValue } from '../lib/scoring';
import { isQuestionnaireCode, questionnaireByCode } from '../lib/questionnaires';
import { useStore } from '../state/store';
import type { ActiveExam } from '../state/types';
import { NotFound } from './NotFound';

function randomProblemBySlot(code: QuestionnaireCode, slots: number[]): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  for (const slot of slots) {
    const pool = problemsFor(code, slot);
    result[String(slot)] = pool.length ? pool[Math.floor(Math.random() * pool.length)].id : null;
  }
  return result;
}

function useNow(active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [active]);
  return now;
}

const gradeOptions = [
  { value: 1, label: 'מלא' },
  { value: 0.75, label: '75%' },
  { value: 0.5, label: '50%' },
  { value: 0.25, label: '25%' },
  { value: 0, label: 'אפס' },
];

function scrollToSlot(slot: number) {
  document.getElementById(`slot-${slot}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function SimulatorPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { state, actions, notify } = useStore();
  const questionnaire = questionnaireByCode(code);
  const exam = state.activeExam && state.activeExam.questionnaire === code ? state.activeExam : null;
  const now = useNow(exam?.phase === 'running');
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const secondsLeft = exam?.endsAt ? Math.max(0, Math.round((new Date(exam.endsAt).getTime() - now) / 1000)) : 0;

  // Time alerts at 30 and 10 minutes left; auto-move to grading at 0.
  useEffect(() => {
    if (!exam || exam.phase !== 'running') return;
    for (const threshold of [30, 10]) {
      if (secondsLeft <= threshold * 60 && secondsLeft > 0 && !exam.alertsShown.includes(threshold)) {
        actions.updateActiveExam({ alertsShown: [...exam.alertsShown, threshold] });
        notify(`⏰ נותרו ${threshold} דקות`);
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate?.(200);
      }
    }
    if (secondsLeft === 0) {
      actions.updateActiveExam({ phase: 'grading' });
      notify('הזמן נגמר — עוברים לבדיקה');
    }
  }, [exam, secondsLeft, actions, notify]);

  const score = useMemo(() => (exam && isQuestionnaireCode(code) ? calculateExamScore(code, exam.chosenSlots.map((slot) => ({ slot, fraction: exam.grades[String(slot)] ?? 0 }))) : 0), [exam, code]);

  if (!questionnaire || !isQuestionnaireCode(code)) return <NotFound />;
  const allSlots = questionnaire.slots.map((slot) => slot.number);
  const totalSeconds = questionnaire.durationMinutes * 60;

  const start = () => {
    const next: ActiveExam = {
      questionnaire: code,
      phase: 'running',
      chosenSlots: [],
      problemBySlot: exam?.problemBySlot && Object.keys(exam.problemBySlot).length ? exam.problemBySlot : randomProblemBySlot(code, allSlots),
      startedAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + questionnaire.durationMinutes * 60_000).toISOString(),
      grades: {},
      alertsShown: [],
    };
    actions.setActiveExam(next);
  };

  /* ---------------- Setup ---------------- */
  if (!exam || exam.phase === 'setup') {
    const draw = exam?.problemBySlot ?? {};
    const redraw = () => actions.setActiveExam({ questionnaire: code, phase: 'setup', chosenSlots: [], problemBySlot: randomProblemBySlot(code, allSlots), startedAt: null, endsAt: null, grades: {}, alertsShown: [] });
    return (
      <>
        <PageHeader
          eyebrow={<Link to="/simulator">סימולטור</Link>}
          title={`בחינת דמה · שאלון ${questionnaire.nickname}`}
          description={`${formatDuration(questionnaire.durationMinutes)} · עונים על ${questionnaire.questionsToAnswer} מתוך ${questionnaire.totalQuestions} · ${formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה${questionnaire.code === '35581' ? ' · הציון מוגבל ל-100' : ''}`}
          actions={
            <Button variant="primary" size="lg" icon={<Play size={18} />} onClick={start}>
              התחלת סימולציה
            </Button>
          }
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <Card>
            <SectionTitle icon={<Timer size={18} />} title="איך זה עובד" />
            <ol className="flex flex-col gap-3">
              {[
                'לכל שאלה בבחינה נשלף תרגיל אקראי מהמאגר. לשאלה בלי תרגיל במאגר, תרגלו מבחינת עבר.',
                `כל השאלות גלויות. בוחרים בעצמכם על אילו ${questionnaire.questionsToAnswer} לענות. אין הגבלת פרקים.`,
                'השעון רץ גם אם סוגרים את הדף. התראה כשנותרו 30 ו-10 דקות.',
                'בסוף בודקים מול הפתרון ומדרגים כל שאלה: מלא, חלקי או אפס. הציון נשמר בהיסטוריה.',
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">{index + 1}</span>
                  <span className="text-base">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card>
            <SectionTitle
              title="התרגילים שיופיעו"
              description="אפשר להחליף תרגיל לכל שאלה לפני שמתחילים"
              actions={
                <Button size="sm" icon={<Shuffle size={15} />} onClick={redraw}>
                  הגרלה מחדש
                </Button>
              }
            />
            <ul className="flex flex-col gap-2">
              {questionnaire.slots.map((slot) => {
                const pool = problemsFor(code, slot.number);
                const selected = draw[String(slot.number)] ?? null;
                return (
                  <li key={slot.number} className="flex flex-col gap-2 rounded-xl bg-surface-2 px-3.5 py-3 sm:flex-row sm:items-center">
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold ${slot.priority === 'yellow' ? 'bg-yellow-soft text-yellow' : 'bg-blue-soft text-blue'}`}>{slot.number}</span>
                      <span className="truncate text-sm">{slot.title}</span>
                    </span>
                    {pool.length ? (
                      <select
                        value={selected ?? ''}
                        onChange={(event) => actions.setActiveExam({ questionnaire: code, phase: 'setup', chosenSlots: [], problemBySlot: { ...(exam?.problemBySlot ?? randomProblemBySlot(code, allSlots)), [String(slot.number)]: event.target.value || null }, startedAt: null, endsAt: null, grades: {}, alertsShown: [] })}
                        className="sm:max-w-[240px]"
                        aria-label={`תרגיל לשאלה ${slot.number}`}
                      >
                        <option value="">אקראי</option>
                        {pool.map((problem) => (
                          <option key={problem.id} value={problem.id}>
                            {problem.title}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Badge>אין במאגר · מבחינת עבר</Badge>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </>
    );
  }

  const toggleChosen = (slot: number) => {
    const chosen = exam.chosenSlots.includes(slot) ? exam.chosenSlots.filter((entry) => entry !== slot) : [...exam.chosenSlots, slot].sort((a, b) => a - b);
    actions.updateActiveExam({ chosenSlots: chosen });
  };

  const tooMany = exam.chosenSlots.length > questionnaire.questionsToAnswer;
  const lowTime = secondsLeft <= 600;
  const warnTime = secondsLeft <= 1800;

  /* ---------------- Running ---------------- */
  if (exam.phase === 'running') {
    const timeTone = lowTime ? 'var(--red)' : warnTime ? 'var(--orange)' : 'var(--text)';
    return (
      <>
        <div className={`card exam-bar p-4 sm:p-5 ${lowTime ? 'exam-bar-danger' : warnTime ? 'exam-bar-warn' : ''}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Timer size={24} style={{ color: timeTone }} aria-hidden="true" />
              <div>
                <div className="timer-digits text-4xl font-bold leading-none sm:text-5xl" role="timer" aria-live="off" style={{ color: timeTone }}>
                  {formatClock(secondsLeft)}
                </div>
                <div className="mt-1 text-sm text-muted">{lowTime ? 'נותרו פחות מ-10 דקות' : warnTime ? 'נותרו פחות מ-30 דקות' : 'זמן שנותר'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-end sm:block">
                <div className={`text-lg font-bold tabular-nums ${tooMany ? 'text-orange' : ''}`}>
                  בחרת {exam.chosenSlots.length} מתוך {questionnaire.questionsToAnswer}
                </div>
                <div className="text-sm text-muted">שאלות לענות</div>
              </div>
              <Button variant="primary" size="lg" icon={<Square size={16} />} onClick={() => actions.updateActiveExam({ phase: 'grading' })}>
                סיימתי
              </Button>
            </div>
          </div>
          <ProgressBar percent={(1 - secondsLeft / totalSeconds) * 100} size="sm" className="mt-4" tone={lowTime ? 'red' : warnTime ? 'orange' : 'primary'} label="זמן שעבר" />
          <div className="mt-3 flex items-center justify-between gap-3 sm:hidden">
            <span className={`text-sm font-bold tabular-nums ${tooMany ? 'text-orange' : ''}`}>
              בחרת {exam.chosenSlots.length} מתוך {questionnaire.questionsToAnswer}
            </span>
          </div>
        </div>

        <nav className="my-4 flex flex-wrap gap-2" aria-label="מעבר בין שאלות">
          {questionnaire.slots.map((slot) => {
            const chosen = exam.chosenSlots.includes(slot.number);
            return (
              <button
                key={slot.number}
                type="button"
                className={`chip ${chosen ? 'chip-chosen' : ''}`}
                aria-current={openSlot === slot.number ? 'true' : undefined}
                aria-label={`שאלה ${slot.number}${chosen ? ', נבחרה' : ''}`}
                title={slot.title}
                onClick={() => {
                  setOpenSlot(slot.number);
                  scrollToSlot(slot.number);
                }}
              >
                {chosen ? (
                  <span className="inline-flex items-center gap-1">
                    <Check size={14} /> {slot.number}
                  </span>
                ) : (
                  slot.number
                )}
              </button>
            );
          })}
        </nav>

        {tooMany && (
          <div className="mb-4">
            <Notice tone="orange" icon={<AlertTriangle size={18} />}>
              סימנתם יותר מ-{questionnaire.questionsToAnswer} שאלות. בבחינה האמיתית נבדקות רק {questionnaire.questionsToAnswer} הראשונות שכתבתם.
            </Notice>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {questionnaire.slots.map((slot) => {
            const problemId = exam.problemBySlot[String(slot.number)];
            const problem = problemId ? problemById(problemId) : undefined;
            const chosen = exam.chosenSlots.includes(slot.number);
            const open = openSlot === slot.number;
            return (
              <Card key={slot.number} as="article" padding="none" className={`scroll-mt-40 ${chosen ? 'border-primary' : ''}`} style={{ borderColor: chosen ? 'var(--primary)' : undefined }}>
                <div id={`slot-${slot.number}`} className="flex items-center gap-3 px-4 py-4 sm:px-6">
                  <button type="button" className="flex min-w-0 flex-1 items-center gap-3 text-start" aria-expanded={open} onClick={() => setOpenSlot(open ? null : slot.number)}>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-base font-bold ${slot.priority === 'yellow' ? 'bg-yellow-soft text-yellow' : 'bg-blue-soft text-blue'}`}>{slot.number}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-muted">
                        פרק {slot.part} · <PriorityBadge priority={slot.priority} short />
                      </span>
                      <span className="block text-lg font-bold leading-snug">{problem?.title ?? slot.title}</span>
                    </span>
                    <ChevronDown size={20} className={`shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <Button variant={chosen ? 'primary' : 'secondary'} icon={chosen ? <Check size={16} /> : undefined} onClick={() => toggleChosen(slot.number)} aria-pressed={chosen}>
                    {chosen ? 'עונה' : 'לענות'}
                  </Button>
                </div>
                {open && (
                  <div className="border-t border-border px-4 py-5 sm:px-6">
                    {problem ? (
                      <div className="prose flex flex-col gap-6">
                        {problem.figureSvg && <Figure svg={problem.figureSvg} />}
                        {problem.sections.map((section) => (
                          <div key={section.id}>
                            <Badge tone="primary" className="mb-2">
                              סעיף {section.label}
                            </Badge>
                            <Markdown className="text-lg leading-relaxed">{section.statement}</Markdown>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base text-muted">אין במאגר תרגיל לשאלה הזו. פתרו את שאלה {slot.number} מבחינת עבר אמיתית ודרגו את עצמכם בסוף.</p>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </>
    );
  }

  /* ---------------- Grading / results ---------------- */
  const elapsed = exam.startedAt ? Math.round((Math.min(now, new Date(exam.endsAt ?? now).getTime()) - new Date(exam.startedAt).getTime()) / 1000) : 0;
  const counted = exam.chosenSlots;
  const graded = counted.filter((slot) => exam.grades[String(slot)] !== undefined).length;
  const finish = () => {
    actions.finishExam({ questionnaire: code, startedAt: exam.startedAt ?? new Date().toISOString(), finishedAt: new Date().toISOString(), elapsedSeconds: Math.max(0, elapsed), chosenSlots: counted, problemBySlot: exam.problemBySlot, grades: exam.grades, score, notes });
    notify(`הסימולציה נשמרה · ציון ${formatScore(score)}`);
    navigate('/simulator');
  };
  const chipTone = (fraction: number | undefined) => (fraction === undefined ? '' : fraction >= 1 ? 'chip-green' : fraction > 0 ? 'chip-orange' : 'chip-red');

  return (
    <>
      <Card className="mb-5 text-center" padding="lg">
        <div className="text-sm font-semibold text-muted">ציון משוקלל · שאלון {questionnaire.nickname}</div>
        <div className="my-1 text-6xl font-bold tabular-nums text-primary sm:text-7xl">{formatScore(score)}</div>
        <div className="text-base text-muted">
          דורגו {graded} מתוך {counted.length} שאלות · זמן בבחינה {formatClock(Math.max(0, elapsed))}
        </div>
        {counted.length > 0 && (
          <nav className="mt-5 flex flex-wrap justify-center gap-2" aria-label="מעבר בין שאלות">
            {counted.map((slotNumber) => (
              <button key={slotNumber} type="button" className={`chip ${chipTone(exam.grades[String(slotNumber)])}`} aria-label={`שאלה ${slotNumber}`} onClick={() => scrollToSlot(slotNumber)}>
                {slotNumber}
              </button>
            ))}
          </nav>
        )}
      </Card>

      {counted.length === 0 && (
        <div className="mb-5">
          <Notice tone="orange" icon={<AlertTriangle size={18} />}>
            לא סימנתם שאלות. חזרו לבחינה וסמנו על אילו שאלות עניתם.
            <button type="button" className="ms-2 font-bold underline" onClick={() => actions.updateActiveExam({ phase: 'running' })}>
              חזרה לבחינה
            </button>
          </Notice>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {counted.map((slotNumber) => {
          const slot = questionnaire.slots.find((entry) => entry.number === slotNumber)!;
          const problem = exam.problemBySlot[String(slotNumber)] ? problemById(exam.problemBySlot[String(slotNumber)]!) : undefined;
          const grade = exam.grades[String(slotNumber)];
          const points = grade === undefined ? null : Math.round(grade * getQuestionValue(code) * 10) / 10;
          return (
            <Card key={slotNumber} as="article" className="scroll-mt-6">
              <div id={`slot-${slotNumber}`} className="mb-4 flex flex-wrap items-center gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-base font-bold ${slot.priority === 'yellow' ? 'bg-yellow-soft text-yellow' : 'bg-blue-soft text-blue'}`}>{slotNumber}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-bold leading-snug">{problem?.title ?? slot.title}</div>
                  <div className="text-sm text-muted">
                    פרק {slot.part} · <PriorityBadge priority={slot.priority} short />
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-2xl font-bold tabular-nums" style={{ color: points === null ? 'var(--muted)' : points >= getQuestionValue(code) ? 'var(--green)' : points > 0 ? 'var(--orange)' : 'var(--red)' }}>
                    {points === null ? '—' : formatScore(points)}
                  </div>
                  <div className="text-xs text-muted">מתוך {formatPoints(getQuestionValue(code))}</div>
                </div>
              </div>
              {problem && (
                <div className="mb-4">
                  <Accordion title="הפתרון המלא" summary="השוו סעיף אחרי סעיף לפני שמדרגים" icon={<Eye size={18} />}>
                    <div className="prose flex flex-col gap-5 text-base">
                      {problem.sections.map((section) => (
                        <div key={section.id}>
                          <Badge tone="primary" className="mb-1.5">
                            סעיף {section.label}
                          </Badge>
                          <ol className="mt-1 flex list-decimal flex-col gap-1.5 ps-6">
                            {section.solutionSteps.map((step, index) => (
                              <li key={index}>
                                <Markdown inline>{step}</Markdown>
                              </li>
                            ))}
                          </ol>
                          <div className="mt-2 rounded-xl bg-green-soft px-3.5 py-2 text-green">
                            <b>תשובה: </b>
                            <Markdown inline className="text-text">
                              {section.finalAnswer}
                            </Markdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold">הציון שלי:</span>
                <div className="seg" role="radiogroup" aria-label={`ציון לשאלה ${slotNumber}`}>
                  {gradeOptions.map((option) => (
                    <button key={option.value} type="button" role="radio" aria-checked={grade === option.value} onClick={() => actions.updateActiveExam({ grades: { ...exam.grades, [String(slotNumber)]: option.value } })}>
                      {option.label}
                    </button>
                  ))}
                </div>
                {grade !== undefined && grade < 1 && (
                  <Button size="sm" variant="ghost" icon={<Flag size={15} />} to="/mistakes">
                    לרשום טעות
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="ציון" value={formatScore(score)} tone="primary" />
          <Stat label="שאלות שדורגו" value={`${graded}/${counted.length}`} />
          <Stat label="זמן בבחינה" value={<span className="timer-digits">{formatClock(Math.max(0, elapsed))}</span>} hint={`מתוך ${formatDuration(questionnaire.durationMinutes)}`} />
        </div>
        <label className="mt-5 flex flex-col gap-1.5">
          <span className="text-sm font-semibold">הערות לעצמי (ניהול זמן, מה לשפר)</span>
          <textarea rows={2} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" size="lg" icon={<Check size={18} />} onClick={finish} disabled={counted.length === 0}>
            שמירת הציון
          </Button>
          <Button size="lg" variant="ghost" onClick={() => actions.updateActiveExam({ phase: 'running' })} disabled={secondsLeft === 0}>
            חזרה לבחינה
          </Button>
          <Button
            size="lg"
            variant="danger"
            icon={<X size={18} />}
            onClick={() => {
              actions.setActiveExam(null);
              navigate('/simulator');
            }}
          >
            ביטול בלי לשמור
          </Button>
        </div>
      </Card>
    </>
  );
}
