import { useState } from 'react';
import { AlertTriangle, Check, CircleAlert, CircleCheck, Info, Lightbulb, Sparkles, Timer } from 'lucide-react';
import { problems } from '@/data/problems';
import type { Rating } from '@/data/syllabus/types';
import { Latex, Markdown } from '../components/Markdown';
import { ProblemCard } from '../components/ProblemCard';
import { RatingControl } from '../components/RatingControl';
import { KeptBadge, PriorityBadge, StatusBadge } from '../components/StatusBadge';
import { Accordion, Badge, Button, Card, Collapse, EmptyState, Field, Notice, PageHeader, ProgressBar, ProgressRing, SectionTitle, Segmented, Stat, Switch, Tabs } from '../components/ui';

const swatches: Array<{ name: string; token: string; text?: string }> = [
  { name: 'רקע', token: '--bg' },
  { name: 'משטח', token: '--surface' },
  { name: 'משטח משני', token: '--surface-2' },
  { name: 'גבול', token: '--border' },
  { name: 'מותג', token: '--primary', text: '--on-primary' },
  { name: 'מותג רך', token: '--primary-soft', text: '--primary' },
  { name: 'ללמוד קודם', token: '--yellow-soft', text: '--yellow' },
  { name: 'ללמוד בסוף', token: '--blue-soft', text: '--blue' },
  { name: 'לא בבגרות', token: '--red-soft', text: '--red' },
  { name: 'הורדה 2026', token: '--orange-soft', text: '--orange' },
  { name: 'בבגרות', token: '--green-soft', text: '--green' },
];

