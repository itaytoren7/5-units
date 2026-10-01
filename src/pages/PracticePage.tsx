import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CircleAlert, CircleCheck, CircleX, Eye, Flag, Lightbulb, MinusCircle, Pause, Play, RotateCcw } from 'lucide-react';
import type { Problem, ProblemSection } from '@/data/problems/types';
import { problemById, problemsFor } from '@/data/problems';
import { Figure } from '../components/Figure';
import { Markdown } from '../components/Markdown';
import { MistakeForm } from '../components/MistakeForm';
import { DifficultyBadge } from '../components/ProblemCard';
import { PriorityBadge } from '../components/StatusBadge';
import { Badge, Button, Card, Collapse, Notice, PageHeader } from '../components/ui';
import { useActiveSection } from '../components/useActiveSection';
import { formatClock } from '../lib/dates';
import { questionnaireByCode, slotOf, topicOf } from '../lib/questionnaires';
import { useStore } from '../state/store';
import type { SectionResult } from '../state/types';
import { NotFound } from './NotFound';

const resultLabels: Record<SectionResult, string> = { correct: 'צדקתי', partial: 'חלקית', wrong: 'טעיתי' };
const resultTone: Record<SectionResult, 'green' | 'orange' | 'red'> = { correct: 'green', partial: 'orange', wrong: 'red' };
const resultIcon: Record<SectionResult, typeof Check> = { correct: CircleCheck, partial: MinusCircle, wrong: CircleX };

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
    <div className="flex items-center gap-1.5 rounded-2xl bg-surface-2 px-3 py-2">
      <span className="timer-digits min-w-[4rem] text-center text-xl font-bold" aria-live="off">
        {formatClock(elapsed)}
      </span>
      <Button size="sm" variant="ghost" icon={running ? <Pause size={16} /> : <Play size={16} />} aria-label={running ? 'עצירת שעון' : 'הפעלת שעון'} onClick={() => setRunning(!running)} />
      <Button
        size="sm"
        variant="ghost"
        icon={<RotateCcw size={16} />}
        aria-label="איפוס שעון"
        onClick={() => {
          setRunning(false);
          setElapsed(0);
        }}
      />
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
    <Card as="article" className="scroll-mt-24">
      <div id={`section-${section.id}`} className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="section-label" aria-hidden="true">
            {section.label}
          </span>
          <h2 className="text-xl font-bold">
            סעיף {section.label} <span className="text-sm font-medium text-muted">· {index + 1} מתוך {problem.sections.length}</span>
          </h2>
        </div>
        {result && <Badge tone={resultTone[result]}>{resultLabels[result]}</Badge>}
      </div>

      <div className="prose">
        <Markdown className="text-lg leading-relaxed">{section.statement}</Markdown>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {section.hints.map((hint, hintIndex) => (
          <Collapse key={hintIndex} open={hintIndex < hintsShown}>
            <div className="hint-box prose mb-1">
              <Lightbulb size={18} className="mt-0.5 shrink-0 text-yellow" aria-hidden="true" />
              <div className="min-w-0 text-base">
                <span className="me-1 text-sm font-bold text-yellow">רמז {hintIndex + 1}</span>
                <Markdown inline>{hint}</Markdown>
              </div>
            </div>
          </Collapse>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {hintsShown < section.hints.length && (
          <Button variant="soft" icon={<Lightbulb size={16} />} onClick={() => setHintsShown(hintsShown + 1)}>
            רמז ({hintsShown + 1}/{section.hints.length})
          </Button>
        )}
        {!solutionShown && (
          <Button icon={<Eye size={16} />} onClick={() => setSolutionShown(true)}>
            הצג פתרון
          </Button>
        )}
      </div>

      <Collapse open={solutionShown}>
        <div className="prose mt-5 rounded-2xl border border-border bg-surface-2/60 p-5">
          <h3 className="mb-4 text-base font-bold">פתרון מלא</h3>
          <ol className="steps text-base leading-relaxed">
            {section.solutionSteps.map((step, stepIndex) => (
              <li key={stepIndex} className="step">
                <span className="step-num" aria-hidden="true">
                  {stepIndex + 1}
                </span>
                <div className="step-body">
                  <Markdown inline>{step}</Markdown>
                </div>
              </li>
            ))}
          </ol>
          <div className="answer-box mt-5 text-base">
            <b className="text-green">תשובה סופית: </b>
            <Markdown inline>{section.finalAnswer}</Markdown>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 text-base font-bold">איך הלך בסעיף הזה?</div>
          <div className="flex flex-col gap-2 sm:flex-row" role="group" aria-label="הערכה עצמית">
            {(['correct', 'partial', 'wrong'] as SectionResult[]).map((value) => {
              const Icon = resultIcon[value];
              return (
                <button key={value} type="button" className={`mark-btn mark-${resultTone[value]}`} aria-pressed={result === value} onClick={() => mark(value)}>
                  <Icon size={20} aria-hidden="true" />
                  {resultLabels[value]}
                </button>
              );
            })}
          </div>
          {result === 'wrong' && !logging && (
            <div className="mt-3">
              <Button size="sm" variant="ghost" icon={<Flag size={15} />} onClick={() => setLogging(true)}>
                לרשום ביומן הטעויות
              </Button>
            </div>
          )}
        </div>

        <Collapse open={logging}>
          <div className="mt-4 rounded-2xl border border-border p-5">
            <h4 className="text-base font-bold">מה השתבש בסעיף {section.label}?</h4>
            <p className="mb-4 text-sm text-muted">הטעות תיכנס לתור החזרות (אחרי יום, 3 ימים, שבוע ושבועיים) ותופיע בעמוד הראשי.</p>
            {logging && (
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
            )}
          </div>
        </Collapse>
      </Collapse>
    </Card>
  );
}

export function PracticePage() {
  const { problemId } = useParams();
  const { state, actions, notify } = useStore();
  const problem = problemById(problemId ?? '');
  const sectionIds = useMemo(() => (problem ? problem.sections.map((section) => `section-${section.id}`) : []), [problem]);
  const activeSection = useActiveSection(sectionIds);
  if (!problem) return <NotFound />;
  const questionnaire = questionnaireByCode(problem.questionnaire)!;
  const slot = slotOf(questionnaire, problem.slot);
  const topic = topicOf(questionnaire, problem.topicId);
  const verified = problem.verified || Boolean(state.verifiedProblems[problem.id]);
  const siblings = problemsFor(problem.questionnaire, problem.slot);
  const position = siblings.findIndex((entry) => entry.id === problem.id);
  const previous = siblings[position - 1];
  const next = siblings[position + 1];
  const record = state.practice[problem.id];

  const verifiedNotice = verified ? (
    <Notice tone="green" icon={<CircleCheck size={18} />}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span>סימנת שבדקת את הפתרון של התרגיל הזה.</span>
        <button type="button" className="text-sm font-semibold underline" onClick={() => actions.setProblemVerified(problem.id, false)}>
          בטל סימון
        </button>
      </div>
    </Notice>
  ) : (
    <Notice tone="orange" icon={<CircleAlert size={18} />}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>
          <b>⚠ לא נבדק.</b> התרגיל והפתרון נוצרו אוטומטית. פתרו בעצמכם, השוו בקפידה, ורק אם הכול נכון סמנו שבדקתם.
        </span>
        <Button
          size="sm"
          icon={<Check size={15} />}
          onClick={() => {
            actions.setProblemVerified(problem.id, true);
            notify('התרגיל סומן כבדוק');
          }}
        >
          בדקתי, הפתרון נכון
        </Button>
      </div>
    </Notice>
  );

  const sectionNav = (
    <nav className="flex flex-wrap gap-2" aria-label="מעבר בין סעיפים">
      {problem.sections.map((section) => {
        const result = record?.sectionResults[section.id];
        const tone = result ? `chip-${resultTone[result]}` : '';
        return (
          <a key={section.id} href={`#section-${section.id}`} className={`chip ${tone}`} aria-current={activeSection === `section-${section.id}` ? 'true' : undefined} title={result ? resultLabels[result] : 'עוד לא דורג'}>
            {section.label}
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
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {slot && <PriorityBadge priority={slot.priority} />}
          <DifficultyBadge difficulty={problem.difficulty} />
          <Badge>~{problem.estimatedMinutes} דק׳</Badge>
          <Badge>{problem.sections.length} סעיפים</Badge>
        </div>
      </PageHeader>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
        <div className="flex min-w-0 flex-col gap-5">
          {verifiedNotice}
          <div className="lg:hidden">{sectionNav}</div>
          {problem.figureSvg && <Figure svg={problem.figureSvg} caption="שרטוט (לא בקנה מידה)" />}
          {problem.sections.map((section, index) => (
            <SectionCard key={section.id} problem={problem} section={section} index={index} />
          ))}
          <nav className="mt-2 flex items-center justify-between gap-2" aria-label="מעבר בין תרגילים">
            {previous ? (
              <Button size="lg" to={`/practice/${previous.id}`} icon={<ArrowRight size={18} />}>
                הקודם
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button size="lg" to={`/practice/${next.id}`} variant="primary">
                התרגיל הבא <ArrowLeft size={18} />
              </Button>
            ) : (
              <Button size="lg" to={`/practice?code=${problem.questionnaire}`} variant="primary">
                לכל התרגילים <ArrowLeft size={18} />
              </Button>
            )}
          </nav>
        </div>

        <aside className="no-print hidden lg:block">
          <div className="toc gap-4">
            <div>
              <div className="mb-2 px-1 text-sm font-semibold text-muted">סעיפים</div>
              {sectionNav}
            </div>
            <div className="rounded-2xl bg-surface-2 p-4 text-sm text-muted">
              {record ? (
                <>
                  תרגלת {record.attempts} {record.attempts === 1 ? 'פעם' : 'פעמים'}.
                  <br />
                  {Object.values(record.sectionResults).filter((value) => value === 'correct').length} סעיפים נכונים.
                </>
              ) : (
                'עוד לא תרגלת את התרגיל הזה.'
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
