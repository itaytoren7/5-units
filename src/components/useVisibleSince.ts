import { useCallback, useEffect, useRef } from 'react';

/**
 * Remembers when an element first became (mostly) visible, so "time on task" starts when the
 * student actually reaches an exercise, not when the page loaded.
 */
export function useVisibleSince<T extends Element>(resetKey: string) {
  const ref = useRef<T | null>(null);
  const since = useRef<number | null>(null);

  useEffect(() => {
    since.current = null;
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      since.current = Date.now();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (since.current === null && entries.some((entry) => entry.isIntersecting)) {
          since.current = Date.now();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [resetKey]);

  const secondsVisible = useCallback(() => (since.current === null ? 0 : (Date.now() - since.current) / 1000), []);
  return { ref, secondsVisible };
}
