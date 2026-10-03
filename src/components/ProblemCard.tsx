import { Link } from 'react-router-dom';
import { ChevronLeft, CircleAlert, CircleCheck, Clock } from 'lucide-react';
import type { Problem } from '@/data/problems/types';
import { problemStatus, problemStatusLabels } from '../lib/selectors';
import { useStore } from '../state/store';
import { Badge } from './ui';

const difficultyLabels: Record<Problem['difficulty'], string> = { 1: 'קל', 2: 'בינוני', 3: 'מאתגר' };

export function DifficultyBadge({ difficulty }: { difficulty: Problem['difficulty'] }) {
  return (
    <Badge tone={difficulty === 3 ? 'red' : difficulty === 2 ? 'orange' : 'green'} title="רמת קושי">
      <span aria-hidden="true" className="tracking-tight">
        {'●'.repeat(difficulty)}
        {'○'.repeat(3 - difficulty)}
      </span>{' '}
      {difficultyLabels[difficulty]}
    </Badge>
  );
}

export function VerifiedBadge({ problem }: { problem: Problem }) {
  const { state } = useStore();
  const verified = problem.verified || state.verifiedProblems[problem.id];
  return verified ? (
    <Badge tone="green" icon={<CircleCheck size={13} />}>
      בדקתי
    </Badge>
  ) : (
    <Badge tone="orange" icon={<CircleAlert size={13} />} title="פתרון שנוצר אוטומטית — יש לבדוק לפני שמסתמכים עליו">
      ⚠ לא נבדק
    </Badge>
  );
}

export function ProblemCard({ problem, showSlot = true }: { problem: Problem; showSlot?: boolean }) {
  const { state } = useStore();
  const status = problemStatus(problem, state);
  const statusTone = status === 'done' ? 'green' : status === 'needs-review' ? 'red' : status === 'in-progress' ? 'blue' : 'neutral';
  return (
    <Link to={`/practice/${problem.id}`} className="card card-hover flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug">{problem.title}</h3>
        <Badge tone={statusTone}>{problemStatusLabels[status]}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {showSlot && <Badge tone="primary">שאלה {problem.slot}</Badge>}
        {problem.source === 'open-source' && <Badge tone="blue">בגרות עבר</Badge>}
        <DifficultyBadge difficulty={problem.difficulty} />
        <VerifiedBadge problem={problem} />
      </div>
      <div className="flex items-center justify-between gap-2 text-sm text-muted">
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} /> ~{problem.estimatedMinutes} דק׳
          </span>
          <span>{problem.sections.length} סעיפים</span>
        </span>
        <ChevronLeft size={18} aria-hidden="true" />
      </div>
    </Link>
  );
}
