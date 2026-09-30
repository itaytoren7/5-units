import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { calculateExamScore } from './data/examScoring';
import { buildStudyPlan } from './data/planner';
import { seededProblems } from './data/problems';
import { questionnaires } from './data/syllabus';
import type { Questionnaire, Rating, Status, Subtopic } from './data/syllabus/types';

const STORAGE_KEY = 'bagrut:v1';

type ScoreHistoryEntry = {
  id: string;
  questionnaireCode: string;
  score: number;
  answered: number;
  createdAt: string;
};

type MistakeEntry = {
  id: string;
  questionnaireCode: string;
  topicId: string;
  type: 'calculation' | 'understanding' | 'question-reading' | 'time';
  description: string;
  correctApproach: string;
  dueAt: string;
};

type SimulatorState = {
  selectedSlots: number[];
  answers: Record<number, number>;
  startedAt: string | null;
  secondsLeft: number;
};

type SavedState = {
  focusMode: 'focus-2026' | 'full';
  examDates: Record<string, string>;
  ratings: Record<string, Rating>;
  theme: 'light' | 'dark';
  scoreHistory: ScoreHistoryEntry[];
  mistakes: MistakeEntry[];
  simulator: Record<string, SimulatorState>;
  planner: {
    availableDays: number;
    weeklyHours: number;
  };
};

const initialState: SavedState = {
  focusMode: 'focus-2026',
  examDates: {},
  ratings: {},
  theme: 'light',
  scoreHistory: [],
  mistakes: [],
  simulator: {},
  planner: { availableDays: 5, weeklyHours: 8 },
};

function readSaved(): SavedState {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (value && typeof value === 'object') return { ...initialState, ...(value as Partial<SavedState>) };
  } catch { /* Use defaults if storage is unavailable or malformed. */ }
  return initialState;
}