function Panel({ theme }: { theme: 'light' | 'dark' }) {
  const [tab, setTab] = useState<'a' | 'b' | 'c'>('a');
  const [seg, setSeg] = useState<'x' | 'y'>('x');
  const [rating, setRating] = useState<Rating>('medium');
  const [on, setOn] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <div data-theme={theme} className="rounded-3xl bg-bg p-4 text-text sm:p-6" style={{ colorScheme: theme }}>
      <h2 className="mb-4 text-2xl font-bold">{theme === 'light' ? 'מצב בהיר' : 'מצב כהה'}</h2>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">צבעים</h3>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {swatches.map((swatch) => (
            <li key={swatch.token} className="flex flex-col gap-1 rounded-xl border border-border p-2 text-sm">
              <span className="grid h-12 place-items-center rounded-lg font-semibold" style={{ background: `var(${swatch.token})`, color: swatch.text ? `var(${swatch.text})` : 'var(--text)' }}>
                {swatch.text ? 'אבג Aa 123' : ''}
              </span>
              <span>{swatch.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">טיפוגרפיה</h3>
        <Card>
          <p className="text-4xl font-bold">כותרת ענקית 42</p>
          <p className="text-3xl font-bold">כותרת עמוד 34</p>
          <p className="text-2xl font-bold">כותרת קטע 28</p>
          <p className="text-xl font-bold">כותרת כרטיס 22</p>
          <p className="text-lg">טקסט מודגש 19</p>
          <p className="prose text-base">
            טקסט גוף 17 עם גובה שורה 1.65: הנגזרת של $f(x)=x^{2}\ln x$ היא $f'(x)=2x\ln x+x$, ולכן נקודת הקיצון נמצאת כאשר $x=e^{-1/2}$. העמודה מוגבלת ל-72 תווים כדי שהעין לא תתעייף.
          </p>
          <p className="text-sm text-muted">טקסט משני 15 · מספרים טבלאיים: <span className="tabular-nums">12:34:56 · 87% · 33⅓</span></p>
          <p className="text-xs text-muted">תווית קטנה 13</p>
          <Markdown className="mt-3 prose">{'נוסחה בשורה: $\\sin^{2}x+\\cos^{2}x=1$ ונוסחת תצוגה:\n\n$$S=\\int_{a}^{b}\\left(f(x)-g(x)\\right)dx$$'}</Markdown>
        </Card>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">כפתורים</h3>
        <Card className="flex flex-wrap items-center gap-2">
          <Button variant="primary" icon={<Sparkles size={16} />}>ראשי</Button>
          <Button>משני</Button>
          <Button variant="soft">רך</Button>
          <Button variant="ghost">שקוף</Button>
          <Button variant="danger">מסוכן</Button>
          <Button size="sm">קטן</Button>
          <Button size="lg" variant="primary">גדול</Button>
          <Button variant="primary" disabled>מושבת</Button>
          <Button icon={<Timer size={18} />} aria-label="אייקון בלבד" />
        </Card>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">תגים</h3>
        <Card className="flex flex-wrap items-center gap-2">
          <StatusBadge status="in" />
          <StatusBadge status="out-original" />
          <StatusBadge status="out-2026" />
          <KeptBadge />
          <PriorityBadge priority="yellow" />
          <PriorityBadge priority="blue" />
          <Badge tone="orange" icon={<CircleAlert size={13} />}>⚠ לא נבדק</Badge>
          <Badge tone="green" icon={<CircleCheck size={13} />}>בדקתי</Badge>
          <Badge tone="primary">שאלה 4</Badge>
          <Badge>ניטרלי</Badge>
        </Card>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">התקדמות</h3>
        <Card className="flex flex-wrap items-center gap-6">
          <ProgressRing percent={72} size={96} stroke={10} />
          <ProgressRing percent={45} size={64} tone="yellow" />
          <ProgressRing percent={100} size={64} tone="green">
            <Check size={22} />
          </ProgressRing>
          <div className="flex min-w-[220px] flex-1 flex-col gap-3">
            <ProgressBar percent={72} label="דוגמה" />
            <ProgressBar percent={45} tone="yellow" size="sm" label="דוגמה" />
            <ProgressBar percent={90} tone="green" size="lg" label="דוגמה" />
          </div>
        </Card>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">פקדים</h3>
        <Card className="flex flex-col gap-4">
          <Tabs label="דוגמה" value={tab} onChange={setTab} options={[{ value: 'a', label: 'תקציר' }, { value: 'b', label: 'תרגול', count: 3 }, { value: 'c', label: 'היסטוריה' }]} />
          <Segmented label="דוגמה" value={seg} onChange={setSeg} options={[{ value: 'x', label: 'מיקוד 2026' }, { value: 'y', label: 'סילבוס מלא' }]} />
          <RatingControl value={rating} onChange={setRating} label="דוגמה" />
          <div className="flex items-center gap-3">
            <Switch checked={on} onChange={setOn} label="דוגמה" /> <span className="text-sm">מתג</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="תאריך בחינה" hint="טקסט עזרה">
              <input type="date" />
            </Field>
            <Field label="בחירה">
              <select>
                <option>שאלון 806</option>
                <option>שאלון 807</option>
              </select>
            </Field>
          </div>
        </Card>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">הודעות</h3>
        <div className="flex flex-col gap-2">
          <Notice tone="orange" icon={<AlertTriangle size={18} />}>אי-למידת כל החומר כרוכה בסיכון.</Notice>
          <Notice tone="primary" icon={<Info size={18} />}>סדר למידה מומלץ: קודם צהוב, בסוף כחול.</Notice>
          <Notice tone="green" icon={<CircleCheck size={18} />}>הגיבוי נטען בהצלחה.</Notice>
          <Notice tone="red" icon={<CircleAlert size={18} />}>לא הצלחתי לקרוא את הקובץ.</Notice>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">אקורדיון ופתיחה חלקה</h3>
        <div className="flex flex-col gap-3">
          <Accordion title="דוגמה פתורה: חקירת פונקציה" summary="לחצו כדי לפתוח" icon={<Lightbulb size={18} />}>
            <Markdown>{'תחום ההגדרה: $x\\ne\\pm2$. הנגזרת: $f\'(x)=\\frac{-8x}{(x^{2}-4)^{2}}$.'}</Markdown>
          </Accordion>
          <Card>
            <Button size="sm" icon={<Lightbulb size={14} />} onClick={() => setOpen(!open)}>
              {open ? 'הסתר רמז' : 'רמז (1/3)'}
            </Button>
            <Collapse open={open}>
              <div className="mt-3 rounded-xl bg-yellow-soft px-4 py-3 text-yellow">
                <Markdown inline className="text-text">{'גזרו את הפונקציה והשוו ל-0: $f\'(x)=0$.'}</Markdown>
              </div>
            </Collapse>
          </Card>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-lg font-bold">כרטיסים וסטטיסטיקות</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="תרגילים במאגר" value={24} />
          <Stat label="ממוצע סימולציות" value={<span>86</span>} tone="primary" hint="3 סימולציות" />
          <Stat label="לחזור" value={2} tone="red" />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">{problems.slice(0, 2).map((problem) => <ProblemCard key={problem.id} problem={problem} />)}</div>
        <Card className="mt-3">
          <SectionTitle icon={<Timer size={18} />} title="כותרת קטע" description="תיאור קצר של הקטע" actions={<Button size="sm">פעולה</Button>} />
          <EmptyState icon={<Sparkles size={22} />} title="מצב ריק" description="כך נראה קטע בלי נתונים עדיין." action={<Button variant="primary">התחלה</Button>} />
        </Card>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-bold">נוסחה בקופסה</h3>
        <Card className="text-center">
          <div className="text-sm font-semibold text-muted">משפט הקוסינוסים</div>
          <Latex latex={'a^{2}=b^{2}+c^{2}-2bc\\cos\\alpha'} display />
        </Card>
      </section>
    </div>
  );
}

export function DesignPreview() {
  return (
    <>
      <PageHeader eyebrow="עמוד זמני" title="מערכת העיצוב" description="כל הטוקנים והרכיבים, במצב בהיר ובמצב כהה זה לצד זה. העמוד הזה יוסר או יוסתר בסוף התהליך." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel theme="light" />
        <Panel theme="dark" />
      </div>
    </>
  );
}
