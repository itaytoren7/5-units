import { Check } from 'lucide-react';
import type { Priority, Status } from '@/data/syllabus/types';
import { Badge } from './ui';

export const statusLabels: Record<Status, string> = { in: 'בבגרות', 'out-original': 'לא בבגרות', 'out-2026': 'הורדה 2026' };

export function StatusBadge({ status }: { status: Status }) {
  const tone = status === 'in' ? 'green' : status === 'out-2026' ? 'orange' : 'red';
  return <Badge tone={tone}>{statusLabels[status]}</Badge>;
}

export function KeptBadge() {
  return (
    <Badge tone="green" title="המיקוד מציין במפורש שהנושא נשאר">
      <Check size={12} /> נשאר במפורש
    </Badge>
  );
}

export function PriorityBadge({ priority, short = false }: { priority: Priority; short?: boolean }) {
  if (priority === 'yellow') return <Badge tone="yellow">{short ? 'צהוב' : 'ללמוד קודם'}</Badge>;
  return <Badge tone="blue">{short ? 'כחול' : 'ללמוד בסוף'}</Badge>;
}

export function StatusDot({ status }: { status: Status }) {
  const color = status === 'in' ? 'var(--green)' : status === 'out-2026' ? 'var(--orange)' : 'var(--red)';
  return <span className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />;
}
