import { useState } from 'react';
import { formatShortDate } from '../lib/dates';
import { formatScore } from '../lib/format';
import type { ExamRecord } from '../state/types';

/** Single-series score-over-time line (0–100): thin line, round markers, crosshair + tooltip on hover, and a visually hidden table. */
export function ScoreChart({ exams }: { exams: ExamRecord[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const points = [...exams].sort((a, b) => a.finishedAt.localeCompare(b.finishedAt));
  if (points.length === 0) return null;
  const width = 640;
  const height = 240;
  const pad = { top: 18, right: 20, bottom: 30, left: 40 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const x = (index: number) => pad.left + (points.length === 1 ? innerW / 2 : (index / (points.length - 1)) * innerW);
  const y = (score: number) => pad.top + (1 - score / 100) * innerH;
  const path = points.map((exam, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)},${y(exam.score).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${(pad.top + innerH).toFixed(1)} L${x(0).toFixed(1)},${(pad.top + innerH).toFixed(1)} Z`;
  const active = hover !== null ? points[hover] : null;
  const last = points[points.length - 1];

  return (
    <div className="relative" dir="ltr">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="ציוני הסימולציות לאורך זמן">
        <defs>
          <linearGradient id="score-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke="var(--border)" strokeWidth={1} />
            <text x={pad.left - 10} y={y(tick) + 4} textAnchor="end" fontSize={12} fill="var(--muted)" fontFamily="inherit">
              {tick}
            </text>
          </g>
        ))}
        {points.length > 1 && <path d={area} fill="url(#score-area)" />}
        <path d={path} fill="none" stroke="var(--primary)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((exam, index) => (
          <g key={exam.id}>
            <circle cx={x(index)} cy={y(exam.score)} r={hover === index ? 7 : 5} fill="var(--primary)" stroke="var(--surface)" strokeWidth={2} style={{ transition: 'r 150ms' }} />
            <rect
              x={x(index) - Math.max(16, innerW / points.length / 2)}
              y={pad.top}
              width={Math.max(32, innerW / points.length)}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(index)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              aria-label={`${formatShortDate(exam.finishedAt.slice(0, 10))}: ${formatScore(exam.score)}`}
            />
          </g>
        ))}
        {hover === null && (
          <text x={x(points.length - 1)} y={y(last.score) - 12} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--text)" fontFamily="inherit">
            {formatScore(last.score)}
          </text>
        )}
        {points.length > 1 && (
          <>
            <text x={x(0)} y={height - 8} textAnchor="start" fontSize={12} fill="var(--muted)" fontFamily="inherit">
              {formatShortDate(points[0].finishedAt.slice(0, 10))}
            </text>
            <text x={x(points.length - 1)} y={height - 8} textAnchor="end" fontSize={12} fill="var(--muted)" fontFamily="inherit">
              {formatShortDate(last.finishedAt.slice(0, 10))}
            </text>
          </>
        )}
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={pad.top} y2={pad.top + innerH} stroke="var(--muted)" strokeDasharray="4 4" pointerEvents="none" />}
      </svg>
      {active && hover !== null && (
        <div className="pointer-events-none absolute rounded-xl border border-border bg-surface px-3 py-2 text-sm shadow-md" style={{ left: `${(x(hover) / width) * 100}%`, top: 0, transform: 'translateX(-50%)' }} dir="rtl">
          <b className="block text-lg tabular-nums">{formatScore(active.score)}</b>
          <span className="text-muted">
            {formatShortDate(active.finishedAt.slice(0, 10))} · {active.chosenSlots.length} שאלות
          </span>
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
