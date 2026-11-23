import { useEffect, useRef } from 'react';
import { celebrate, useCountUp } from './motion';

/** A whole number that counts up to its value when it appears or changes. */
export function CountUp({ value, duration }: { value: number; duration?: number }) {
  return <>{useCountUp(value, duration)}</>;
}

/** A final score: counts up, and celebrates a result of 85% or more. */
export function ScoreReveal({ percent, className = '' }: { percent: number; className?: string }) {
  const shown = useCountUp(percent, 1100);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (percent < 85) return;
    const box = ref.current?.getBoundingClientRect();
    const timer = window.setTimeout(() => celebrate(box ? { x: box.left + box.width / 2, y: box.top + box.height / 2 } : undefined), 500);
    return () => window.clearTimeout(timer);
    // Once, when the result first shows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span ref={ref} className={className}>
      {shown}%
    </span>
  );
}