function App() {
  const [saved, setSaved] = useState<SavedState>(readSaved);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    document.documentElement.dataset.theme = saved.theme;
  }, [saved]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const update = (patch: Partial<SavedState>) => setSaved((current) => ({ ...current, ...patch }));
  const setRating = (id: string, rating: Rating) => update({ ratings: { ...saved.ratings, [id]: rating } });
  const setExamDate = (code: string, date: string) => update({ examDates: { ...saved.examDates, [code]: date } });
  const persistSimulatorState = useCallback((code: string, state: Partial<SimulatorState>) => {
    setSaved((current) => ({
      ...current,
      simulator: {
        ...current.simulator,
        [code]: {
          selectedSlots: current.simulator[code]?.selectedSlots ?? [],
          answers: current.simulator[code]?.answers ?? {},
          startedAt: current.simulator[code]?.startedAt ?? null,
          secondsLeft: current.simulator[code]?.secondsLeft ?? 0,
          ...state,
        },
      },
    }));
  }, []);
  const addScore = useCallback((questionnaireCode: string, score: number, answered: number) => {
    setSaved((current) => ({
      ...current,
      scoreHistory: [{
        id: self.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        questionnaireCode,
        score,
        answered,
        createdAt: new Date().toISOString(),
      }, ...current.scoreHistory].slice(0, 15),
    }));
  }, []);
  const addMistake = useCallback((mistake: MistakeEntry) => {
    setSaved((current) => ({
      ...current,
      mistakes: [mistake, ...current.mistakes].slice(0, 30),
    }));
  }, []);
  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(saved, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'bagrut-backup.json'; link.click(); URL.revokeObjectURL(url);
    setToast('קובץ הגיבוי הורד');
  };
  const importBackup = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: unknown = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== 'object') throw new Error('invalid');
        setSaved({ ...initialState, ...(parsed as Partial<SavedState>) });
        setToast('הגיבוי נטען בהצלחה');
      } catch {
        setToast('קובץ הגיבוי אינו תקין');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand"><span className="brand-mark">5</span><span>חמש יחידות<small>מרכז הלמידה שלי</small></span></NavLink>
        <nav className="side-nav" aria-label="ניווט ראשי">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span>⌂</span>ראשי</NavLink>
          <div className="nav-caption">השאלונים שלי</div>
          {questionnaires.map((q) => <NavLink key={q.code} to={`/syllabus/${q.code}`} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span className="nav-dot">{q.nickname}</span>מיקוד ושאלון {q.nickname}</NavLink>)}
          <div className="nav-caption">כלים</div>
          {questionnaires.map((q) => <NavLink key={`${q.code}-sim`} to={`/simulator/${q.code}`} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span>⏱</span>סימולטור {q.nickname}</NavLink>)}
          <div className="nav-caption">הגדרות</div>
          <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span>⚙</span>הגדרות וגיבוי</NavLink>
        </nav>
        <div className="sidebar-bottom"><div className="mini-note"><span>✦</span><div><b>מתקדמים צעד־צעד</b><small>היעד: להגיע לבחינה בביטחון.</small></div></div><button className="theme-button" onClick={() => update({ theme: saved.theme === 'light' ? 'dark' : 'light' })}>{saved.theme === 'light' ? '◐ מצב כהה' : '☼ מצב בהיר'}</button></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div className="breadcrumb">מרחב הלמידה <span>/</span> {location.pathname.startsWith('/settings') ? 'הגדרות' : location.pathname.startsWith('/simulator') ? 'סימולטור' : location.pathname.startsWith('/syllabus') ? 'מפת הסילבוס' : 'סקירה כללית'}</div><button className="avatar" aria-label="העדפות תצוגה" onClick={() => update({ theme: saved.theme === 'light' ? 'dark' : 'light' })}>ת</button></header>
        <Routes>
          <Route path="/" element={<Dashboard saved={saved} onNavigate={navigate} />} />
          <Route path="/syllabus/:code" element={<SyllabusPage saved={saved} onRating={setRating} onFocus={(focusMode) => update({ focusMode })} />} />
          <Route path="/topic/:code/:topicId" element={<TopicPage />} />
          <Route path="/simulator/:code" element={<SimulatorPage saved={saved} onPersist={persistSimulatorState} onSaveHistory={addScore} onSaveMistake={addMistake} />} />
          <Route path="/settings" element={<Settings saved={saved} onFocus={(focusMode) => update({ focusMode })} onDate={setExamDate} onPlanner={(plannerPatch) => update({ planner: { ...saved.planner, ...plannerPatch } })} onExport={exportBackup} onImport={importBackup} onReset={() => { localStorage.removeItem(STORAGE_KEY); setSaved(initialState); setToast('הנתונים אופסו'); }} />} />
          <Route path="*" element={<div className="empty-state"><h2>העמוד לא נמצא</h2><NavLink to="/">חזרה לראשי</NavLink></div>} />
        </Routes>
        <footer className="page-footer">נבנה ללמידה מסודרת · תוכנית קיץ 2026 <span>✦</span></footer>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function progressOf(questionnaire: Questionnaire, ratings: Record<string, Rating>) {
  const inScope = questionnaire.topics.flatMap((topic) => topic.subtopics).filter((subtopic) => subtopic.status === 'in');
  const done = inScope.filter((subtopic) => ratings[subtopic.id] === 'mastered' || ratings[subtopic.id] === 'medium').length;
  return { done, total: inScope.length, percent: inScope.length ? Math.round((done / inScope.length) * 100) : 0 };
}

function Dashboard({ saved, onNavigate }: { saved: SavedState; onNavigate: (path: string) => void }) {
  const allProgress = questionnaires.reduce((sum, q) => sum + progressOf(q, saved.ratings).percent, 0) / questionnaires.length;
  const upcomingMistakes = [...saved.mistakes].slice(0, 3);

  return <div className="page-wrap">
    <section className="welcome"><div className="welcome-copy"><div className="eyebrow"><span className="eyebrow-star">✦</span> הדרך שלך לבגרות מתחילה כאן</div><h1>כל צעד קטן מקרב<br />אותך ל־<em>100</em></h1><p>תוכנית הלמידה האישית שלך לבגרות במתמטיקה 5 יחידות.<br className="desktop-break" /> נלמד חכם, נתקדם בקצב שלך ונגיע מוכנים.</p><button className="primary-button" onClick={() => onNavigate('/syllabus/35581')}>למפת הלמידה שלי <span>←</span></button></div><div className="welcome-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-core"><span>∑</span><small>5 יח״ל</small></div><i className="spark spark-a">✦</i><i className="spark spark-b">✧</i><i className="spark spark-c">·</i></div><div className="welcome-foot"><span>✦</span> כל מה שצריך לדעת, במקום אחד</div></section>
    <section className="section-heading"><div><span className="section-kicker">המסלול שלך</span><h2>השאלונים שלי</h2></div><div className="overall-progress"><span>התקדמות כוללת</span><b>{Math.round(allProgress)}%</b></div></section>
    <div className="exam-grid">{questionnaires.map((questionnaire) => <ExamCard key={questionnaire.code} questionnaire={questionnaire} saved={saved} onClick={() => onNavigate(`/syllabus/${questionnaire.code}`)} onSetDate={() => onNavigate('/settings')} />)}</div>
    <div className="home-lower"><section className="info-card focus-card"><div className="card-icon purple-icon">✦</div><div><span className="section-kicker">סדר למידה מומלץ</span><h3>מתחילים בצהוב, מסיימים בכחול</h3><p>נתחיל מהשאלות המומלצות ללמידה מוקדמת, ונשמור את השאלות הכחולות לסוף.</p></div><button className="text-button" onClick={() => onNavigate('/settings')}>לכל ההגדרות ←</button></section><section className="info-card date-card"><div className="card-icon mint-icon">◷</div><div><span className="section-kicker">הבחינה הבאה</span><h3>{nextExamLabel(saved.examDates)}</h3><p>הגדר תאריך בחינה כדי להפעיל ספירה לאחור.</p></div><button className="text-button" onClick={() => onNavigate('/settings')}>הגדרת תאריך ←</button></section></div>
    <section className="settings-card">
      <div className="settings-heading"><span className="settings-icon green-icon">⏱</span><div><h2>סימולטור + תור חזרות</h2><p>בצע סימולציות בזמן אמת וקבע חזרות על טעויות.</p></div></div>
      <div className="choice-row">{questionnaires.map((q) => <button key={q.code} className="choice active" onClick={() => onNavigate(`/simulator/${q.code}`)}><b>שאלון {q.nickname}</b><small>סימולטור · {q.durationMinutes} דק׳</small></button>)}</div>
      {upcomingMistakes.length > 0 ? <ul className="mistake-queue">{upcomingMistakes.map((mistake) => <li key={mistake.id}><strong>{questionnaires.find((item) => item.code === mistake.questionnaireCode)?.nickname ?? mistake.questionnaireCode}</strong><span>{mistake.type}</span><small>חזרה מתוכננת: {new Date(mistake.dueAt).toLocaleDateString('he-IL')}</small></li>)}</ul> : <p className="page-intro">אין חזרות מתוכננות כרגע.</p>}
    </section>
  </div>;
}

function nextExamLabel(dates: Record<string, string>) {
  const next = questionnaires.map((q) => dates[q.code]).filter((date): date is string => Boolean(date)).sort()[0];
  if (!next) return 'עוד לא נקבע';
  const days = Math.ceil((new Date(`${next}T23:59:59`).getTime() - Date.now()) / 86400000);
  return days >= 0 ? `עוד ${days} ימים` : 'מועד הבחינה עבר';
}

function ExamCard({ questionnaire, saved, onClick, onSetDate }: { questionnaire: Questionnaire; saved: SavedState; onClick: () => void; onSetDate: () => void }) {
  const progress = progressOf(questionnaire, saved.ratings);
  const date = saved.examDates[questionnaire.code];
  const dayCount = date ? Math.max(0, Math.ceil((new Date(`${date}T23:59:59`).getTime() - Date.now()) / 86400000)) : null;
  const hours = Math.floor(questionnaire.durationMinutes / 60);
  const minutes = questionnaire.durationMinutes % 60;
  return <article className={`exam-card card-${questionnaire.nickname}`}>
    <div className="exam-card-top"><span className="exam-tag">שאלון {questionnaire.nickname}</span><span className="exam-weight">{questionnaire.weightPercent}% <small>מהציון</small></span></div>
    <h3>שאלון {questionnaire.nickname}</h3><p className="exam-subtitle">מפת למידה אישית לפי הסילבוס והמיקוד</p>
    <div className="exam-facts"><span><b>◷</b>{hours} שעות{minutes ? ` ו־${minutes} דק׳` : ''}</span><span><b>▤</b> {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions} שאלות</span><span><b>✦</b>{questionnaire.pointsPerQuestion % 1 ? '33⅓' : questionnaire.pointsPerQuestion} נק׳ לשאלה · ציון עד 100</span></div>
    <div className="exam-progress-row"><div><span>התקדמות בסילבוס</span><b>{progress.percent}%</b></div><div className="progress-track"><i style={{ width: `${progress.percent}%` }} /></div></div>
    <div className="exam-card-footer"><span className="countdown"><b>◷</b>{dayCount === null ? <button onClick={onSetDate}>הגדר תאריך בחינה</button> : `עוד ${dayCount} ימים`}</span><button className="round-arrow" aria-label={`פתיחת שאלון ${questionnaire.nickname}`} onClick={onClick}>←</button></div>
  </article>;
}

const statusLabels: Record<Status, string> = { in: 'בבגרות', 'out-original': 'לא בבגרות', 'out-2026': 'הורדה 2026' };

function SyllabusPage({ saved, onRating, onFocus }: { saved: SavedState; onRating: (id: string, rating: Rating) => void; onFocus: (focusMode: SavedState['focusMode']) => void }) {
  const { code = '' } = useParams();
  const questionnaire = questionnaires.find((q) => q.code === code);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activePart, setActivePart] = useState('הכול');
  if (!questionnaire) return <div className="page-wrap"><h1>השאלון לא נמצא</h1></div>;
  const parts = [...new Set(questionnaire.slots.map((slot) => slot.part))];
  const slots = activePart === 'הכול' ? questionnaire.slots : questionnaire.slots.filter((slot) => slot.part === activePart);
  const linkedTopicIds = new Set(questionnaire.slots.flatMap((slot) => slot.topicIds));
  const generalTopics = questionnaire.topics.filter((topic) => !linkedTopicIds.has(topic.id));
  const completed = progressOf(questionnaire, saved.ratings);
  const isFocus = saved.focusMode === 'focus-2026';
  const flip = (id: string) => setExpanded((current) => ({ ...current, [id]: !current[id] }));
  return <div className="page-wrap syllabus-page">
    <div className="page-title-row"><div><div className="eyebrow">מפת הסילבוס · שאלון {questionnaire.nickname}</div><h1>מה לומדים לבגרות?</h1><p className="page-intro">כל הנושאים, מסודרים לפי מבנה השאלון וסדר הלמידה המומלץ.</p></div><div className="syllabus-progress"><ProgressRing percent={completed.percent} /><div><b>{completed.percent}%</b><span>מהחומר שבבגרות</span></div></div></div>
    <div className="rules-strip"><span>◷ {Math.floor(questionnaire.durationMinutes / 60)} שעות{questionnaire.durationMinutes % 60 ? ` ו־${questionnaire.durationMinutes % 60} דק׳` : ''}</span><span>▤ עונים על {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions}</span><span>✦ {questionnaire.pointsPerQuestion % 1 ? '33⅓' : questionnaire.pointsPerQuestion} נק׳ לשאלה · עד {questionnaire.maxScore}</span><span>{questionnaire.weightPercent}% מהציון</span><span>{questionnaire.chapterRestriction ? 'יש הגבלת פרקים' : 'אין הגבלת פרקים'}</span></div>
    {questionnaire.warnings.map((warning) => <div className="warning-banner" key={warning}><b>!</b>{warning}</div>)}
    {questionnaire.partNotes['כללי'] && <div className="general-note">{questionnaire.partNotes['כללי']}</div>}
    <div className="syllabus-controls"><div className="part-tabs"><button className={activePart === 'הכול' ? 'selected' : ''} onClick={() => setActivePart('הכול')}>הכול</button>{parts.map((part) => <button key={part} className={activePart === part ? 'selected' : ''} onClick={() => setActivePart(part)}>פרק {part}</button>)}</div><div className="focus-toggle"><span>{isFocus ? 'מיקוד 2026' : 'הסילבוס המלא'}</span><button role="switch" aria-checked={isFocus} className={`switch ${isFocus ? 'on' : ''}`} onClick={() => onFocus(isFocus ? 'full' : 'focus-2026')}><i /></button></div></div>
    {generalTopics.length > 0 && <section className="general-topics"><h2>נושאי בסיס וטכניקה</h2>{generalTopics.map((topic) => <TopicSection key={topic.id} topic={topic} visibleSubtopics={topic.subtopics} fullMode={!isFocus} ratings={saved.ratings} onRating={onRating} onOpenTopic={(topicId) => navigate(`/topic/${questionnaire.code}/${topicId}`)} />)}</section>}
    <div className="syllabus-columns"><div className="slots-column"><div className="column-label"><span>השאלות בבחינה</span><small>צהוב קודם · כחול בסוף</small></div>{slots.map((slot) => {
      const topics = slot.topicIds.map((id) => questionnaire.topics.find((topic) => topic.id === id)).filter((topic): topic is Questionnaire['topics'][number] => Boolean(topic));
      const subtopics = topics.flatMap((topic) => topic.subtopics);
      const allForProgress = topics.flatMap((topic) => topic.subtopics).filter((subtopic) => subtopic.status === 'in');
      const mastered = allForProgress.filter((subtopic) => saved.ratings[subtopic.id] === 'mastered' || saved.ratings[subtopic.id] === 'medium').length;
      return <section className="slot-card" key={slot.number}><button className="slot-heading" onClick={() => flip(`slot-${slot.number}`)}><span className={`slot-number ${slot.priority}`}>{String(slot.number).padStart(2, '0')}</span><span className="slot-title"><span className="slot-part">פרק {slot.part} · שאלה {slot.number}</span><b>{slot.title}</b></span><span className={`priority-badge ${slot.priority}`}>{slot.priority === 'yellow' ? 'ללמוד קודם' : 'ללמוד בסוף'}</span><span className="slot-percent">{allForProgress.length ? Math.round((mastered / allForProgress.length) * 100) : 0}%</span><span className={`chevron ${expanded[`slot-${slot.number}`] ? 'open' : ''}`}>⌄</span></button>
      {slot.note && <p className="slot-note">{slot.note}</p>}{questionnaire.partNotes[slot.part] && questionnaire.slots.find((item) => item.part === slot.part)?.number === slot.number && <p className="part-note">{questionnaire.partNotes[slot.part]}</p>}
      {!expanded[`slot-${slot.number}`] && <div className="slot-progress"><i style={{ width: `${allForProgress.length ? (mastered / allForProgress.length) * 100 : 0}%` }} /></div>}
      {expanded[`slot-${slot.number}`] && <div className="slot-topics">{topics.map((topic) => <TopicSection key={topic.id} topic={topic} visibleSubtopics={subtopics.filter((subtopic) => topic.subtopics.some((item) => item.id === subtopic.id))} fullMode={!isFocus} ratings={saved.ratings} onRating={onRating} onOpenTopic={(topicId) => navigate(`/topic/${questionnaire.code}/${topicId}`)} />)}</div>}
      </section>;
    })}</div><aside className="syllabus-side"><div className="legend-card"><h3>איך לקרוא את המפה?</h3><div className="legend-item"><i className="legend-dot green"/> בבגרות</div><div className="legend-item"><i className="legend-dot red"/> לא בבגרות</div><div className="legend-item"><i className="legend-dot orange"/> הורדה 2026</div><div className="legend-kept">✓ נשאר במפורש</div><hr/><p>ההתקדמות מחושבת רק על תתי־נושאים שמופיעים בבגרות.</p></div><div className="study-tip"><span>✧</span><b>טיפ ללמידה</b><p>סמנ/י את רמת השליטה שלך בכל נושא. כך אפשר לזהות בקלות במה כדאי להתמקד.</p></div></aside></div>
  </div>;
}

