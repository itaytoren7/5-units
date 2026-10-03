import { useEffect, useId, useState } from 'react';
import { CheckCircle2, CircleHelp, XCircle } from 'lucide-react';
import type { NumericAnswer } from '@/data/lessons/types';
import { checkAnswer, type CheckOutcome } from '../lib/answerCheck';
import { Markdown } from './Markdown';
import { Button } from './ui';

interface AnswerCheckProps {
  answers: NumericAnswer[];
  /** Changes when the exercise changes, to clear the inputs. */
  resetKey: string;
  /** Called after every check with whether all answers were right and how many checks were made. */
  onChecked?: (allCorrect: boolean, attempt: number) => void;
}

/** Type the result, press "בדיקה": the site checks each number (fractions, roots and π are understood). */
export function AnswerCheck({ answers, resetKey, onChecked }: AnswerCheckProps) {
  const baseId = useId();
  const [values, setValues] = useState<string[]>(() => answers.map(() => ''));
  const [outcomes, setOutcomes] = useState<CheckOutcome[] | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setValues(answers.map(() => ''));
    setOutcomes(null);
    setAttempts(0);
  }, [resetKey, answers.length]);

  const check = () => {
    const next = answers.map((answer, index) => checkAnswer(values[index] ?? '', answer.value, answer.tolerance));
    if (next.every((outcome) => outcome === 'empty')) {
      setOutcomes(next);
      return;
    }
    const attempt = attempts + 1;
    setAttempts(attempt);
    setOutcomes(next);
    onChecked?.(next.every((outcome) => outcome === 'correct'), attempt);
  };

  const allCorrect = outcomes?.every((outcome) => outcome === 'correct') ?? false;
  const anyWrong = outcomes?.some((outcome) => outcome === 'wrong') ?? false;

  return (
    <form
      className="answer-check"
      onSubmit={(event) => {
        event.preventDefault();
        check();
      }}
    >
      <div className="flex flex-wrap items-end gap-3">
        {answers.map((answer, index) => {
          const outcome = outcomes?.[index];
          const id = `${baseId}-${index}`;
          return (
            <div key={index} className="flex min-w-[9rem] flex-col gap-1">
              <label htmlFor={id} className="text-sm font-semibold text-muted">
                <Markdown inline>{answer.label}</Markdown>
              </label>
              <div className="relative">
                <input
                  id={id}
                  dir="ltr"
                  inputMode="decimal"
                  autoComplete="off"
                  spellCheck={false}
                  className={`answer-input ${outcome === 'correct' ? 'answer-ok' : outcome === 'wrong' || outcome === 'invalid' ? 'answer-bad' : ''}`}
                  value={values[index] ?? ''}
                  aria-invalid={outcome === 'wrong' || outcome === 'invalid' ? true : undefined}
                  onChange={(event) => {
                    const next = [...values];
                    next[index] = event.target.value;
                    setValues(next);
                  }}
                />
                {outcome === 'correct' && <CheckCircle2 size={18} className="answer-mark text-green" aria-label="נכון" />}
                {(outcome === 'wrong' || outcome === 'invalid') && <XCircle size={18} className="answer-mark text-red" aria-label="לא נכון" />}
              </div>
            </div>
          );
        })}
        <Button type="submit" variant={allCorrect ? 'secondary' : 'primary'}>
          בדיקה
        </Button>
      </div>
      <div className="mt-2 min-h-[1.25rem] text-sm" aria-live="polite">
        {outcomes === null ? (
          <span className="answer-hint text-muted">
            <CircleHelp size={14} aria-hidden="true" className="me-1 inline align-[-2px]" />
            אפשר לכתוב שבר, שורש ו-π. למשל: <code dir="ltr">3/4</code> <code dir="ltr">√3</code> <code dir="ltr">sqrt(3)/2</code> <code dir="ltr">π/6</code>. בתשובה עשרונית מספיקות 2 ספרות אחרי הנקודה.
          </span>
        ) : allCorrect ? (
          <span className="font-semibold text-green">נכון. {attempts > 1 ? 'לקח כמה ניסיונות, אבל הגעתם לבד.' : 'ככה עובדים.'}</span>
        ) : outcomes.every((outcome) => outcome === 'empty') ? (
          <span className="text-muted">כתבו תשובה לפני שבודקים.</span>
        ) : outcomes.some((outcome) => outcome === 'invalid') && !anyWrong ? (
          <span className="font-semibold text-orange">לא הצלחתי לקרוא את המספר. נסו בפורמט אחר.</span>
        ) : attempts >= 2 ? (
          <span className="font-semibold text-red">טעות שנייה. עכשיו רמז, לא פתרון.</span>
        ) : (
          <span className="font-semibold text-red">לא נכון. בדקו את החישוב שוב לפני שפותחים רמז.</span>
        )}
      </div>
    </form>
  );
}
