import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, Check, ChevronDown, Eye, Flag, Play, Shuffle, Square, Timer } from 'lucide-react';
import { problemById, problemsFor } from '@/data/problems';
import type { QuestionnaireCode } from '@/data/problems/types';
import { Figure } from '../components/Figure';
import { Markdown } from '../components/Markdown';
import { PriorityBadge } from '../components/StatusBadge';
import { Badge, Button, Card, Notice, PageHeader, SectionTitle } from '../components/ui';
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

  if (!exam || exam.phase === 'setup') {
    const draw = exam?.problemBySlot ?? {};
    return (
      <>
        <PageHeader eyebrow={<Link to="/simulator">סימולטור</Link>} title={`בחינת דמה · שאלון ${questionnaire.nickname}`} description={`${formatDuration(questionnaire.durationMinutes)} · עונים על ${questionnaire.questionsToAnswer} מתוך ${questionnaire.totalQuestions} · ${formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה${questionnaire.code === '35581' ? ' · הציון מוגבל ל-100' : ''}`} />
        <Card className="mb-4">
          <SectionTitle icon={<Timer size={16} />} title="איך זה עובד" />
          <ol className="flex list-decimal flex-col gap-1 ps-5 text-sm">
            <li>לכל שאלה בבחינה נשלף תרגיל אקראי מהמאגר (לשאלה בלי תרגיל במאגר — תרגלו מבחינת עבר).</li>
            <li>כל השאלות גלויות. בוחרים בעצמכם על אילו {questionnaire.questionsToAnswer} לענות — אין הגבלת פרקים.</li>
            <li>השעון רץ גם אם סוגרים את הדף. התראה כשנותרו 30 ו-10 דקות.</li>
            <li>בסוף: בודקים מול הפתרון ומדרגים כל שאלה (מלא / חלקי / אפס). הציון נשמר בהיסטוריה.</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="primary" icon={<Play size={16} />} onClick={start}>
              התחלת סימולציה
            </Button>
            <Button icon={<Shuffle size={16} />} onClick={() => actions.setActiveExam({ questionnaire: code, phase: 'setup', chosenSlots: [], problemBySlot: randomProblemBySlot(code, allSlots), startedAt: null, endsAt: null, grades: {}, alertsShown: [] })}>
              הגרלת תרגילים מחדש
            </Button>
          </div>
        </Card>
        <Card>
          <SectionTitle title="התרגילים שיופיעו" description="אפשר להחליף תרגיל לכל שאלה לפני שמתחילים" />
          <ul className="flex flex-col gap-2">
            {questionnaire.slots.map((slot) => {
              const pool = problemsFor(code, slot.number);
              const selected = draw[String(slot.number)] ?? null;
              return (
                <li key={slot.number} className="flex flex-col gap-2 rounded-xl bg-surface-2 px-3 py-2.5 sm:flex-row sm:items-center">
                  <span className="min-w-0 flex-1 text-sm">
                    <b>שאלה {slot.number}</b> · {slot.title}
                  </span>
                  {pool.length ? (
                    <select
                      value={selected ?? ''}
                      onChange={(event) => actions.setActiveExam({ questionnaire: code, phase: 'setup', chosenSlots: [], problemBySlot: { ...(exam?.problemBySlot ?? randomProblemBySlot(code, allSlots)), [String(slot.number)]: event.target.value || null }, startedAt: null, endsAt: null, grades: {}, alertsShown: [] })}
                      className="sm:max-w-xs"
                    >
                      <option value="">אקראי</option>
                      {pool.map((problem) => (
                        <option key={problem.id} value={problem.id}>
                          {problem.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Badge>אין במאגר — מבחינת עבר</Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </>
    );
  }

  const toggleChosen = (slot: number) => {
    const chosen = exam.chosenSlots.includes(slot) ? exam.chosenSlots.filter((entry) => entry !== slot) : [...exam.chosenSlots, slot].sort((a, b) => a - b);
    actions.updateActiveExam({ chosenSlots: chosen });
  };

  const tooMany = exam.chosenSlots.length > questionnaire.questionsToAnswer;
  const lowTime = secondsLeft <= 600;

  if (exam.phase === 'running') {
    return (
      <>
        <div className={`card sticky top-16 z-20 mb-4 flex items-center justify-between gap-3 p-3 lg:top-4 ${lowTime ? 'border-red' : ''}`}>
          <div className="flex items-center gap-2">
            <Timer size={20} className={lowTime ? 'text-red' : 'text-primary'} />
            <span className={`timer-digits text-2xl font-extrabold ${lowTime ? 'text-red' : ''}`} role="timer" aria-live="off">
              {formatClock(secondsLeft)}
            </span>
          </div>
          <span className="hidden text-sm text-muted sm:block">
            נבחרו {exam.chosenSlots.length}/{questionnaire.questionsToAnswer}
          </span>
          <Button variant="primary" icon={<Square size={14} />} onClick={() => actions.updateActiveExam({ phase: 'grading' })}>
            סיימתי
          </Button>
        </div>
        {tooMany && (
          <div className="mb-3">
            <Notice tone="orange" icon={<AlertTriangle size={16} />}>
              סימנתם יותר מ-{questionnaire.questionsToAnswer} שאלות. בבחינה האמיתית נבדקות רק {questionnaire.questionsToAnswer} הראשונות שכתבתם.
            </Notice>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {questionnaire.slots.map((slot) => {
            const problemId = exam.problemBySlot[String(slot.number)];
            const problem = problemId ? problemById(problemId) : undefined;
            const chosen = exam.chosenSlots.includes(slot.number);
            const open = openSlot === slot.number;
            return (
              <Card key={slot.number} as="article" className={`!p-0 ${chosen ? 'border-primary' : ''}`}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <button type="button" className="flex min-w-0 flex-1 items-center gap-3 text-start" aria-expanded={open} onClick={() => setOpenSlot(open ? null : slot.number)}>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${slot.priority === 'yellow' ? 'bg-yellow-soft text-yellow' : 'bg-blue-soft text-blue'}`}>{slot.number}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">פרק {slot.part}</span>
                      <span className="block font-bold leading-snug">{problem?.title ?? slot.title}</span>
                    </span>
                    <ChevronDown size={18} className={`shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <Button size="sm" variant={chosen ? 'primary' : 'secondary'} icon={chosen ? <Check size={14} /> : undefined} onClick={() => toggleChosen(slot.number)} aria-pressed={chosen}>
                    {chosen ? 'עונה' : 'לענות'}
                  </Button>
                </div>
                {open && (
                  <div className="border-t border-border px-4 py-3">
                    {problem ? (
                      <div className="flex flex-col gap-3">
                        {problem.figureSvg && <Figure svg={problem.figureSvg} />}
                        {problem.sections.map((section) => (
                          <div key={section.id}>
                            <b className="text-sm">סעיף {section.label}</b>
                            <Markdown className="text-[15px] leading-relaxed">{section.statement}</Markdown>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted">אין במאגר תרגיל לשאלה הזו. פתרו את שאלה {slot.number} מבחינת עבר אמיתית ודרגו את עצמכם בסוף.</p>
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

  // Grading phase
  const elapsed = exam.startedAt ? Math.round((Math.min(now, new Date(exam.endsAt ?? now).getTime()) - new Date(exam.startedAt).getTime()) / 1000) : 0;
  const counted = exam.chosenSlots;
  const finish = () => {
    actions.finishExam({ questionnaire: code, startedAt: exam.startedAt ?? new Date().toISOString(), finishedAt: new Date().toISOString(), elapsedSeconds: Math.max(0, elapsed), chosenSlots: counted, problemBySlot: exam.problemBySlot, grades: exam.grades, score, notes });
    notify(`הסימולציה נשמרה · ציון ${formatScore(score)}`);
    navigate('/simulator');
  };

  return (
    <>
      <PageHeader eyebrow={`שאלון ${questionnaire.nickname}`} title="בדיקה וציון" description="פתחו את הפתרון של כל שאלה שעניתם עליה, השוו, ודרגו בכנות." actions={<div className="text-end"><div className="text-3xl font-extrabold text-primary">{formatScore(score)}</div><div className="text-xs text-muted">ציון משוקלל</div></div>} />
      {counted.length === 0 && (
        <div className="mb-3">
          <Notice tone="orange" icon={<AlertTriangle size={16} />}>
            לא סימנתם שאלות. חזרו לבחינה וסמנו על אילו שאלות עניתם.
            <button type="button" className="ms-2 font-bold underline" onClick={() => actions.updateActiveExam({ phase: 'running' })}>
              חזרה לבחינה
            </button>
          </Notice>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {counted.map((slotNumber) => {
          const slot = questionnaire.slots.find((entry) => entry.number === slotNumber)!;
          const problem = exam.problemBySlot[String(slotNumber)] ? problemById(exam.problemBySlot[String(slotNumber)]!) : undefined;
          const grade = exam.grades[String(slotNumber)];
          return (
            <Card key={slotNumber} as="article">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <b>שאלה {slotNumber}</b>
                <PriorityBadge priority={slot.priority} short />
                <span className="text-sm text-muted">{problem?.title ?? slot.title}</span>
                <span className="ms-auto text-sm text-muted">{grade === undefined ? '—' : `${formatScore(Math.round(grade * getQuestionValue(code) * 10) / 10)} נק׳`}</span>
              </div>
              {problem && (
                <details className="mb-3 rounded-xl bg-surface-2/60">
                  <summary className="flex items-center gap-2 px-3 py-2 text-sm font-semibold">
                    <Eye size={14} /> הפתרון המלא
                  </summary>
                  <div className="flex flex-col gap-3 border-t border-border px-3 py-3 text-sm">
                    {problem.sections.map((section) => (
                      <div key={section.id}>
                        <b>סעיף {section.label}</b>
                        <ol className="mt-1 flex list-decimal flex-col gap-1 ps-5">
                          {section.solutionSteps.map((step, index) => (
                            <li key={index}>
                              <Markdown inline>{step}</Markdown>
                            </li>
                          ))}
                        </ol>
                        <div className="mt-1 text-green">
                          <b>תשובה: </b>
                          <Markdown inline className="text-text">
                            {section.finalAnswer}
                          </Markdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <div className="seg" role="radiogroup" aria-label={`ציון לשאלה ${slotNumber}`}>
                  {gradeOptions.map((option) => (
                    <button key={option.value} type="button" role="radio" aria-checked={grade === option.value} onClick={() => actions.updateActiveExam({ grades: { ...exam.grades, [String(slotNumber)]: option.value } })}>
                      {option.label}
                    </button>
                  ))}
                </div>
                {grade !== undefined && grade < 1 && (
                  <Button size="sm" variant="ghost" icon={<Flag size={14} />} to="/mistakes">
                    לרשום טעות
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="mt-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">הערות לעצמי (ניהול זמן, מה לשפר)</span>
          <textarea rows={2} value={notes} onChange={(event) => setNotes(event.target.value)} />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="primary" icon={<Check size={16} />} onClick={finish} disabled={counted.length === 0}>
            שמירת הציון
          </Button>
          <Button variant="ghost" onClick={() => actions.updateActiveExam({ phase: 'running' })} disabled={secondsLeft === 0}>
            חזרה לבחינה
          </Button>
          <Button variant="danger" onClick={() => { actions.setActiveExam(null); navigate('/simulator'); }}>
            ביטול בלי לשמור
          </Button>
        </div>
      </Card>
    </>
  );
}