function TopicPage() {
  const { code = '', topicId = '' } = useParams();
  const questionnaire = questionnaires.find((q) => q.code === code);
  const topic = questionnaire?.topics.find((entry) => entry.id === topicId);
  const practice = seededProblems.filter((problem) => problem.questionnaire === code && problem.topicId === topicId);

  if (!questionnaire || !topic) {
    return <div className="page-wrap"><h1>הנושא לא נמצא</h1></div>;
  }

  const inSubtopics = topic.subtopics.filter((item) => item.status === 'in');
  const outSubtopics = topic.subtopics.filter((item) => item.status !== 'in');

  return <div className="page-wrap topic-page">
    <div className="page-title-row"><div><div className="eyebrow">תרגול · שאלון {questionnaire.nickname}</div><h1>{topic.title}</h1><p className="page-intro">תקציר, דוגמאות עבודה ומאגר תרגילים לפי המיקוד.</p></div></div>
    <section className="settings-card"><div className="settings-heading"><span className="settings-icon purple">✦</span><div><h2>תקציר הנושא</h2><p>עיקרי הנושאים שנשארו בבגרות.</p></div></div>
      <ul className="topic-summary-list">{inSubtopics.map((subtopic) => <li key={subtopic.id}><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{subtopic.title}</ReactMarkdown>{subtopic.keptExplicitly && <span className="kept-badge">✓ נשאר במפורש</span>}</li>)}</ul>
      {outSubtopics.length > 0 && <details className="out-topic-list"><summary>לא בבגרות</summary>{outSubtopics.map((item) => <div className="out-topic-item" key={item.id}><span className={`legend-dot ${item.status === 'out-2026' ? 'orange' : 'red'}`} /> <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{item.title}</ReactMarkdown></div>)}</details>}
    </section>
    <section className="settings-card"><div className="settings-heading"><span className="settings-icon green-icon">✓</span><div><h2>תרגילים לדוגמה</h2><p>תרגול מבוסס על מאגר הבעיות המנוהל.</p></div></div>
      {practice.length === 0 ? <p className="page-intro">אין דוגמאות לתרגול עדיין לנושא הזה.</p> : practice.map((problem) => <article className="practice-card" key={problem.id}><div className="practice-header"><span>שאלה {problem.slot}</span><span>קושי {problem.difficulty}</span><span className={problem.verified ? 'verified-pill' : 'needs-check-pill'}>{problem.verified ? 'נבדק' : '⚠ לא נבדק'}</span></div>{problem.sections.map((section) => <div className="practice-section" key={section.id}><h3>סעיף {section.label}</h3><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{section.statement}</ReactMarkdown>{section.hints.length > 0 && <ul>{section.hints.map((hint) => <li key={hint}><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{hint}</ReactMarkdown></li>)}</ul>}{section.finalAnswer && <div className="answer-box"><strong>תשובה:</strong><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{section.finalAnswer}</ReactMarkdown></div>}</div>)}</article>)}
    </section>
  </div>;
}

