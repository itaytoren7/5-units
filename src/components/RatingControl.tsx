import type { Rating } from '@/data/syllabus/types';
import { ratingLabels, ratingOrder } from '../lib/progress';

const ratingColor: Record<Rating, string> = {
  'not-started': 'var(--muted)',
  weak: 'var(--red)',
  medium: 'var(--orange)',
  mastered: 'var(--green)',
};

export function RatingControl({ value, onChange, label }: { value: Rating; onChange: (rating: Rating) => void; label: string }) {
  return (
    <div className="seg" role="radiogroup" aria-label={`רמת שליטה: ${label}`}>
      {ratingOrder.map((rating) => (
        <button key={rating} type="button" role="radio" aria-checked={value === rating} onClick={() => onChange(rating)} className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: ratingColor[rating] }} aria-hidden="true" />
          {ratingLabels[rating]}
        </button>
      ))}
    </div>
  );
}

export function RatingDot({ rating }: { rating: Rating }) {
  return <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: ratingColor[rating] }} title={ratingLabels[rating]} aria-label={ratingLabels[rating]} />;
}
