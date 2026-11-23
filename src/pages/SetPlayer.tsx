import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleCheck, CircleX, Eye, Lightbulb, RotateCcw } from 'lucide-react';
import { setById, type Exercise, type Section } from '@/data/sets';
import { Markdown } from '../components/Markdown';
import { Badge, Button, Card, Collapse, Notice, PageHeader, ProgressBar } from '../components/ui';
import { checkChoice, checkNumeric, type Verdict } from '../sets/checker';
import { Diagram } from '../sets/Diagram';
import { NoHebrewVoiceNote, ReadAloud, SpeedPicker } from '../sets/ReadAloud';
import { useReadAloud } from '../sets/speech';
import { loadSets, recordOutcome, resetSet, setCurrentExercise, setSpeechRate, useSetsState, type SectionOutcome } from '../sets/storage';
import { useStore } from '../state/store';
import { ScoreReveal } from '../motion/components';
import { NotFound } from './NotFound';

const levelLabels = { 1: 'בסיסי', 2: 'בינוני', 3: 'רמת בגרות' } as const;
const levelTones = { 1: 'green', 2: 'orange', 3: 'red' } as const;

interface SectionUi {
  input: string;
  choice: number | null;
  verdict: Verdict | null;
  hints: number;
  revealed: boolean;
  expanded: boolean;
}

const emptyUi: SectionUi = { input: '', choice: null, verdict: null, hints: 0, revealed: false, expanded: false };