function TopicSection({ topic, visibleSubtopics, fullMode, ratings, onRating, onOpenTopic }: { topic: Questionnaire['topics'][number]; visibleSubtopics: Subtopic[]; fullMode: boolean; ratings: Record<string, Rating>; onRating: (id: string, rating: Rating) => void; onOpenTopic?: (topicId: string) => void }) {
  const [open, setOpen] = useState(true);
  const [outOpen, setOutOpen] = useState(fullMode);
  useEffect(() => setOutOpen(fullMode), [fullMode]);
  const included = visibleSubtopics.filter((subtopic) => subtopic.status === 'in');
  const excluded = visibleSubtopics.filter((subtopic) => subtopic.status !== 'in');
  return <div className="topic-block">
    <div className="topic-header">
      <button className="topic-title" onClick={() => setOpen(!open)}><span>{topic.title}</span><span>{open ? '−' : '+'}</span></button>
      {onOpenTopic && <button className="topic-link" onClick={() => onOpenTopic(topic.id)}>לתרגול</button>}
    </div>
    {topic.note && <div className="topic-note"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{topic.note}</ReactMarkdown></div>}{open && <div className="subtopic-list">{included.map((subtopic) => <SubtopicRow key={subtopic.id} subtopic={subtopic} rating={ratings[subtopic.id] ?? 'not-started'} onRating={onRating} />)}{excluded.length > 0 && <><button className="excluded-heading" onClick={() => setOutOpen(!outOpen)}><span>נושאים מחוץ לבגרות</span><b>{excluded.length}</b><span>{outOpen ? '⌃' : '⌄'}</span></button>{outOpen && excluded.map((subtopic) => <OutSubtopic key={subtopic.id} subtopic={subtopic} />)}</>}</div>}
  </div>;
}

