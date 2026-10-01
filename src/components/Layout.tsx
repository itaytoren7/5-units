import { useEffect, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AlertTriangle, BookOpen, CalendarDays, History, Home, Monitor, Moon, MoreHorizontal, PencilLine, Settings, Sigma, Sun, Timer } from 'lucide-react';
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

const themeOptions: Array<{ value: Theme; icon: typeof Sun; label: string }> = [
  { value: 'light', icon: Sun, label: 'בהיר' },
  { value: 'dark', icon: Moon, label: 'כהה' },
  { value: 'system', icon: Monitor, label: 'לפי המערכת' },
];

function ThemePicker({ compact = false }: { compact?: boolean }) {
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
    <div className="seg w-full" role="radiogroup" aria-label="ערכת נושא">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button key={option.value} type="button" role="radio" aria-checked={state.theme === option.value} title={option.label} className="flex-1" onClick={() => actions.setTheme(option.value)}>
            <Icon size={16} className="mx-auto" aria-hidden="true" />
            <span className="sr-only">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Brand() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5 font-extrabold">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg text-on-primary shadow-sm">5</span>
      <span className="leading-tight">
        חמש יחידות
        <small className="block text-[11px] font-medium text-muted">מרכז הלמידה שלי</small>
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

export function Layout({ children }: { children: ReactNode }) {
  const { toast } = useStore();
  return (
    <div className="min-h-dvh">
      <ScrollToTop />
      <aside className="no-print fixed inset-y-0 inset-s-0 z-30 hidden w-[264px] flex-col border-e border-border bg-surface px-4 py-6 lg:flex" style={{ insetInlineStart: 0 }}>
        <div className="px-2 pb-6">
          <Brand />
        </div>
        <nav className="flex flex-col gap-1" aria-label="ניווט ראשי">
          {primaryNav.map((entry) => (
            <NavLink key={entry.to} to={entry.to} end={entry.end} className="nav-item">
              <entry.icon size={18} aria-hidden="true" />
              {entry.label}
            </NavLink>
          ))}
          <div className="px-3 pb-1 pt-4 text-[11px] font-bold tracking-wide text-muted">כלים</div>
          {secondaryNav.map((entry) => (
            <NavLink key={entry.to} to={entry.to} className="nav-item">
              <entry.icon size={18} aria-hidden="true" />
              {entry.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <ThemePicker />
          <p className="px-1 text-[11px] leading-relaxed text-muted">הנתונים נשמרים במכשיר הזה בלבד. מומלץ לייצא גיבוי מדי פעם מההגדרות.</p>
        </div>
      </aside>

      <header className="no-print sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur lg:hidden">
        <Brand />
        <ThemePicker compact />
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-4 sm:px-6 lg:ms-[264px] lg:max-w-[calc(100%-264px)] lg:px-10 lg:pb-16 lg:pt-8 xl:max-w-5xl xl:ms-[calc(264px+(100%-264px-64rem)/2)]">
        {children}
      </main>

      <nav className="no-print fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-border bg-surface/95 px-1 pt-1 backdrop-blur lg:hidden" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 4px)' }} aria-label="ניווט תחתון">
        {primaryNav.map((entry) => (
          <NavLink key={entry.to} to={entry.to} end={entry.end} className="tab-item">
            <entry.icon size={21} aria-hidden="true" />
            {entry.label}
          </NavLink>
        ))}
        <NavLink to="/more" className="tab-item">
          <MoreHorizontal size={21} aria-hidden="true" />
          עוד
        </NavLink>
      </nav>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
