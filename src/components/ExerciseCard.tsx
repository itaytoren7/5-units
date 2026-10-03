import { useEffect, useState, type ReactNode } from 'react';
import { Check, CircleCheck, CircleX, Eye, Flag, Lightbulb, MinusCircle } from 'lucide-react';
import type { NumericAnswer } from '@/data/lessons/types';
import type { QuestionnaireCode } from '@/data/problems/types';
import { useMotivation } from '../motivation/store';
import { useStore } from '../state/store';
import type { SectionResult } from '../state/types';
import { AnswerCheck } from './AnswerCheck';
import { Figure } from './Figure';
import { Markdown } from './Markdown';
import { MistakeForm } from './MistakeForm';
import { Badge, Button, Collapse } from './ui';
import { useVisibleSince } from './useVisibleSince';

export const resultLabels: Record<SectionResult, string> = { correct: 'צדקתי', partial: 'חלקית', wrong: 'טעיתי' };
export const resultTone: Record<SectionResult, 'green' | 'orange' | 'red'> = { correct: 'green', partial: 'orange', wrong: 'red' };
const resultIcon: Record<SectionResult, typeof Check> = { correct: CircleCheck, partial: MinusCircle, wrong: CircleX };

export interface ExerciseCardProps {
  /** Unique id: used for the anchor (#ex-<id>), saved progress and the mistakes log. */
  id: string;
  heading: ReactNode;
  badges?: ReactNode;
  statement: string;
  figureSvg?: string;
  hints: string[];
  solutionSteps: string[];
  finalAnswer: string;
  answers?: NumericAnswer[];
  footer?: ReactNode;
  questionnaire: QuestionnaireCode;
  topicId: string;
  /** Recorded result (undefined when not practised yet). */
  result?: SectionResult;
  onResult: (result: SectionResult) => void;
  /** Generated exercises have no stable id, so they cannot be logged as mistakes. */
  allowMistakeLog?: boolean;
  /** Extra actions under the solution (e.g. "תרגיל חדש"). */
  actions?: ReactNode;
}

/** One exercise: statement → automatic check → hints → hidden solution → honest self-marking. */
export function ExerciseCard(props: ExerciseCardProps) {
  const { id, heading, badges, statement, figureSvg, hints, solutionSteps, finalAnswer, answers, footer, questionnaire, topicId, result, onResult, allowMistakeLog = true, actions: extraActions } = props;
  const { actions, notify } = useStore();
  const { reportSolutionOpened } = useMotivation();
  const { ref, secondsVisible } = useVisibleSince<HTMLElement>(id);
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionShown, setSolutionShown] = useState(false);
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    setHintsShown(0);
    setSolutionShown(false);
    setLogging(false);
  }, [id]);

  const mark = (next: SectionResult) => {
    onResult(next);
    if (next === 'wrong') {
      if (allowMistakeLog) setLogging(true);
      else notify('נרשם. תרגיל חדש, ואותה טעות לא חוזרת.');
    } else notify(next === 'correct' ? 'נשמר.' : 'נשמר. "חלקית" זה עדיין לא נכון, תחזרו לזה.');
  };

  const openSolution = () => {
    setSolutionShown(true);
    reportSolutionOpened(secondsVisible(), hintsShown);
  };

  return (
    <article ref={ref} id={`ex-${id}`} className="card exercise-card scroll-mt-24">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{heading}</h3>
        <div className="flex flex-wrap items-center gap-1.5">
          {badges}
          {result && <Badge tone={resultTone[result]}>{resultLabels[result]}</Badge>}
        </div>
      </header>

      <div className="prose">
        <Markdown className="text-lg leading-relaxed">{statement}</Markdown>
      </div>
      {figureSvg && (
        <div className="mt-4">
          <Figure svg={figureSvg} caption="שרטוט" />
        </div>
      )}

      {answers && answers.length > 0 && (
        <AnswerCheck
          answers={answers}
          resetKey={id}
          onChecked={(allCorrect) => {
            if (allCorrect && result !== 'correct') onResult('correct');
          }}
        />
      )}

      <div className="mt-4 flex flex-col gap-2">
        {hints.map((hint, hintIndex) => (
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
        {hintsShown < hints.length && (
          <Button variant="soft" icon={<Lightbulb size={16} />} onClick={() => setHintsShown(hintsShown + 1)}>
            רמז ({hintsShown + 1}/{hints.length})
          </Button>
        )}
        {!solutionShown && (
          <Button icon={<Eye size={16} />} onClick={openSolution}>
            הצג פתרון
          </Button>
        )}
        {extraActions}
      </div>

      <Collapse open={solutionShown}>
        <div className="prose mt-5 rounded-2xl border border-border bg-surface-2/60 p-5">
          <h4 className="mb-4 text-base font-bold">פתרון</h4>
          <ol className="steps text-base leading-relaxed">
            {solutionSteps.map((step, stepIndex) => (
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
            <b className="text-green">תשובה: </b>
            <Markdown inline>{finalAnswer}</Markdown>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 text-base font-bold">איך הלך? תהיו כנים.</div>
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
          {allowMistakeLog && result === 'wrong' && !logging && (
            <div className="mt-3">
              <Button size="sm" variant="ghost" icon={<Flag size={15} />} onClick={() => setLogging(true)}>
                לרשום ביומן הטעויות
              </Button>
            </div>
          )}
        </div>

        {allowMistakeLog && (
          <Collapse open={logging}>
            <div className="mt-4 rounded-2xl border border-border p-5">
              <h4 className="text-base font-bold">מה השתבש?</h4>
              <p className="mb-4 text-sm text-muted">הטעות תיכנס לתור החזרות (אחרי יום, 3 ימים, שבוע ושבועיים) ותופיע בעמוד הראשי.</p>
              {logging && (
                <MistakeForm
                  lockQuestionnaire
                  initial={{ questionnaire, topicId, problemId: id, sectionId: id, type: 'understanding' }}
                  onSave={(draft) => {
                    actions.addMistake(draft);
                    setLogging(false);
                    notify('נרשם ביומן ונכנס לתור החזרות');
                  }}
                  onCancel={() => setLogging(false)}
                />
              )}
            </div>
          </Collapse>
        )}
      </Collapse>

      {footer && <div className="mt-4 border-t border-border pt-3 text-xs text-muted">{footer}</div>}
    </article>
  );
}