function SubtopicRow({ subtopic, rating, onRating }: { subtopic: Subtopic; rating: Rating; onRating: (id: string, rating: Rating) => void }) {
  return <div className="subtopic-row"><div className="subtopic-main"><i className="legend-dot green"/><div className="subtopic-text"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{subtopic.title}</ReactMarkdown>{subtopic.note && <small>{subtopic.note}</small>}{subtopic.keptExplicitly && <span className="kept-badge">✓ נשאר במפורש</span>}</div></div><select aria-label={`רמת שליטה: ${subtopic.title}`} value={rating} onChange={(event) => onRating(subtopic.id, event.target.value as Rating)}><option value="not-started">לא התחלתי</option><option value="weak">חלש</option><option value="medium">בינוני</option><option value="mastered">שולט</option></select></div>;
}

function OutSubtopic({ subtopic }: { subtopic: Subtopic }) {
  const [open, setOpen] = useState(false);
  return <div className={`out-row out-status-${subtopic.status}`}><button onClick={() => setOpen(!open)}><i className={`legend-dot ${subtopic.status === 'out-2026' ? 'orange' : 'red'}`} /><span className="out-label"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={{ p: ({ children }) => <span>{children}</span> }}>{subtopic.title}</ReactMarkdown></span><b>{statusLabels[subtopic.status]}</b><span>{open ? '⌃' : '⌄'}</span></button>{open && subtopic.note && <div className="out-note"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{subtopic.note}</ReactMarkdown></div>}</div>;
}

