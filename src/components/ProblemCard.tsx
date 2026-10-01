import { Link } from 'react-router-dom';
import { CircleAlert, CircleCheck, Clock } from 'lucide-react';
import type { Problem } from '@/data/problems/types';
import { problemStatus, problemStatusLabels } from '../lib/selectors';
import { useStore } from '../state/store';
import { Badge } from './ui';

const difficultyLabels: Record<Problem['difficulty'], string> = { 1: 'קל', 2: 'בינוני', 3: 'מאתגר' };

export function DifficultyBadge({ difficulty }: { difficulty: Problem['difficulty'] }) {
  return (
    <Badge tone={difficulty === 3 ? 'red' : difficulty === 2 ? 'orange' : 'green'} title="רמת קושי">
      {'●'.repeat(difficulty)}
      {'○'.repeat(3 - difficulty)} {difficultyLabels[difficulty]}
    </Badge>
  );
}

export function VerifiedBadge({ problem }: { problem: Problem }) {
  const { state } = useStore();
  const verified = problem.verified || state.verifiedProblems[problem.id];
  return verified ? (
    <Badge tone="green">
      <CircleCheck size={12} /> בדקתי
    </Badge>
  ) : (
    <Badge tone="orange" title="פתרון שנוצר אוטומטית — יש לבדוק לפני שמסתמכים עליו">
      <CircleAlert size={12} /> לא נבדק
    </Badge>
  );
}

export function ProblemCard({ problem, showSlot = true }: { problem: Problem; showSlot?: boolean }) {
  const { state } = useStore();
  const status = problemStatus(problem, state);
  const statusTone = status === 'done' ? 'green' : status === 'needs-review' ? 'red' : status === 'in-progress' ? 'blue' : 'neutral';
  return (
    <Link to={`/practice/${problem.id}`} className="card flex flex-col gap-2 p-4 transition hover:border-primary">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold leading-snug">{problem.title}</h3>
        <Badge tone={statusTone}>{problemStatusLabels[status]}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {showSlot && <Badge tone="primary">שאלה {problem.slot}</Badge>}
        <DifficultyBadge difficulty={problem.difficulty} />
        <VerifiedBadge problem={problem} />
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> ~{problem.estimatedMinutes} דק׳
        </span>
        <span>{problem.sections.length} סעיפים</span>
      </div>
    </Link>
  );
}
