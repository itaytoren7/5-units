import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CircleAlert, CircleCheck, Eye, Flag, Lightbulb, Pause, Play, RotateCcw } from 'lucide-react';
import type { Problem, ProblemSection } from '@/data/problems/types';
import { problemById, problemsFor } from '@/data/problems';
import { Figure } from '../components/Figure';
import { Markdown } from '../components/Markdown';
import { MistakeForm } from '../components/MistakeForm';
import { DifficultyBadge } from '../components/ProblemCard';
import { PriorityBadge } from '../components/StatusBadge';
import { Badge, Button, Card, Notice, PageHeader } from '../components/ui';
import { formatClock } from '../lib/dates';
import { questionnaireByCode, slotOf, topicOf } from '../lib/questionnaires';
import { useStore } from '../state/store';
import type { SectionResult } from '../state/types';
import { NotFound } from './NotFound';

const resultLabels: Record<SectionResult, string> = { correct: 'צדקתי', partial: 'חלקית', wrong: 'טעיתי' };
const resultTone: Record<SectionResult, 'green' | 'orange' | 'red'> = { correct: 'green', partial: 'orange', wrong: 'red' };

function Stopwatch({ problemId }: { problemId: string }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    setElapsed(0);
    setRunning(false);
  }, [problemId]);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);
  return (
    <div className="flex items-center gap-1 rounded-xl bg-surface-2 px-2 py-1">
      <span className="timer-digits min-w-[3.5rem] text-center font-bold" aria-live="off">
        {formatClock(elapsed)}
      </span>
      <Button size="sm" variant="ghost" icon={running ? <Pause size={14} /> : <Play size={14} />} aria-label={running ? 'עצירת שעון' : 'הפעלת שעון'} onClick={() => setRunning(!running)} />
      <Button size="sm" variant="ghost" icon={<RotateCcw size={14} />} aria-label="איפוס שעון" onClick={() => { setRunning(false); setElapsed(0); }} />
    </div>
  );
}