function ProgressRing({ percent }: { percent: number }) {
  return <div className="progress-ring" style={{ '--progress': `${percent * 3.6}deg` } as React.CSSProperties}><div>{percent}%</div></div>;
}

function SimulatorPage({ saved, onPersist, onSaveHistory, onSaveMistake }: { saved: SavedState; onPersist: (code: string, state: Partial<SimulatorState>) => void; onSaveHistory: (questionnaireCode: string, score: number, answered: number) => void; onSaveMistake: (mistake: MistakeEntry) => void }) {
  const { code = '' } = useParams();
  const questionnaire = questionnaires.find((q) => q.code === code) ?? questionnaires[0];
  const yellowSlots = questionnaire.slots.filter((slot) => slot.priority === 'yellow').map((slot) => slot.number);
  const blueSlots = questionnaire.slots.filter((slot) => slot.priority === 'blue').map((slot) => slot.number);
  const defaultSlots = [...yellowSlots, ...blueSlots].slice(0, questionnaire.questionsToAnswer);
  const persisted = saved.simulator[questionnaire.code] ?? { selectedSlots: defaultSlots, answers: Object.fromEntries(defaultSlots.map((slot) => [slot, 0])), startedAt: null, secondsLeft: questionnaire.durationMinutes * 60 };
  const [selectedSlots, setSelectedSlots] = useState<number[]>(persisted.selectedSlots);
  const [answers, setAnswers] = useState<Record<number, number>>(persisted.answers);
  const [startedAt, setStartedAt] = useState<string | null>(persisted.startedAt);
  const [secondsLeft, setSecondsLeft] = useState<number>(persisted.secondsLeft);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const nextState = { selectedSlots, answers, startedAt, secondsLeft };
    onPersist(questionnaire.code, nextState);
  }, [questionnaire.code, selectedSlots, startedAt, secondsLeft, onPersist]);

  useEffect(() => {
    if (!startedAt || completed) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setCompleted(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt, completed]);

  const activeProblemCount = selectedSlots.length;
  const score = useMemo(() => calculateExamScore(questionnaire.code as '35581' | '35582', selectedSlots.map((slot) => ({ slot, fraction: answers[slot] ?? 0 }))), [questionnaire.code, selectedSlots, answers]);

  const toggleSlot = (slotNumber: number) => {
    setSelectedSlots((current) => {
      if (current.includes(slotNumber)) {
        const next = current.filter((slot) => slot !== slotNumber);
        setAnswers((answerState) => {
          const copy = { ...answerState };
          delete copy[slotNumber];
          return copy;
        });
        return next;
      }
      return [...current, slotNumber].sort((a, b) => a - b);
    });
  };

  const finishExam = () => {
    setCompleted(true);
    const finalScore = calculateExamScore(questionnaire.code as '35581' | '35582', selectedSlots.map((slot) => ({ slot, fraction: answers[slot] ?? 0 })));
    onSaveHistory(questionnaire.code, finalScore, selectedSlots.length);
    setStartedAt(null);
    setSecondsLeft(questionnaire.durationMinutes * 60);
  };

  const addMistake = (slot: number) => {
    const topicId = questionnaire.slots.find((entry) => entry.number === slot)?.topicIds[0] ?? 'general';
    const description = `שאלה ${slot} ב-${questionnaire.nickname}: ${answers[slot] ?? 0} מתוך 1`;
    onSaveMistake({
      id: `${questionnaire.code}-${slot}-${Date.now()}`,
      questionnaireCode: questionnaire.code,
      topicId,
      type: 'calculation',
      description,
      correctApproach: 'חזור על הפתרון, בדוק את ההגיון הסיבתתי ונסח את התשובה מחדש.',
      dueAt: new Date(Date.now() + 3 * 86400000).toISOString(),
    });
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const alertLevel = secondsLeft <= 1800 && secondsLeft > 600 ? 'שימו לב: נותרו 30 דקות.' : secondsLeft <= 600 ? 'שימו לב: נותרו 10 דקות.' : 'הסימולטור פעיל';

  return <div className="page-wrap settings-page">
    <div className="eyebrow">סימולטור · שאלון {questionnaire.nickname}</div>
    <h1>בחינת דמה</h1>
    <p className="page-intro">בחר/י אילו שאלות אתה רוצה לענות, קבע ציון עצמי, ולמד מהטעויות.</p>
    <section className="settings-card">
      <div className="settings-heading"><span className="settings-icon purple">⏱</span><div><h2>זמן ושאלה</h2><p>{alertLevel}</p></div></div>
      <div className="choice-row">
        <button className="choice active" onClick={() => { if (!startedAt) setStartedAt(new Date().toISOString()); }}><b>{startedAt ? `${minutes}:${String(seconds).padStart(2, '0')}` : 'התחל סימולציה'}</b><small>{questionnaire.durationMinutes} דקות כולל</small></button>
        <button className="choice" onClick={finishExam}><b>סיימתי</b><small>שמור ציון והיסטוריה</small></button>
      </div>
      <div className="exam-facts">
        <span><b>▤</b> נבחרו {activeProblemCount} שאלות</span>
        <span><b>✦</b> ציון נוכחי: {score}</span>
      </div>
    </section>

    <section className="settings-card">
      <div className="settings-heading"><span className="settings-icon green-icon">✓</span><div><h2>בחירת שאלות</h2><p>בחר/י את מספר השאלות לבחינה. ברירת המחדל היא לפי סדר הלמידה המומלץ.</p></div></div>
      <div className="choice-row">
        {questionnaire.slots.map((slot) => <button key={slot.number} className={selectedSlots.includes(slot.number) ? 'choice active' : 'choice'} onClick={() => toggleSlot(slot.number)}><b>שאלה {slot.number}</b><small>{slot.title}</small></button>)}
      </div>
    </section>

    <section className="settings-card">
      <div className="settings-heading"><span className="settings-icon">✦</span><div><h2>הערכה עצמית</h2><p>הגדר לכל שאלה באיזו מידה ענית נכון.</p></div></div>
      {selectedSlots.length === 0 ? <p className="page-intro">לא נבחרו שאלות עדיין.</p> : selectedSlots.map((slot) => {
        const slotMeta = questionnaire.slots.find((entry) => entry.number === slot);
        const problem = seededProblems.find((entry) => entry.questionnaire === questionnaire.code && entry.slot === slot) ?? null;
        return <div className="practice-card" key={slot}>
          <div className="practice-header"><span>שאלה {slot}</span><span>{slotMeta?.title ?? 'שאלה'}</span><button className="text-button" onClick={() => addMistake(slot)}>רשום טעות</button></div>
          {problem ? <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{problem.sections[0]?.statement ?? 'שאלה ללא טקסט'}</ReactMarkdown> : <p>אין תרגיל מאגר לשאלה זו — יש לתרגל אותה באופן עצמאי.</p>}
          <label className="date-setting"><span>הערכת דיוק</span><select value={answers[slot] ?? 0} onChange={(event) => setAnswers((current) => ({ ...current, [slot]: Number(event.target.value) }))}><option value={0}>לא פתרתי / טעיתי</option><option value={0.5}>חלקית</option><option value={1}>הצלחתי</option></select></label>
        </div>;
      })}
    </section>

    <section className="settings-card">
      <div className="settings-heading"><span className="settings-icon purple">⇩</span><div><h2>דף נוסחאות אישי</h2><p>מכיל את הנוסחאות המרכזיות של השאלון והחומר הספציפי.</p></div></div>
      <ul className="topic-summary-list">
        <li>שיפוע ומשיק</li>
        <li><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{'נגזרת של $x^n$, $e^x$, $\\frac{1}{x}$, $\\tan x$'}</ReactMarkdown></li>
        <li><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{'אינטגרל של פולינום, $\\frac{f\'(x)}{f(x)}$, $\\frac{1}{x}$'}</ReactMarkdown></li>
        <li><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{'נוסחאות טריגו: $\\tan x = \\frac{\\sin x}{\\cos x}$, $\\sin^2 x + \\cos^2 x = 1$'}</ReactMarkdown></li>
        <li>שטח בין גרפים ואינטגרל מסוים</li>
      </ul>
    </section>
  </div>;
}

function Settings({ saved, onFocus, onDate, onPlanner, onExport, onImport, onReset }: { saved: SavedState; onFocus: (focusMode: SavedState['focusMode']) => void; onDate: (code: string, date: string) => void; onPlanner: (plannerPatch: Partial<SavedState['planner']>) => void; onExport: () => void; onImport: (file?: File) => void; onReset: () => void }) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [plannerCode, setPlannerCode] = useState(questionnaires[0].code);
  const plannerEntries = buildStudyPlan(plannerCode, { availableDays: saved.planner.availableDays, weeklyHours: saved.planner.weeklyHours, ratings: saved.ratings });

  return <div className="page-wrap settings-page"><div className="eyebrow">התאמה אישית</div><h1>הגדרות וגיבוי</h1><p className="page-intro">נהל/י את סביבת הלמידה ואת הנתונים האישיים שלך.</p>
    <section className="settings-card"><div className="settings-heading"><span className="settings-icon">◷</span><div><h2>תאריכי בחינה</h2><p>הוסיפו תאריך כדי לראות ספירה לאחור בלוח הבקרה.</p></div></div>{questionnaires.map((q) => <label className="date-setting" key={q.code}><span><b>שאלון {q.nickname}</b><small>{q.code}</small></span><input type="date" value={saved.examDates[q.code] ?? ''} onChange={(event) => onDate(q.code, event.target.value)} /></label>)}</section>
    <section className="settings-card"><div className="settings-heading"><span className="settings-icon purple">◉</span><div><h2>תצוגת מיקוד</h2><p>בחרו אם להציג רק את חומר הבחינה או את הסילבוס המלא.</p></div></div><div className="choice-row"><button className={saved.focusMode === 'focus-2026' ? 'choice active' : 'choice'} onClick={() => onFocus('focus-2026')}><b>מיקוד 2026</b><small>נושאים שירדו יוצגו כשהם מוסתרים</small></button><button className={saved.focusMode === 'full' ? 'choice active' : 'choice'} onClick={() => onFocus('full')}><b>סילבוס מלא</b><small>כולל נושאים שירדו בעבר או ב-2026</small></button></div></section>

    <section className="settings-card"><div className="settings-heading"><span className="settings-icon green-icon">🗓</span><div><h2>תכנון שבועי</h2><p>סדר לימוד שמתחיל בצהוב, מתחשב בחולשה שלך ומתחלק על פני הימים הזמינים.</p></div></div>
      <div className="date-setting"><span>שאלון</span><select value={plannerCode} onChange={(event) => setPlannerCode(event.target.value)}>{questionnaires.map((questionnaire) => <option key={questionnaire.code} value={questionnaire.code}>שאלון {questionnaire.nickname}</option>)}</select></div>
      <div className="date-setting"><span>ימים בשבוע</span><input type="number" min={1} max={7} value={saved.planner.availableDays} onChange={(event) => onPlanner({ availableDays: Number(event.target.value) || 1 })} /></div>
      <div className="date-setting"><span>שעות שבועיות</span><input type="number" min={1} max={30} value={saved.planner.weeklyHours} onChange={(event) => onPlanner({ weeklyHours: Number(event.target.value) || 1 })} /></div>
      <ul className="topic-summary-list">{plannerEntries.map((entry) => <li key={`${plannerCode}-${entry.slot}`}><strong>שאלה {entry.slot}</strong> · {entry.title} · {entry.priority === 'yellow' ? 'צהוב' : 'כחול'} · {entry.hours}h · יום {entry.day}</li>)}</ul>
    </section>

    <section className="settings-card"><div className="settings-heading"><span className="settings-icon green-icon">⇧</span><div><h2>גיבוי הנתונים</h2><p>ההתקדמות נשמרת במכשיר הזה בלבד. מומלץ לייצא גיבוי מדי פעם.</p></div></div><div className="backup-actions"><button className="primary-button" onClick={onExport}>ייצוא גיבוי JSON</button><label className="secondary-button">ייבוא קובץ גיבוי<input type="file" accept="application/json,.json" hidden onChange={(event) => onImport(event.target.files?.[0])} /></label></div><div className="danger-zone"><div><b>איפוס כל הנתונים</b><small>ימחק תאריכים, הערכות והעדפות מהמכשיר.</small></div>{confirmReset ? <div className="confirm-actions"><button onClick={onReset}>כן, לאפס</button><button onClick={() => setConfirmReset(false)}>ביטול</button></div> : <button className="danger-button" onClick={() => setConfirmReset(true)}>איפוס</button>}</div></section>
  </div>;
}

export default App;
