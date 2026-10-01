import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';
import type { Questionnaire, Subtopic, Topic } from '@/data/syllabus/types';
import { Markdown } from './Markdown';
import { RatingControl } from './RatingControl';
import { KeptBadge, StatusBadge, StatusDot } from './StatusBadge';
import { ratingOf, topicProgress } from '../lib/progress';
import { useStore } from '../state/store';
import { ProgressBar } from './ui';

function SubtopicRow({ subtopic }: { subtopic: Subtopic }) {
  const { state, actions } = useStore();
  const rating = ratingOf(state.ratings, subtopic.id);
  return (
    <li className="flex flex-col gap-2 border-t border-border py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="flex min-w-0 items-start gap-2">
        <StatusDot status="in" />
        <div className="min-w-0 text-sm leading-relaxed">
          <Markdown inline>{subtopic.title}</Markdown>
          {subtopic.note && (
            <div className="mt-0.5 text-xs text-muted">
              <Markdown inline>{subtopic.note}</Markdown>
            </div>
          )}
          {subtopic.keptExplicitly && (
            <div className="mt-1">
              <KeptBadge />
            </div>
          )}
        </div>
      </div>
      <div className="shrink-0 sm:pt-0.5">
        <RatingControl value={rating} onChange={(next) => actions.setRating(subtopic.id, next)} label={subtopic.title} />
      </div>
    </li>
  );
}

function OutRow({ subtopic }: { subtopic: Subtopic }) {
  return (
    <li className="flex items-start gap-2 border-t border-border py-2.5 text-sm text-muted">
      <StatusDot status={subtopic.status} />
      <div className="min-w-0 flex-1">
        <Markdown inline>{subtopic.title}</Markdown>
        {subtopic.note && (
          <div className="mt-0.5 text-xs">
            <Markdown inline>{subtopic.note}</Markdown>
          </div>
        )}
      </div>
      <StatusBadge status={subtopic.status} />
    </li>
  );
}

export function SyllabusTopic({ questionnaire, topic, defaultOpen = true }: { questionnaire: Questionnaire; topic: Topic; defaultOpen?: boolean }) {
  const { state } = useStore();
  const [open, setOpen] = useState(defaultOpen);
  const fullMode = state.focusMode === 'full';
  const included = topic.subtopics.filter((subtopic) => subtopic.status === 'in');
  const excluded = topic.subtopics.filter((subtopic) => subtopic.status !== 'in');
  const progress = topicProgress(topic, state.ratings);
  return (
    <div className="py-2">
      <div className="flex items-center gap-2">
        <button type="button" className="flex min-w-0 flex-1 items-center gap-2 py-1.5 text-start font-bold" aria-expanded={open} onClick={() => setOpen(!open)}>
          <ChevronDown size={16} className={`shrink-0 text-muted transition ${open ? '' : '-rotate-90'}`} aria-hidden="true" />
          <span className="min-w-0 flex-1">{topic.title}</span>
          {included.length > 0 && <span className="text-xs font-semibold text-muted">{progress.percent}%</span>}
        </button>
        <Link to={`/topic/${questionnaire.code}/${topic.id}`} className="badge bg-primary-soft text-primary" title="תקציר, דוגמאות ותרגול">
          לעמוד הנושא <ExternalLink size={11} />
        </Link>
      </div>
      {included.length > 0 && <ProgressBar percent={progress.percent} className="mb-1" />}
      {topic.note && (
        <div className="mb-1 mt-1 text-xs text-muted">
          <Markdown inline>{topic.note}</Markdown>
        </div>
      )}
      {open && (
        <ul className="m-0 list-none p-0">
          {included.map((subtopic) => (
            <SubtopicRow key={subtopic.id} subtopic={subtopic} />
          ))}
          {included.length === 0 && <li className="border-t border-border py-3 text-sm text-muted">כל תתי-הנושאים כאן הוצאו מהבחינה.</li>}
          {excluded.length > 0 &&
            (fullMode ? (
              excluded.map((subtopic) => <OutRow key={subtopic.id} subtopic={subtopic} />)
            ) : (
              <li className="border-t border-border">
                <details>
                  <summary className="flex items-center gap-2 py-2.5 text-sm text-muted">
                    <ChevronDown size={14} aria-hidden="true" />
                    לא בבגרות · {excluded.length} {excluded.length === 1 ? 'נושא' : 'נושאים'}
                  </summary>
                  <ul className="m-0 list-none p-0 ps-4">
                    {excluded.map((subtopic) => (
                      <OutRow key={subtopic.id} subtopic={subtopic} />
                    ))}
                  </ul>
                </details>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
