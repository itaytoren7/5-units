import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MorePage } from './pages/MorePage';
import { NotFound } from './pages/NotFound';
import { SettingsPage } from './pages/SettingsPage';
import { SyllabusHub } from './pages/SyllabusHub';
import { SyllabusPage } from './pages/SyllabusPage';

const TopicPage = lazy(() => import('./pages/TopicPage').then((module) => ({ default: module.TopicPage })));
const PracticeHub = lazy(() => import('./pages/PracticeHub').then((module) => ({ default: module.PracticeHub })));
const PracticePage = lazy(() => import('./pages/PracticePage').then((module) => ({ default: module.PracticePage })));
const SimulatorHub = lazy(() => import('./pages/SimulatorHub').then((module) => ({ default: module.SimulatorHub })));
const SimulatorPage = lazy(() => import('./pages/SimulatorPage').then((module) => ({ default: module.SimulatorPage })));
const PlannerPage = lazy(() => import('./pages/PlannerPage').then((module) => ({ default: module.PlannerPage })));
const MistakesPage = lazy(() => import('./pages/MistakesPage').then((module) => ({ default: module.MistakesPage })));
const PastExamsPage = lazy(() => import('./pages/PastExamsPage').then((module) => ({ default: module.PastExamsPage })));
const DesignPreview = lazy(() => import('./pages/DesignPreview').then((module) => ({ default: module.DesignPreview })));
const LearnHub = lazy(() => import('./pages/LearnHub').then((module) => ({ default: module.LearnHub })));
const ChapterPage = lazy(() => import('./pages/ChapterPage').then((module) => ({ default: module.ChapterPage })));
const LessonPage = lazy(() => import('./pages/LessonPage').then((module) => ({ default: module.LessonPage })));
const FormulaSheetPage = lazy(() => import('./pages/FormulaSheetPage').then((module) => ({ default: module.FormulaSheetPage })));

function Loading() {
  return (
    <div className="grid min-h-[40vh] place-items-center text-sm text-muted" role="status">
      טוען…
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/syllabus" element={<SyllabusHub />} />
          <Route path="/syllabus/:code" element={<SyllabusPage />} />
          <Route path="/topic/:code/:topicId" element={<TopicPage />} />
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/learn/:chapterId" element={<ChapterPage />} />
          <Route path="/learn/:chapterId/:lessonId" element={<LessonPage />} />
          <Route path="/practice" element={<PracticeHub />} />
          <Route path="/practice/:problemId" element={<PracticePage />} />
          <Route path="/simulator" element={<SimulatorHub />} />
          <Route path="/simulator/:code" element={<SimulatorPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/mistakes" element={<MistakesPage />} />
          <Route path="/past-exams" element={<PastExamsPage />} />
          <Route path="/formulas" element={<FormulaSheetPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/design-preview" element={<DesignPreview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
