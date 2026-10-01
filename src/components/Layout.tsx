import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AlertTriangle, BookOpen, CalendarDays, History, Home, Monitor, Moon, MoreHorizontal, PencilLine, Settings, Sigma, Sun, Timer, X } from 'lucide-react';
import { useStore } from '../state/store';
import type { Theme } from '../state/types';

export interface NavEntry {
  to: string;
  label: string;
  description?: string;
  icon: typeof Home;
  end?: boolean;
}

export const primaryNav: NavEntry[] = [
  { to: '/', label: 'ראשי', icon: Home, end: true },
  { to: '/syllabus', label: 'סילבוס', description: 'מפת הנושאים, המיקוד ורמת השליטה שלך', icon: BookOpen },
  { to: '/practice', label: 'תרגול', description: 'מאגר תרגילים עם רמזים ופתרונות מלאים', icon: PencilLine },
  { to: '/simulator', label: 'סימולטור', description: 'בחינת דמה עם שעון אמיתי וציון', icon: Timer },
];

export const secondaryNav: NavEntry[] = [
  { to: '/planner', label: 'מתכנן למידה', description: 'תוכנית שבועית לפי הזמן שיש לך', icon: CalendarDays },
  { to: '/mistakes', label: 'יומן טעויות', description: 'מה השתבש, איך נכון, ומתי לחזור', icon: AlertTriangle },
  { to: '/past-exams', label: 'בחינות עבר', description: 'מעקב אחרי בגרויות אמיתיות שפתרת', icon: History },
  { to: '/formulas', label: 'דף נוסחאות', description: 'סיכום אישי להדפסה', icon: Sigma },
  { to: '/settings', label: 'הגדרות', description: 'תאריכי בחינה, מיקוד, גיבוי', icon: Settings },
];

const sidebarGroups: Array<{ label?: string; items: NavEntry[] }> = [
  { items: [primaryNav[0]] },
  { label: 'למידה', items: primaryNav.slice(1) },
  { label: 'כלים', items: secondaryNav.slice(0, 4) },
  { items: [secondaryNav[4]] },
];

const themeOptions: Array<{ value: Theme; icon: typeof Sun; label: string }> = [
  { value: 'light', icon: Sun, label: 'בהיר' },
  { value: 'dark', icon: Moon, label: 'כהה' },
  { value: 'system', icon: Monitor, label: 'לפי המערכת' },
];

export function ThemePicker({ compact = false }: { compact?: boolean }) {
  const { state, actions } = useStore();
  if (compact) {
    const next: Theme = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'system' : 'light';
    const current = themeOptions.find((option) => option.value === state.theme) ?? themeOptions[2];
    const Icon = current.icon;
    return (
      <button type="button" className="btn btn-ghost btn-icon" aria-label={`ערכת נושא: ${current.label}. לחיצה תחליף`} title={current.label} onClick={() => actions.setTheme(next)}>
        <Icon size={20} />
      </button>
    );
  }
  return (
    <div className="seg seg-fill" role="radiogroup" aria-label="ערכת נושא">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button key={option.value} type="button" role="radio" aria-checked={state.theme === option.value} title={option.label} onClick={() => actions.setTheme(option.value)}>
            <Icon size={16} aria-hidden="true" />
            <span className="sr-only lg:not-sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <NavLink to="/" className="flex items-center gap-3 font-bold" onClick={onClick}>
      <span className="brand-mark">5</span>
      <span className="leading-tight">
        חמש יחידות
        <small className="block text-xs font-medium text-muted">מרכז הלמידה שלי</small>
      </span>
    </NavLink>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

function MoreDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  return (
    <div className={`drawer-root ${open ? 'drawer-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="drawer-backdrop" aria-label="סגירת התפריט" onClick={onClose} tabIndex={open ? 0 : -1} />
      <div className="drawer" role="dialog" aria-modal="true" aria-label="עוד">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-border" aria-hidden="true" />
        <div className="mb-2 flex items-center justify-between">
          <span className="text-lg font-bold">עוד</span>
          <button type="button" className="btn btn-ghost btn-icon" aria-label="סגירה" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {secondaryNav.map((entry) => (
            <li key={entry.to}>
              <NavLink to={entry.to} className="nav-item" onClick={onClose} tabIndex={open ? 0 : -1}>
                <entry.icon size={20} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block">{entry.label}</span>
                  {entry.description && <span className="block text-sm font-normal text-muted">{entry.description}</span>}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-border pt-4">
          <div className="mb-2 text-sm font-semibold text-muted">ערכת נושא</div>
          <ThemePicker />
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { toast, state } = useStore();
  const { pathname } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  // Distraction-free mode: while a simulation is running on its own page, the navigation steps aside.
  const focusMode = Boolean(state.activeExam && state.activeExam.phase === 'running' && pathname === `/simulator/${state.activeExam.questionnaire}`);

  useEffect(() => setMoreOpen(false), [pathname]);

  return (
    <div className="min-h-dvh">
      <ScrollToTop />

      {!focusMode && (
        <aside className="sidebar no-print" aria-label="ניווט ראשי">
          <div className="px-3 pb-6 pt-1">
            <Brand />
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {sidebarGroups.map((group, index) => (
              <div key={index} className={index > 0 ? 'mt-3' : ''}>
                {group.label && <div className="nav-caption">{group.label}</div>}
                {group.items.map((entry) => (
                  <NavLink key={entry.to} to={entry.to} end={entry.end} className="nav-item">
                    <entry.icon size={20} aria-hidden="true" />
                    {entry.label}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <ThemePicker />
            <p className="px-1 text-xs leading-relaxed text-muted">הנתונים נשמרים במכשיר הזה בלבד. מומלץ לייצא גיבוי מההגדרות מדי פעם.</p>
          </div>
        </aside>
      )}

      {!focusMode && (
        <header className="mobile-header no-print">
          <Brand />
          <ThemePicker compact />
        </header>
      )}

      <main className={`${focusMode ? '' : 'main-shell'} min-w-0`}>
        <div key={pathname} className={`page-enter mx-auto w-full max-w-[1120px] px-4 pb-28 pt-5 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10 ${focusMode ? 'lg:pt-6' : ''}`}>
          {children}
        </div>
      </main>

      {!focusMode && (
        <>
          <nav className="tabbar no-print" aria-label="ניווט תחתון">
            {primaryNav.map((entry) => (
              <NavLink key={entry.to} to={entry.to} end={entry.end} className="tab-item">
                <entry.icon size={22} aria-hidden="true" />
                {entry.label}
              </NavLink>
            ))}
            <button type="button" className="tab-item" aria-expanded={moreOpen} aria-haspopup="dialog" onClick={() => setMoreOpen(true)}>
              <MoreHorizontal size={22} aria-hidden="true" />
              עוד
            </button>
          </nav>
          <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
        </>
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
