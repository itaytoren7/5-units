import { useEffect, useState } from 'react';

/** Tracks which of the given section ids is currently in view, for a table of contents. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = ids.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    if (elements.length === 0) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
        setActive(top);
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: [0, 1] },
    );
    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
