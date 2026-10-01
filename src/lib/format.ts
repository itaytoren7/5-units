export function formatPoints(points: number): string {
  if (Math.abs(points - 100 / 3) < 1e-9) return '33⅓';
  if (Number.isInteger(points)) return String(points);
  return points.toFixed(1);
}

export function formatHours(hours: number): string {
  if (hours === 1) return 'שעה';
  if (hours === 2) return 'שעתיים';
  return `${hours} שעות`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours && rest) return `${formatHours(hours)} ו-${rest} דק׳`;
  if (hours) return formatHours(hours);
  return `${rest} דק׳`;
}

export function formatMinutesShort(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours && rest) return `${hours}:${String(rest).padStart(2, '0')} ש׳`;
  if (hours) return `${hours} ש׳`;
  return `${rest} דק׳`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}
