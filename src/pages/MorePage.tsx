import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { secondaryNav } from '../components/Layout';
import { PageHeader } from '../components/ui';

export function MorePage() {
  return (
    <>
      <PageHeader title="עוד כלים" description="כל מה שמעבר לסילבוס, לתרגול ולסימולטור." />
      <ul className="flex flex-col gap-2">
        {secondaryNav.map((entry) => (
          <li key={entry.to}>
            <Link to={entry.to} className="card flex items-center gap-3 p-4 transition hover:border-primary">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <entry.icon size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{entry.label}</span>
                {entry.description && <span className="block text-sm text-muted">{entry.description}</span>}
              </span>
              <ChevronLeft size={18} className="text-muted" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
