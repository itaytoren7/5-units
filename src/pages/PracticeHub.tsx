import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PencilLine, Shuffle } from 'lucide-react';
import { problemsFor } from '@/data/problems';
import type { QuestionnaireCode } from '@/data/problems/types';
import { ProblemCard } from '../components/ProblemCard';
import { PriorityBadge } from '../components/StatusBadge';
import { Button, EmptyState, PageHeader, Segmented, Stat } from '../components/ui';
import { isQuestionnaireCode, questionnaireByCode, questionnaireList } from '../lib/questionnaires';
import { problemStatus, type ProblemStatus } from '../lib/selectors';
import { useStore } from '../state/store';

type StatusFilter = 'all' | ProblemStatus;

export function PracticeHub() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { state } = useStore();
  const code: QuestionnaireCode = isQuestionnaireCode(params.get('code') ?? undefined) ? (params.get('code') as QuestionnaireCode) : '35581';
  const slotParam = params.get('slot') ?? 'all';
  const statusParam = (params.get('status') ?? 'all') as StatusFilter;
  const questionnaire = questionnaireByCode(code)!;

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === 'all' || !value) next.delete(key);
    else next.set(key, value);
    if (key === 'code') next.delete('slot');
    setParams(next, { replace: true });
  };

  const all = useMemo(() => problemsFor(code), [code]);
  const filtered = all.filter((problem) => (slotParam === 'all' || String(problem.slot) === slotParam) && (statusParam === 'all' || problemStatus(problem, state) === statusParam));
  const slotsWithProblems = questionnaire.slots.filter((slot) => all.some((problem) => problem.slot === slot.number));
  const counts = {
    practiced: all.filter((problem) => problemStatus(problem, state) !== 'new').length,
    review: all.filter((problem) => problemStatus(problem, state) === 'needs-review').length,
    done: all.filter((problem) => problemStatus(problem, state) === 'done').length,
  };

  const random = () => {
    const pool = filtered.length ? filtered : all;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/practice/${pick.id}`);
  };

  return (
    <>
      <PageHeader
        title="תרגול"
        description="תרגילים בסגנון בגרות, רק על החומר שבמיקוד. כל תרגיל: רמזים בהדרגה, פתרון מלא, והערכה עצמית לכל סעיף."
        actions={
          <Button variant="primary" icon={<Shuffle size={16} />} onClick={random} disabled={!all.length}>
            תרגיל אקראי
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3">
        <Segmented label="שאלון" value={code} onChange={(next) => setParam('code', next)} options={questionnaireList.map((entry) => ({ value: entry.code, label: `שאלון ${entry.nickname}` }))} />
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            label="שאלה"
            value={slotParam}
            onChange={(next) => setParam('slot', next)}
            options={[{ value: 'all', label: 'כל השאלות' }, ...slotsWithProblems.map((slot) => ({ value: String(slot.number), label: `שאלה ${slot.number}`, title: slot.title }))]}
          />
          <Segmented
            label="סטטוס"
            value={statusParam}
            onChange={(next) => setParam('status', next)}
            options={[
              { value: 'all', label: 'הכול' },
              { value: 'new', label: 'לא תורגל' },
              { value: 'needs-review', label: 'לחזור' },
              { value: 'done', label: 'הושלם' },
            ]}
          />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2">
        <Stat label="תרגילים במאגר" value={all.length} />
        <Stat label="תרגלת" value={counts.practiced} tone="primary" />
        <Stat label="לחזור" value={counts.review} tone={counts.review ? 'red' : 'neutral'} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<PencilLine size={20} />} title="אין תרגילים בסינון הזה" description="נסו סינון אחר, או חזרו לכל השאלות." />
      ) : (
        <div className="flex flex-col gap-6">
          {questionnaire.slots
            .filter((slot) => filtered.some((problem) => problem.slot === slot.number))
            .map((slot) => (
              <section key={slot.number}>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-extrabold ${slot.priority === 'yellow' ? 'bg-yellow-soft text-yellow' : 'bg-blue-soft text-blue'}`}>{slot.number}</span>
                  <h2 className="font-bold">{slot.title}</h2>
                  <PriorityBadge priority={slot.priority} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {filtered
                    .filter((problem) => problem.slot === slot.number)
                    .map((problem) => (
                      <ProblemCard key={problem.id} problem={problem} showSlot={false} />
                    ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </>
  );
}
