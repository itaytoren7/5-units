import { useEffect, useId, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export type Tone = 'primary' | 'yellow' | 'blue' | 'green' | 'red' | 'orange' | 'neutral';

const toneClasses: Record<Tone, string> = {
  primary: 'bg-primary-soft text-primary',
  yellow: 'bg-yellow-soft text-yellow',
  blue: 'bg-blue-soft text-blue',
  green: 'bg-green-soft text-green',
  red: 'bg-red-soft text-red',
  orange: 'bg-orange-soft text-orange',
  neutral: 'bg-surface-2 text-muted',
};

export const toneColor: Record<Tone, string> = {
  primary: 'var(--primary)',
  yellow: 'var(--yellow)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  red: 'var(--red)',
  orange: 'var(--orange)',
  neutral: 'var(--muted)',
};

/** Starts at 0 and settles on `target` after mount, so CSS transitions animate the fill. */
function useAnimatedValue(target: number): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setValue(target));
    return () => window.cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

/* ---------- Surfaces ---------- */

export function Card({
  children,
  className = '',
  as: Tag = 'section',
  style,
  interactive = false,
  padding = 'md',
}: {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'article' | 'div' | 'li';
  style?: CSSProperties;
  /** Lifts on hover (for cards that are links or open something). */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}) {
  const pad = padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-6 sm:p-8' : 'p-5 sm:p-6';
  return (
    <Tag className={`card ${interactive ? 'card-hover' : ''} ${pad} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}

/* ---------- Buttons ---------- */

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  to?: string;
  href?: string;
  type?: 'button' | 'submit';
}

export function Button({ variant = 'secondary', size = 'md', icon, to, href, className = '', children, type = 'button', ...rest }: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'soft' ? 'btn-soft' : variant === 'ghost' ? 'btn-ghost' : variant === 'danger' ? 'btn-danger' : '';
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const classes = `btn ${variantClass} ${sizeClass} ${!children ? 'btn-icon' : ''} ${className}`.replace(/\s+/g, ' ').trim();
  const content = (
    <>
      {icon && <span className="btn-icon-slot">{icon}</span>}
      {children}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} aria-label={rest['aria-label']} title={rest.title}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} aria-label={rest['aria-label']} title={rest.title}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}

/* ---------- Badges & status ---------- */

export function Badge({ tone = 'neutral', children, className = '', title, icon, size = 'md' }: { tone?: Tone; children: ReactNode; className?: string; title?: string; icon?: ReactNode; size?: 'sm' | 'md' }) {
  return (
    <span className={`badge ${size === 'sm' ? 'badge-sm' : ''} ${toneClasses[tone]} ${className}`.replace(/\s+/g, ' ').trim()} title={title}>
      {icon}
      {children}
    </span>
  );
}

export function Notice({ tone = 'orange', icon, children, className = '' }: { tone?: Tone; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`notice ${toneClasses[tone]} ${className}`} role="note" style={{ borderColor: `color-mix(in srgb, ${toneColor[tone]} 25%, transparent)` }}>
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/* ---------- Progress ---------- */

export function ProgressBar({ percent, tone = 'primary', className = '', label, size = 'md' }: { percent: number; tone?: Tone; className?: string; label?: string; size?: 'sm' | 'md' | 'lg' }) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  const animated = useAnimatedValue(value);
  return (
    <div className={`progress progress-${size} ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <i style={{ width: `${animated}%`, background: toneColor[tone] }} />
    </div>
  );
}

export function ProgressRing({ percent, size = 72, stroke = 8, tone = 'primary', children, label }: { percent: number; size?: number; stroke?: number; tone?: Tone; children?: ReactNode; label?: string }) {
  const value = Math.max(0, Math.min(100, percent));
  const animated = useAnimatedValue(value);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }} role="img" aria-label={label ?? `${Math.round(value)}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={toneColor[tone]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - animated / 100)}
          className="ring-fill"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center font-bold tabular-nums" style={{ fontSize: Math.max(12, size * 0.22) }}>
        {children ?? `${Math.round(value)}%`}
      </div>
    </div>
  );
}

/* ---------- Controls ---------- */

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className="switch" onClick={() => onChange(!checked)} />;
}

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  title?: string;
}

export function Segmented<T extends string>({ options, value, onChange, label, className = '', fill = false }: { options: SegmentedOption<T>[]; value: T; onChange: (next: T) => void; label: string; className?: string; fill?: boolean }) {
  return (
    <div className={`seg ${fill ? 'seg-fill' : ''} ${className}`} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button key={option.value} type="button" role="radio" aria-checked={option.value === value} title={option.title} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export interface TabOption<T extends string> {
  value: T;
  label: ReactNode;
  count?: number;
}

/** Underlined tabs for switching views inside a page (the Segmented control is for small filters). */
export function Tabs<T extends string>({ options, value, onChange, label, className = '' }: { options: TabOption<T>[]; value: T; onChange: (next: T) => void; label: string; className?: string }) {
  return (
    <div className={`tabs ${className}`} role="tablist" aria-label={label}>
      {options.map((option) => (
        <button key={option.value} type="button" role="tab" aria-selected={option.value === value} onClick={() => onChange(option.value)}>
          {option.label}
          {option.count !== undefined && <span className="tab-count">{option.count}</span>}
        </button>
      ))}
    </div>
  );
}

/** Height-animated container (grid-rows trick) for hints, solutions and drawers. */
export function Collapse({ open, children, className = '' }: { open: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`reveal ${className}`} data-open={open} aria-hidden={!open}>
      <div inert={!open}>{children}</div>
    </div>
  );
}

export function Accordion({ title, summary, children, defaultOpen = false, icon, className = '' }: { title: ReactNode; summary?: ReactNode; children: ReactNode; defaultOpen?: boolean; icon?: ReactNode; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`accordion ${open ? 'accordion-open' : ''} ${className}`}>
      <button type="button" className="accordion-head" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {icon && <span className="shrink-0 text-primary">{icon}</span>}
        <span className="min-w-0 flex-1 text-start">
          <span className="block font-semibold">{title}</span>
          {summary && <span className="block text-sm text-muted">{summary}</span>}
        </span>
        <ChevronDown size={18} className="accordion-chevron shrink-0 text-muted" aria-hidden="true" />
      </button>
      <div id={id} className="reveal" data-open={open}>
        <div inert={!open}>
          <div className="accordion-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Content blocks ---------- */

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
      {icon && <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">{icon}</div>}
      <h3 className="text-lg font-bold">{title}</h3>
      {description && <p className="max-w-sm text-base text-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, hint, tone = 'neutral', icon }: { label: string; value: ReactNode; hint?: ReactNode; tone?: Tone; icon?: ReactNode }) {
  return (
    <div className="stat">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted">{label}</span>
        {icon && <span className="text-muted">{icon}</span>}
      </div>
      <span className="text-2xl font-bold tabular-nums" style={{ color: tone === 'neutral' ? 'var(--text)' : toneColor[tone] }}>
        {value}
      </span>
      {hint && <span className="text-sm text-muted">{hint}</span>}
    </div>
  );
}

export function Field({ label, hint, children, className = '' }: { label: string; hint?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="text-sm text-muted">{hint}</span>}
    </label>
  );
}

export function PageHeader({ eyebrow, title, description, actions, children }: { eyebrow?: ReactNode; title: ReactNode; description?: ReactNode; actions?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 max-w-[72ch]">
        {eyebrow && <div className="mb-1.5 text-sm font-semibold text-primary">{eyebrow}</div>}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 text-base text-muted">{description}</p>}
        {children}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function SectionTitle({ title, description, actions, icon }: { title: ReactNode; description?: ReactNode; actions?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        {icon && <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>}
        <div className="min-w-0">
          <h2 className="text-xl font-bold">{title}</h2>
          {description && <p className="text-sm text-muted">{description}</p>}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return <hr className={`border-0 border-t border-border ${className}`} />;
}
