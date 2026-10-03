import { useNavigate } from 'react-router-dom';
import { Award, Eye, Flag, Flame, Layers, Lock, Megaphone, Pencil, Repeat, Star, Target, Timer, TrendingDown, Trophy, X, Zap } from 'lucide-react';
import type { CoachKind, CoachMessage } from './coach';
import { formatShortDate } from '../lib/dates';
import type { BadgeIcon } from './badges';
import { useMotivation } from './store';

const icons: Record<BadgeIcon, typeof Star> = { timer: Timer, layers: Layers, star: Star, target: Target, flag: Flag, trophy: Trophy, flame: Flame, zap: Zap, award: Award, pencil: Pencil };

export function StreakChip({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const { streak } = useMotivation();
  const active = streak.current > 0;
  const text = streak.current === 0 ? 'התחילו רצף היום' : streak.atRisk ? `רצף ${streak.current} ימים · למדו היום כדי לשמור עליו` : streak.current === 1 ? 'יום ראשון ברצף' : `רצף ${streak.current} ימים`;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-semibold ${size === 'lg' ? 'px-4 py-2 text-base' : 'px-3 py-1 text-sm'} ${active ? 'bg-orange-soft text-orange' : 'bg-surface-2 text-muted'}`} title={`הרצף הארוך ביותר: ${streak.longest} ימים`}>
      <Flame size={size === 'lg' ? 20 : 16} aria-hidden="true" className={active && streak.activeToday ? 'streak-flame' : ''} />
      {text}
    </span>
  );
}

export function BadgeGrid({ limit }: { limit?: number }) {
  const { badgeStatuses } = useMotivation();
  const ordered = [...badgeStatuses].sort((a, b) => {
    if (a.unlockedAt && b.unlockedAt) return b.unlockedAt.localeCompare(a.unlockedAt);
    if (a.unlockedAt) return -1;
    if (b.unlockedAt) return 1;
    return 0;
  });
  const shown = limit ? ordered.slice(0, limit) : ordered;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {shown.map(({ badge, unlockedAt }) => {
        const Icon = icons[badge.icon];
        return (
          <li key={badge.id} className={`badge-card ${unlockedAt ? 'badge-card-earned' : ''}`} title={badge.description}>
            <span className="badge-card-icon">{unlockedAt ? <Icon size={24} aria-hidden="true" /> : <Lock size={20} aria-hidden="true" />}</span>
            <span className="text-sm font-bold leading-snug">{badge.title}</span>
            <span className="text-xs text-muted">{unlockedAt ? formatShortDate(unlockedAt.slice(0, 10)) : badge.description}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Small "pop" shown when a badge is unlocked. */
export function BadgePop() {
  const { pop, dismissPop } = useMotivation();
  if (!pop) return null;
  const Icon = icons[pop.icon];
  return (
    <div className="badge-pop" role="status" aria-live="polite">
      <span className="badge-pop-icon">
        <Icon size={26} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-primary">תג חדש!</span>
        <span className="block text-base font-bold">{pop.title}</span>
        <span className="block text-sm text-muted">{pop.description}</span>
      </span>
      <button type="button" className="btn btn-ghost btn-sm btn-icon" aria-label="סגירה" onClick={dismissPop}>
        <X size={16} />
      </button>
    </div>
  );
}

const coachIcons: Record<CoachKind, typeof Star> = {
  'streak-broken': Flame,
  'streak-at-risk': Flame,
  'overdue-reviews': Repeat,
  'low-score': TrendingDown,
  'score-drop': TrendingDown,
  'fast-peek': Eye,
  'repeat-wrong': Target,
  'missed-sessions': Megaphone,
};

/** The tough coach's message card. Stays until the student acts on it or closes it. */
export function CoachCard({ message, onClose, variant = 'pop' }: { message: CoachMessage; onClose: () => void; variant?: 'pop' | 'banner' }) {
  const navigate = useNavigate();
  const Icon = coachIcons[message.kind];
  return (
    <div className={variant === 'pop' ? 'coach-pop' : 'coach-banner'} role={variant === 'pop' ? 'alert' : undefined}>
      <span className="coach-icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wide text-red">המאמן</span>
        <span className="block text-base font-bold leading-snug">{message.title}</span>
        <p className="mt-1 text-sm leading-relaxed text-muted">{message.body}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {message.action && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                onClose();
                navigate(message.action!.to);
              }}
            >
              {message.action.label}
            </button>
          )}
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            הבנתי
          </button>
        </div>
      </div>
      <button type="button" className="btn btn-ghost btn-sm btn-icon" aria-label="סגירה" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}

export function CoachPop() {
  const { coachMessage, dismissCoach } = useMotivation();
  if (!coachMessage) return null;
  return <CoachCard key={coachMessage.id} message={coachMessage} onClose={dismissCoach} />;
}
