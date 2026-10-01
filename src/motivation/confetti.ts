let reducedByUser = false;

export function setConfettiReducedMotion(value: boolean): void {
  reducedByUser = value;
}

function motionAllowed(): boolean {
  if (reducedByUser) return false;
  return !(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

export type CelebrationKind = 'mastered' | 'badge' | 'exam';

/** Fires confetti for a success moment. Loads the library on first use; no-op when motion is reduced. */
export async function celebrate(kind: CelebrationKind): Promise<void> {
  if (!motionAllowed()) return;
  const confetti = (await import('canvas-confetti')).default;
  const colors = ['#2457e6', '#f5c542', '#16a34a', '#38bdf8', '#fb923c'];
  if (kind === 'mastered') {
    void confetti({ particleCount: 70, spread: 60, startVelocity: 35, origin: { y: 0.75 }, colors, disableForReducedMotion: true });
    return;
  }
  if (kind === 'badge') {
    void confetti({ particleCount: 90, spread: 80, startVelocity: 40, origin: { y: 0.3 }, colors, disableForReducedMotion: true });
    return;
  }
  const end = Date.now() + 1200;
  const frame = () => {
    void confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors, disableForReducedMotion: true });
    void confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors, disableForReducedMotion: true });
    if (Date.now() < end) window.requestAnimationFrame(frame);
  };
  frame();
}
