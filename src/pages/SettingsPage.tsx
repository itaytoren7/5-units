import { useRef, useState } from 'react';
import { CalendarDays, Download, Info, Monitor, Moon, RotateCcw, Sun, Target, Upload } from 'lucide-react';
import { Button, Card, Field, PageHeader, SectionTitle, Segmented } from '../components/ui';
import { formatDate, daysUntil } from '../lib/dates';
import { questionnaireList } from '../lib/questionnaires';
import { STORAGE_KEY } from '../state/defaults';
import { exportState, parseImportedState } from '../state/storage';
import { useStore } from '../state/store';

export function SettingsPage() {
  const { state, actions, notify } = useStore();
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const download = () => {
    const blob = new Blob([exportState(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bagrut-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    notify('קובץ הגיבוי הורד');
  };

  const importFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        actions.importState(parseImportedState(String(reader.result)));
        notify('הגיבוי נטען בהצלחה');
      } catch (error) {
        notify(error instanceof Error ? error.message : 'קובץ הגיבוי אינו תקין');
      }
      if (fileInput.current) fileInput.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <>
      <PageHeader title="הגדרות וגיבוי" description="תאריכי הבחינה, מצב המיקוד, ערכת הנושא והנתונים שלך." />
      <div className="flex flex-col gap-4">
        <Card>
          <SectionTitle icon={<CalendarDays size={16} />} title="תאריכי בחינה" description="מפעילים ספירה לאחור בלוח הראשי ואת התוכנית השבועית" />
          <div className="grid gap-3 sm:grid-cols-2">
            {questionnaireList.map((questionnaire) => {
              const date = state.examDates[questionnaire.code] ?? '';
              const days = date ? daysUntil(date) : null;
              return (
                <Field key={questionnaire.code} label={`שאלון ${questionnaire.nickname} (${questionnaire.code})`} hint={days === null ? 'לא הוגדר תאריך' : days >= 0 ? `${formatDate(date)} · עוד ${days} ימים` : 'התאריך עבר'}>
                  <div className="flex gap-2">
                    <input type="date" value={date} onChange={(event) => actions.setExamDate(questionnaire.code, event.target.value)} className="flex-1" />
                    {date && <Button variant="ghost" aria-label="נקה תאריך" onClick={() => actions.setExamDate(questionnaire.code, '')} icon={<RotateCcw size={16} />} />}
                  </div>
                </Field>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle icon={<Target size={16} />} title="תצוגת מיקוד" description="מה להציג במפת הסילבוס ובעמודי הנושאים" />
          <Segmented
            label="מצב מיקוד"
            value={state.focusMode}
            onChange={actions.setFocusMode}
            options={[
              { value: 'focus-2026', label: 'מיקוד 2026 — נושאים שירדו מקופלים' },
              { value: 'full', label: 'סילבוס מלא — הכול מוצג' },
            ]}
          />
        </Card>

        <Card>
          <SectionTitle icon={<Sun size={16} />} title="ערכת נושא" />
          <Segmented
            label="ערכת נושא"
            value={state.theme}
            onChange={actions.setTheme}
            options={[
              { value: 'light', label: <span className="inline-flex items-center gap-1"><Sun size={14} /> בהיר</span> },
              { value: 'dark', label: <span className="inline-flex items-center gap-1"><Moon size={14} /> כהה</span> },
              { value: 'system', label: <span className="inline-flex items-center gap-1"><Monitor size={14} /> לפי המערכת</span> },
            ]}
          />
        </Card>

        <Card>
          <SectionTitle icon={<Download size={16} />} title="גיבוי הנתונים" description="ההתקדמות, היומן, הסימולציות והתוכנית נשמרים במכשיר הזה בלבד. ייצאו גיבוי מדי פעם, במיוחד לפני החלפת דפדפן או מכשיר." />
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" icon={<Download size={16} />} onClick={download}>
              ייצוא גיבוי (JSON)
            </Button>
            <Button icon={<Upload size={16} />} onClick={() => fileInput.current?.click()}>
              ייבוא מקובץ גיבוי
            </Button>
            <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={(event) => importFile(event.target.files?.[0])} />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <div>
              <b className="block text-sm">איפוס כל הנתונים</b>
              <span className="text-xs text-muted">מוחק תאריכים, דירוגים, תרגולים, יומן טעויות, סימולציות ותוכנית מהמכשיר הזה.</span>
            </div>
            {confirmReset ? (
              <div className="flex gap-2">
                <Button
                  variant="danger"
                  onClick={() => {
                    actions.resetState();
                    setConfirmReset(false);
                    notify('כל הנתונים אופסו');
                  }}
                >
                  כן, לאפס הכול
                </Button>
                <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                  ביטול
                </Button>
              </div>
            ) : (
              <Button variant="danger" icon={<RotateCcw size={16} />} onClick={() => setConfirmReset(true)}>
                איפוס
              </Button>
            )}
          </div>
        </Card>

        <Card>
          <SectionTitle icon={<Info size={16} />} title="על האפליקציה" />
          <ul className="flex flex-col gap-1 text-sm text-muted">
            <li>מרכז למידה אישי לבגרות במתמטיקה 5 יח״ל — שאלונים 35581 ו-35582, לפי המיקוד לקיץ 2026.</li>
            <li>
              הנתונים נשמרים ב-localStorage תחת המפתח <code className="rounded bg-surface-2 px-1" dir="ltr">{STORAGE_KEY}</code>.
            </li>
            <li>תרגילים שנוצרו אוטומטית מסומנים ״לא נבדק״ עד שתאשרו אותם בעצמכם. אל תסתמכו על פתרון שלא בדקתם.</li>
            <li>
              פתרונות רשמיים לבחינות עבר:{' '}
              <a href="https://students.education.gov.il/matriculation-exams/solutions" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">
                אתר משרד החינוך
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}