function SectionView({ setId, exercise, section, outcome, onOutcome, aloud, rate }: { setId: string; exercise: Exercise; section: Section; outcome: SectionOutcome | undefined; onOutcome: (outcome: SectionOutcome) => void; aloud: ReturnType<typeof useReadAloud>; rate: number }) {
  const [ui, setUi] = useState<SectionUi>(emptyUi);
  useEffect(() => setUi(emptyUi), [exercise.id, section.label]);
  const key = `${setId}:${exercise.id}:${section.label}`;
  const { check } = section;
  const answered = ui.verdict === 'correct' || ui.verdict === 'wrong' || (check.kind === 'self' && outcome !== undefined && ui.revealed);
  const showSolution = ui.revealed || answered;

  const verdictOf = (): Verdict => (check.kind === 'numeric' ? checkNumeric(ui.input, check) : check.kind === 'choice' ? checkChoice(ui.choice, check) : 'empty');

  const submit = () => {
    const verdict = verdictOf();
    setUi((current) => ({ ...current, verdict, revealed: current.revealed || verdict === 'correct' || verdict === 'wrong' }));
    if (verdict === 'correct' || verdict === 'wrong') onOutcome(verdict);
  };

  const explanationText = `${section.short}\n${section.full.join('\n')}`;

  return (
    <Card as="article" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <span className="section-label" aria-hidden="true">
            {section.label}
          </span>
          סעיף {section.label}
        </h3>
        {outcome && <Badge tone={outcome === 'correct' ? 'green' : 'red'}>{outcome === 'correct' ? 'נכון' : 'טעות'}</Badge>}
      </div>
      <div className="prose">
        <Markdown className="text-lg leading-relaxed">{section.prompt}</Markdown>
      </div>

      {check.kind === 'numeric' && (
        <form
          className="flex flex-wrap items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <label className="flex min-w-[10rem] flex-col gap-1 text-sm font-semibold text-muted">
            התשובה שלי
            <input dir="ltr" inputMode="decimal" autoComplete="off" className={`answer-input ${ui.verdict === 'correct' ? 'answer-ok' : ui.verdict === 'wrong' || ui.verdict === 'invalid' ? 'answer-bad' : ''}`} value={ui.input} onChange={(event) => setUi((current) => ({ ...current, input: event.target.value, verdict: null }))} aria-invalid={ui.verdict === 'wrong' || ui.verdict === 'invalid' ? true : undefined} />
          </label>
          <Button type="submit" variant="primary" icon={<Check size={16} />}>
            בדוק
          </Button>
          <span className="w-full text-xs text-muted">אפשר לכתוב שבר (3/4), שורש (sqrt(2)) ו-pi/6. בתשובה עשרונית מספיקות 2 ספרות אחרי הנקודה.</span>
        </form>
      )}

      {check.kind === 'choice' && (
        <div className="flex flex-col gap-2">
          <div role="radiogroup" aria-label="אפשרויות" className="flex flex-col gap-2">
            {check.options.map((option, index) => (
              <label key={index} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${ui.choice === index ? 'border-primary bg-primary-soft' : 'border-border'}`}>
                <input type="radio" name={key} checked={ui.choice === index} onChange={() => setUi((current) => ({ ...current, choice: index, verdict: null }))} />
                <Markdown inline>{option}</Markdown>
              </label>
            ))}
          </div>
          <div>
            <Button variant="primary" icon={<Check size={16} />} onClick={submit}>
              בדוק
            </Button>
          </div>
        </div>
      )}

      <div className="min-h-[1.25rem] text-sm" aria-live="polite">
        {ui.verdict === 'correct' && <span className="verdict-pop inline-flex items-center gap-1 font-bold text-green"><CircleCheck size={16} /> נכון.</span>}
        {ui.verdict === 'wrong' && <span className="verdict-pop inline-flex items-center gap-1 font-bold text-red"><CircleX size={16} /> לא נכון. התשובה נרשמה ביומן הטעויות. קראו את ההסבר.</span>}
        {ui.verdict === 'invalid' && <span className="font-semibold text-orange">לא הצלחתי לקרוא את המספר. נסו בפורמט אחר.</span>}
        {ui.verdict === 'empty' && <span className="text-muted">כתבו תשובה או בחרו אפשרות לפני הבדיקה.</span>}
      </div>

      <div className="flex flex-col gap-2">
        {section.hints.map((hint, index) => (
          <Collapse key={index} open={index < ui.hints}>
            <div className="hint-box prose mb-1">
              <Lightbulb size={18} className="mt-0.5 shrink-0 text-yellow" aria-hidden="true" />
              <div className="min-w-0 text-base">
                <span className="me-1 text-sm font-bold text-yellow">רמז {index + 1}</span>
                <Markdown inline>{hint}</Markdown>
              </div>
            </div>
          </Collapse>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {ui.hints < section.hints.length && (
          <Button variant="soft" icon={<Lightbulb size={16} />} onClick={() => setUi((current) => ({ ...current, hints: current.hints + 1 }))}>
            רמז ({ui.hints + 1}/{section.hints.length})
          </Button>
        )}
        {!showSolution && (
          <Button icon={<Eye size={16} />} onClick={() => setUi((current) => ({ ...current, revealed: true }))}>
            הצג פתרון
          </Button>
        )}
      </div>

      <Collapse open={showSolution}>
        <div className="prose rounded-2xl border border-border bg-surface-2/60 p-5">
          <div className="answer-box text-base">
            <Markdown inline>{section.short}</Markdown>
          </div>
          <div className="mt-3">
            <Button size="sm" variant="ghost" icon={<ChevronDown size={15} className={ui.expanded ? 'rotate-180' : ''} />} onClick={() => setUi((current) => ({ ...current, expanded: !current.expanded }))} aria-expanded={ui.expanded}>
              {ui.expanded ? 'צמצם' : 'הרחב'}
            </Button>
          </div>
          <Collapse open={ui.expanded}>
            <ol className="steps mt-3 text-base leading-relaxed">
              {section.full.map((step, index) => (
                <li key={index} className="step">
                  <span className="step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="step-body">
                    <Markdown inline>{step}</Markdown>
                  </div>
                </li>
              ))}
            </ol>
          </Collapse>
          <div className="mt-4">
            <ReadAloud id={`${key}:explain`} label="הקרא הסבר ותשובה" text={explanationText} aloud={aloud} rate={rate} />
          </div>
        </div>

        {check.kind === 'self' && (
          <div className="mt-4">
            <div className="mb-2 text-base font-bold">השוו לתשובה שלכם. איך הלך?</div>
            <div className="flex flex-col gap-2 sm:flex-row" role="group" aria-label="הערכה עצמית">
              <button type="button" className="mark-btn mark-green" aria-pressed={outcome === 'correct'} onClick={() => onOutcome('correct')}>
                <CircleCheck size={20} aria-hidden="true" /> צדקתי
              </button>
              <button type="button" className="mark-btn mark-red" aria-pressed={outcome === 'wrong'} onClick={() => onOutcome('wrong')}>
                <CircleX size={20} aria-hidden="true" /> טעיתי
              </button>
            </div>
          </div>
        )}
      </Collapse>
    </Card>
  );
}

export function SetPlayer() {
  const { setId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const set = setById(setId);
  const setsState = useSetsState();
  const { state, actions, notify } = useStore();
  const aloud = useReadAloud();
  const retry = params.get('retry') === '1';
  const progress = set ? setsState.progress[set.id] : undefined;
  // In retry mode the list is fixed when the page opens, so answering correctly does not shift the exercises.
  const retryIds = useMemo(() => {
    if (!set || !retry) return null;
    const results = loadSets().progress[set.id]?.results ?? {};
    const wrong = set.exercises.filter((exercise) => exercise.sections.some((section) => results[`${exercise.id}:${section.label}`] === 'wrong')).map((exercise) => exercise.id);
    return wrong.length ? wrong : null;
  }, [set, retry]);
  const exercises = useMemo(() => (set ? (retryIds ? set.exercises.filter((exercise) => retryIds.includes(exercise.id)) : set.exercises) : []), [set, retryIds]);
  const [index, setIndex] = useState(() => Math.min(progress?.current ?? 0, exercises.length));
  useEffect(() => aloud.stop(), [index, aloud.stop]);

  if (!set) return <NotFound />;
  const rate = setsState.speechRate;
  const results = progress?.results ?? {};
  const finished = index >= exercises.length;
  const exercise = exercises[index];

  const go = (next: number) => {
    setIndex(next);
    setCurrentExercise(set.id, next, next >= exercises.length);
    window.scrollTo({ top: 0 });
  };

  const handleOutcome = (ex: Exercise, section: Section, outcome: SectionOutcome) => {
    recordOutcome(set.id, ex.id, section.label, outcome);
    if (outcome !== 'wrong') return;
    const position = set.exercises.indexOf(ex) + 1;
    const description = `סט «${set.title}», תרגיל ${position} סעיף ${section.label}: ${section.prompt.replace(/\$[^$]*\$/g, '…').slice(0, 80)}`;
    if (state.mistakes.some((mistake) => mistake.description === description)) return;
    actions.addMistake({ questionnaire: set.questionnaire, topicId: ex.topicId, sectionId: `${ex.id}:${section.label}`, type: 'understanding', description, correctApproach: section.short });
    notify('הטעות נרשמה ביומן ונכנסה לתור החזרות');
  };

  const scoreOf = (ex: Exercise) => {
    const correct = ex.sections.filter((section) => results[`${ex.id}:${section.label}`] === 'correct').length;
    return { correct, total: ex.sections.length };
  };

  if (finished) {
    const totals = exercises.map(scoreOf);
    const correct = totals.reduce((sum, entry) => sum + entry.correct, 0);
    const total = totals.reduce((sum, entry) => sum + entry.total, 0);
    const anyWrong = set.exercises.some((ex) => ex.sections.some((section) => results[`${ex.id}:${section.label}`] === 'wrong'));
    const percent = total ? Math.round((correct / total) * 100) : 0;
    return (
      <>
        <PageHeader eyebrow={<Link to="/sets" className="hover:underline">סטים לתרגול</Link>} title={set.title} description="סיימתם את הסט. כך זה הלך:" />
        <Card className="mb-5">
          <div className="mb-4 flex items-center gap-4">
            <ScoreReveal percent={percent} className={`text-4xl font-bold tabular-nums ${percent >= 85 ? 'text-green' : percent >= 55 ? 'text-orange' : 'text-red'}`} />
            <span className="text-muted">
              {correct} מתוך {total} סעיפים נכונים
            </span>
          </div>
          <ol className="grid gap-2 sm:grid-cols-2">
            {exercises.map((ex) => {
              const score = scoreOf(ex);
              const tone = score.correct === score.total ? 'green' : score.correct === 0 ? 'red' : 'orange';
              return (
                <li key={ex.id} className="flex items-center justify-between gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5 text-sm">
                  <span>
                    תרגיל {set.exercises.indexOf(ex) + 1} · <span className="text-muted">{levelLabels[ex.level]}</span>
                  </span>
                  <Badge tone={tone}>
                    {score.correct}/{score.total}
                  </Badge>
                </li>
              );
            })}
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            {anyWrong && (
              <Button
                variant="primary"
                size="lg"
                icon={<RotateCcw size={18} />}
                onClick={() => {
                  resetSet(set.id, true);
                  setIndex(0);
                  navigate(`/sets/${set.id}?retry=1`, { replace: true });
                }}
              >
                תרגל שוב את מה שטעיתי
              </Button>
            )}
            <Button
              size="lg"
              onClick={() => {
                resetSet(set.id);
                setIndex(0);
                navigate(`/sets/${set.id}`, { replace: true });
              }}
            >
              התחל מחדש
            </Button>
            <Button size="lg" variant="ghost" to="/sets">
              לכל הסטים
            </Button>
          </div>
        </Card>
      </>
    );
  }

  const questionText = `${exercise.intro}\n${exercise.sections.map((section) => `סעיף ${section.label}. ${section.prompt}`).join('\n')}`;
  const anyRevealedOrAnswered = exercise.sections.some((section) => results[`${exercise.id}:${section.label}`] !== undefined);

  return (
    <>
      <PageHeader
        eyebrow={
          <Link to="/sets" className="hover:underline">
            סטים לתרגול{retry ? ' · חזרה על הטעויות' : ''}
          </Link>
        }
        title={set.title}
        actions={<SpeedPicker rate={rate} onChange={setSpeechRate} />}
      >
        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="shrink-0 font-semibold">
            תרגיל {index + 1} מתוך {exercises.length}
          </span>
          <ProgressBar percent={Math.round(((index + 1) / exercises.length) * 100)} size="sm" className="flex-1" label={`תרגיל ${index + 1} מתוך ${exercises.length}`} />
        </div>
      </PageHeader>

      <div className="mb-4">
        <NoHebrewVoiceNote aloud={aloud} />
      </div>

      <div className="flex flex-col gap-5">
        <Card>
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge tone={levelTones[exercise.level]}>{levelLabels[exercise.level]}</Badge>
            <Badge>תרגיל {set.exercises.indexOf(exercise) + 1}</Badge>
            <Badge>{exercise.sections.length} סעיפים</Badge>
          </div>
          <div className="prose">
            <Markdown className="text-lg leading-relaxed">{exercise.intro}</Markdown>
          </div>
          <Diagram spec={exercise.diagram} />
          <ReadAloud id={`${set.id}:${exercise.id}:question`} label="הקרא שאלה" text={questionText} aloud={aloud} rate={rate} />
        </Card>

        {exercise.sections.map((section) => (
          <SectionView key={`${exercise.id}:${section.label}`} setId={set.id} exercise={exercise} section={section} outcome={results[`${exercise.id}:${section.label}`]} onOutcome={(outcome) => handleOutcome(exercise, section, outcome)} aloud={aloud} rate={rate} />
        ))}

        {exercise.solutionDiagram && anyRevealedOrAnswered && (
          <Card>
            <h3 className="mb-1 text-base font-bold">שרטוט לפתרון</h3>
            <Diagram spec={exercise.solutionDiagram} caption="שרטוט עם הבנייה של הפתרון" />
          </Card>
        )}

        {!anyRevealedOrAnswered && index < exercises.length - 1 && (
          <Notice tone="primary">אפשר לעבור לתרגיל הבא גם בלי לענות, אבל סעיף שלא נבדק לא נספר בציון.</Notice>
        )}

        <nav className="flex items-center justify-between gap-2" aria-label="מעבר בין תרגילים">
          {index > 0 ? (
            <Button size="lg" icon={<ArrowRight size={18} />} onClick={() => go(index - 1)}>
              הקודם
            </Button>
          ) : (
            <span />
          )}
          <Button size="lg" variant="primary" onClick={() => go(index + 1)}>
            {index < exercises.length - 1 ? 'התרגיל הבא' : 'סיום הסט'} <ArrowLeft size={18} />
          </Button>
        </nav>
      </div>
    </>
  );
}
