import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/** The student's "reduce animations" switch (Settings) or the system preference. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return document.documentElement.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ------------------------------------------------------------------ */
/* Page entrance: what is on screen cascades in; what is below the     */
/* fold fades up the first time it is scrolled into view.              */
/* ------------------------------------------------------------------ */

const STAGGER_MS = 45;
const MAX_STAGGERED = 7;

/**
 * Marks the direct children of the page container. Everything is done with attributes that CSS
 * reads, so if this hook never runs (or motion is reduced) the page is simply visible.
 */
export function usePageMotion(ref: RefObject<HTMLElement | null>, key: string, enabled = true) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !enabled || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;

    const seen = new WeakSet<Element>();
    const timers: number[] = [];
    let index = 0;

    const show = (element: Element) => {
      element.setAttribute('data-reveal', 'shown');
      timers.push(window.setTimeout(() => element.removeAttribute('data-reveal'), 600));
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          show(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px' },
    );

    const process = () => {
      for (const child of Array.from(root.children)) {
        if (seen.has(child) || !(child instanceof HTMLElement)) continue;
        seen.add(child);
        // Not rendered right now (print-only blocks, hidden panels): leave it alone.
        if (child.getClientRects().length === 0) continue;
        if (child.getBoundingClientRect().top < window.innerHeight * 0.94) {
          child.style.setProperty('--enter-delay', `${Math.min(index, MAX_STAGGERED) * STAGGER_MS}ms`);
          child.setAttribute('data-enter', '');
          index += 1;
        } else {
          child.setAttribute('data-reveal', 'pending');
          observer.observe(child);
        }
      }
    };

    process();
    // Lazy-loaded pages replace the loading placeholder after this effect ran.
    const mutations = new MutationObserver(process);
    mutations.observe(root, { childList: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      for (const child of Array.from(root.children)) child.removeAttribute('data-reveal');
    };
  }, [ref, key, enabled]);
}

/* ------------------------------------------------------------------ */
/* Count-up for headline numbers                                       */
/* ------------------------------------------------------------------ */

/** Animates from the previous value (0 on mount) to `target`. Whole numbers only. */
export function useCountUp(target: number, duration = 900): number {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));
  const from = useRef(value);

  useEffect(() => {
    if (prefersReducedMotion() || !Number.isFinite(target)) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = from.current;
    if (start === target) return;
    const began = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / duration);
      const eased = 1 - (1 - progress) ** 4;
      const next = Math.round(start + (target - start) * eased);
      from.current = next;
      setValue(next);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

/* ------------------------------------------------------------------ */
/* Celebration: a short confetti burst for real achievements           */
/* ------------------------------------------------------------------ */

const CONFETTI_COLORS = ['var(--primary)', 'var(--yellow-strong)', 'var(--green)', 'var(--blue-strong)', 'var(--orange)'];

export interface CelebrateOptions {
  /** Viewport point the burst starts from. Defaults to the upper middle of the screen. */
  x?: number;
  y?: number;
  pieces?: number;
}

let lastBurst = 0;

/** Rare by design: badges, a finished set or simulation with a high score. Does nothing when motion is reduced. */
export function celebrate({ x, y, pieces = 44 }: CelebrateOptions = {}) {
  if (prefersReducedMotion() || typeof document === 'undefined' || typeof Element.prototype.animate !== 'function') return;
  const now = Date.now();
  if (now - lastBurst < 600) return;
  lastBurst = now;
  const originX = x ?? window.innerWidth / 2;
  const originY = y ?? Math.min(window.innerHeight * 0.3, 260);

  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.className = 'confetti-layer';
  document.body.appendChild(layer);

  let longest = 0;
  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement('i');
    const size = 6 + Math.random() * 6;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * (Math.random() > 0.5 ? 1 : 0.45)}px`;
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.borderRadius = Math.random() > 0.7 ? '50%' : '2px';
    layer.appendChild(piece);

    // A burst upward and outward, then gravity.
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
    const speed = 140 + Math.random() * 240;
    const dx = Math.cos(angle) * speed;
    const apex = Math.sin(angle) * speed;
    const fall = 220 + Math.random() * 260;
    const spin = (Math.random() - 0.5) * 900;
    const duration = 1200 + Math.random() * 700;
    longest = Math.max(longest, duration);

    piece.animate(
      [
        { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(0.6)', opacity: 1 },
        { transform: `translate3d(${dx * 0.7}px, ${apex}px, 0) rotate(${spin * 0.5}deg) scale(1)`, opacity: 1, offset: 0.35, easing: 'cubic-bezier(0.55, 0, 1, 0.45)' },
        { transform: `translate3d(${dx}px, ${apex + fall}px, 0) rotate(${spin}deg) scale(0.9)`, opacity: 0 },
      ],
      { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards', delay: Math.random() * 90 },
    );
  }

  window.setTimeout(() => layer.remove(), longest + 250);
}