function SectionCard({ problem, section, index }: { problem: Problem; section: ProblemSection; index: number }) {
  const { state, actions, notify } = useStore();
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionShown, setSolutionShown] = useState(false);
  const [logging, setLogging] = useState(false);
  const result = state.practice[problem.id]?.sectionResults[section.id];

  useEffect(() => {
    setHintsShown(0);
    setSolutionShown(false);
    setLogging(false);
  }, [section.id]);

  const mark = (next: SectionResult) => {
    actions.recordSectionResult(problem.id, section.id, next, problem.questionnaire);
    if (next === 'wrong') setLogging(true);
    else notify(next === 'correct' ? 'יפה! נשמר.' : 'נשמר. שווה לחזור על הסעיף הזה.');
  };

  return (
    <Card as="article" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-extrabold">
          סעיף {section.label} <span className="text-xs font-medium text-muted">({index + 1}/{problem.sections.length})</span>
        </h2>
        {result && <Badge tone={resultTone[result]}>{resultLabels[result]}</Badge>}
      </div>
      <Markdown className="text-[15px] leading-relaxed">{section.statement}</Markdown>

      {hintsShown > 0 && (
        <ol className="flex flex-col gap-1.5">
          {section.hints.slice(0, hintsShown).map((hint, hintIndex) => (
            <li key={hintIndex} className="hint-enter flex items-start gap-2 rounded-xl bg-yellow-soft px-3 py-2 text-sm text-yellow">
              <Lightbulb size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <Markdown inline className="min-w-0 text-text">
                {hint}
              </Markdown>
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-wrap gap-2">
        {hintsShown < section.hints.length && (
          <Button size="sm" icon={<Lightbulb size={14} />} onClick={() => setHintsShown(hintsShown + 1)}>
            רמז ({hintsShown + 1}/{section.hints.length})
          </Button>
        )}
        {!solutionShown && (
          <Button size="sm" icon={<Eye size={14} />} onClick={() => setSolutionShown(true)}>
            הצג פתרון
          </Button>
        )}
      </div>

      {solutionShown && (
        <div className="hint-enter rounded-xl border border-border bg-surface-2/60 p-3.5">
          <h3 className="mb-2 text-sm font-bold">פתרון מלא</h3>
          <ol className="flex list-decimal flex-col gap-2 ps-5 text-sm leading-relaxed">
            {section.solutionSteps.map((step, stepIndex) => (
              <li key={stepIndex}>
                <Markdown inline>{step}</Markdown>
              </li>
            ))}
          </ol>
          <div className="mt-3 rounded-lg bg-green-soft px-3 py-2 text-sm text-green">
            <b>תשובה סופית: </b>
            <Markdown inline className="text-text">
              {section.finalAnswer}
            </Markdown>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">איך הלך?</span>
            <div className="seg" role="radiogroup" aria-label="הערכה עצמית">
              {(['correct', 'partial', 'wrong'] as SectionResult[]).map((value) => (
                <button key={value} type="button" role="radio" aria-checked={result === value} onClick={() => mark(value)} className="flex items-center gap-1">
                  {value === 'correct' ? <CircleCheck size={14} className="text-green" /> : value === 'wrong' ? <CircleAlert size={14} className="text-red" /> : null}
                  {resultLabels[value]}
                </button>
              ))}
            </div>
            {result === 'wrong' && !logging && (
              <Button size="sm" variant="ghost" icon={<Flag size={14} />} onClick={() => setLogging(true)}>
                לרשום ביומן הטעויות
              </Button>
            )}
          </div>
          {logging && (
            <div className="mt-3 rounded-xl border border-border bg-surface p-3.5">
              <h4 className="mb-2 text-sm font-bold">מה השתבש בסעיף {section.label}?</h4>
              <p className="mb-3 text-xs text-muted">הטעות תיכנס לתור החזרות (1, 3, 7 ו-14 ימים) ותופיע בלוח הראשי.</p>
              <MistakeForm
                lockQuestionnaire
                initial={{ questionnaire: problem.questionnaire, topicId: problem.topicId, problemId: problem.id, sectionId: section.id, type: 'understanding' }}
                onSave={(draft) => {
                  actions.addMistake(draft);
                  setLogging(false);
                  notify('הטעות נרשמה ביומן ונכנסה לתור החזרות');
                }}
                onCancel={() => setLogging(false)}
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export function PracticePage() {
  const { problemId } = useParams();
  const { state, actions, notify } = useStore();
  const problem = problemById(problemId ?? '');
  if (!problem) return <NotFound />;
  const questionnaire = questionnaireByCode(problem.questionnaire)!;
  const slot = slotOf(questionnaire, problem.slot);
  const topic = topicOf(questionnaire, problem.topicId);
  const verified = problem.verified || Boolean(state.verifiedProblems[problem.id]);
  const siblings = problemsFor(problem.questionnaire, problem.slot);
  const position = siblings.findIndex((entry) => entry.id === problem.id);
  const previous = siblings[position - 1];
  const next = siblings[position + 1];

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-1.5">
            <Link to={`/practice?code=${problem.questionnaire}&slot=${problem.slot}`} className="hover:underline">
              שאלון {questionnaire.nickname} · שאלה {problem.slot}
            </Link>
            {topic && (
              <>
                ·
                <Link to={`/topic/${problem.questionnaire}/${topic.id}`} className="hover:underline">
                  {topic.title}
                </Link>
              </>
            )}
          </span>
        }
        title={problem.title}
        actions={<Stopwatch problemId={problem.id} />}
      >
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {slot && <PriorityBadge priority={slot.priority} />}
          <DifficultyBadge difficulty={problem.difficulty} />
          <Badge>~{problem.estimatedMinutes} דק׳</Badge>
          <Badge>{problem.sections.length} סעיפים</Badge>
        </div>
      </PageHeader>

      <div className="mb-4">
        {verified ? (
          <Notice tone="green" icon={<CircleCheck size={16} />}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>סימנת שבדקת את הפתרון של התרגיל הזה.</span>
              <button type="button" className="text-sm font-semibold underline" onClick={() => actions.setProblemVerified(problem.id, false)}>
                בטל סימון
              </button>
            </div>
          </Notice>
        ) : (
          <Notice tone="orange" icon={<CircleAlert size={16} />}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>
                <b>⚠ לא נבדק.</b> התרגיל והפתרון נוצרו אוטומטית. פתרו בעצמכם, השוו בקפידה, ורק אם הכול נכון סמנו שבדקתם.
              </span>
              <Button
                size="sm"
                icon={<Check size={14} />}
                onClick={() => {
                  actions.setProblemVerified(problem.id, true);
                  notify('התרגיל סומן כבדוק');
                }}
              >
                בדקתי — הפתרון נכון
              </Button>
            </div>
          </Notice>
        )}
      </div>

      {problem.figureSvg && <Figure svg={problem.figureSvg} caption="שרטוט (לא בקנה מידה)" />}

      <div className="flex flex-col gap-4">
        {problem.sections.map((section, index) => (
          <SectionCard key={section.id} problem={problem} section={section} index={index} />
        ))}
      </div>

      <nav className="mt-6 flex items-center justify-between gap-2" aria-label="מעבר בין תרגילים">
        {previous ? (
          <Button to={`/practice/${previous.id}`} icon={<ArrowRight size={16} />}>
            הקודם
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button to={`/practice/${next.id}`} variant="primary">
            התרגיל הבא <ArrowLeft size={16} />
          </Button>
        ) : (
          <Button to={`/practice?code=${problem.questionnaire}`} variant="primary">
            לכל התרגילים <ArrowLeft size={16} />
          </Button>
        )}
      </nav>
    </>
  );
}
