import { useState } from 'react';
import { formatShortDate } from '../lib/dates';
import { formatScore } from '../lib/format';
import type { ExamRecord } from '../state/types';

/** Single-series score-over-time line chart (0–100) with hover tooltip and a hidden table for screen readers. */
export function ScoreChart({ exams }: { exams: ExamRecord[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const points = [...exams].sort((a, b) => a.finishedAt.localeCompare(b.finishedAt));
  if (points.length === 0) return null;
  const width = 560;
  const height = 200;
  const pad = { top: 14, right: 16, bottom: 26, left: 34 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const x = (index: number) => pad.left + (points.length === 1 ? innerW / 2 : (index / (points.length - 1)) * innerW);
  const y = (score: number) => pad.top + (1 - score / 100) * innerH;
  const path = points.map((exam, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)},${y(exam.score).toFixed(1)}`).join(' ');
  const active = hover !== null ? points[hover] : null;

  return (
    <div className="relative" dir="ltr">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="ציוני הסימולציות לאורך זמן">
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke="var(--border)" strokeWidth={1} />
            <text x={pad.left - 8} y={y(tick) + 4} textAnchor="end" fontSize={11} fill="var(--muted)">
              {tick}
            </text>
          </g>
        ))}
        <path d={path} fill="none" stroke="var(--primary)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((exam, index) => (
          <g key={exam.id}>
            <circle cx={x(index)} cy={y(exam.score)} r={hover === index ? 6 : 4.5} fill="var(--primary)" stroke="var(--surface)" strokeWidth={2} />
            <rect x={x(index) - 16} y={pad.top} width={32} height={innerH} fill="transparent" onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(index)} onBlur={() => setHover(null)} tabIndex={0} aria-label={`${formatShortDate(exam.finishedAt.slice(0, 10))}: ${formatScore(exam.score)}`} />
          </g>
        ))}
        {points.length > 1 && (
          <>
            <text x={x(0)} y={height - 6} textAnchor="start" fontSize={11} fill="var(--muted)">
              {formatShortDate(points[0].finishedAt.slice(0, 10))}
            </text>
            <text x={x(points.length - 1)} y={height - 6} textAnchor="end" fontSize={11} fill="var(--muted)">
              {formatShortDate(points[points.length - 1].finishedAt.slice(0, 10))}
            </text>
          </>
        )}
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={pad.top} y2={pad.top + innerH} stroke="var(--muted)" strokeDasharray="3 3" pointerEvents="none" />}
      </svg>
      {active && hover !== null && (
        <div className="pointer-events-none absolute rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs shadow-card" style={{ left: `${(x(hover) / width) * 100}%`, top: 0, transform: 'translateX(-50%)' }} dir="rtl">
          <b className="block text-sm">{formatScore(active.score)}</b>
          <span className="text-muted">{formatShortDate(active.finishedAt.slice(0, 10))} · {active.chosenSlots.length} שאלות</span>
        </div>
      )}
      <table className="sr-only">
        <caption>ציוני סימולציות</caption>
        <tbody>
          {points.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.finishedAt.slice(0, 10)}</td>
              <td>{formatScore(exam.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
