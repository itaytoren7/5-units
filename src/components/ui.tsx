import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

type Tone = 'primary' | 'yellow' | 'blue' | 'green' | 'red' | 'orange' | 'neutral';

const toneClasses: Record<Tone, string> = {
  primary: 'bg-primary-soft text-primary',
  yellow: 'bg-yellow-soft text-yellow',
  blue: 'bg-blue-soft text-blue',
  green: 'bg-green-soft text-green',
  red: 'bg-red-soft text-red',
  orange: 'bg-orange-soft text-orange',
  neutral: 'bg-surface-2 text-muted',
};

const toneBar: Record<Tone, string> = {
  primary: 'var(--primary)',
  yellow: 'var(--yellow)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  red: 'var(--red)',
  orange: 'var(--orange)',
  neutral: 'var(--muted)',
};

export function Card({ children, className = '', as: Tag = 'section', style }: { children: ReactNode; className?: string; as?: 'section' | 'article' | 'div' | 'li'; style?: CSSProperties }) {
  return (
    <Tag className={`card p-4 sm:p-5 ${className}`} style={style}>
      {children}
    </Tag>
  );
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  to?: string;
  href?: string;
  type?: 'button' | 'submit';
}

export function Button({ variant = 'secondary', size = 'md', icon, to, href, className = '', children, type = 'button', ...rest }: ButtonProps) {
  const classes = `btn ${variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : variant === 'danger' ? 'btn-danger' : ''} ${size === 'sm' ? 'btn-sm' : ''} ${!children ? 'btn-icon' : ''} ${className}`.trim();
  const content = (
    <>
      {icon}
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

export function Badge({ tone = 'neutral', children, className = '', title }: { tone?: Tone; children: ReactNode; className?: string; title?: string }) {
  return (
    <span className={`badge ${toneClasses[tone]} ${className}`} title={title}>
      {children}
    </span>
  );
}

export function ProgressBar({ percent, tone = 'primary', className = '', label }: { percent: number; tone?: Tone; className?: string; label?: string }) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className={`progress ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <i style={{ width: `${value}%`, background: toneBar[tone] }} />
    </div>
  );
}

export function ProgressRing({ percent, size = 64, stroke = 7, tone = 'primary', children }: { percent: number; size?: number; stroke?: number; tone?: Tone; children?: ReactNode }) {
  const value = Math.max(0, Math.min(100, percent));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={`${Math.round(value)}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={toneBar[tone]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-sm font-bold">{children ?? `${Math.round(value)}%`}</div>
    </div>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className="switch" onClick={() => onChange(!checked)} />;
}

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  title?: string;
}

export function Segmented<T extends string>({ options, value, onChange, label, className = '' }: { options: SegmentedOption<T>[]; value: T; onChange: (next: T) => void; label: string; className?: string }) {
  return (
    <div className={`seg ${className}`} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button key={option.value} type="button" role="radio" aria-checked={option.value === value} title={option.title} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
      {icon && <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">{icon}</div>}
      <h3 className="text-base font-bold">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, hint, tone = 'neutral' }: { label: string; value: ReactNode; hint?: ReactNode; tone?: Tone }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl bg-surface-2 px-3.5 py-3">
      <span className="text-xs font-medium text-muted">{label}</span>
      <span className="text-xl font-bold" style={{ color: tone === 'neutral' ? 'var(--text)' : toneBar[tone] }}>
        {value}
      </span>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  );
}

export function Field({ label, hint, children, className = '' }: { label: string; hint?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function PageHeader({ eyebrow, title, description, actions, children }: { eyebrow?: ReactNode; title: ReactNode; description?: ReactNode; actions?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <div className="mb-1 text-xs font-bold text-primary">{eyebrow}</div>}
        <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted">{description}</p>}
        {children}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function SectionTitle({ title, description, actions, icon }: { title: ReactNode; description?: ReactNode; actions?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="flex items-start gap-2.5">
        {icon && <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>}
        <div>
          <h2 className="text-base font-bold sm:text-lg">{title}</h2>
          {description && <p className="text-sm text-muted">{description}</p>}
        </div>
      </div>
      {actions}
    </div>
  );
}

export function Notice({ tone = 'orange', icon, children }: { tone?: Tone; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className={`flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-sm ${toneClasses[tone]}`} role="note">
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0">{children}</div>
    </div>
  );
}
