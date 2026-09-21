import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Preparation from './pages/Preparation';
import Interview from './pages/Interview';
import Coding from './pages/Coding';
import Resume from './pages/Resume';
import JobDescription from './pages/JobDescription';
import History from './pages/History';
import Settings from './pages/Settings';
import Overlay from './pages/Overlay';

export default function App() {
  const isOverlay = window.location.hash === '#/overlay';

  if (isOverlay) {
    return (
      <Routes>
        <Route path="/overlay" element={<Overlay />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', padding: 'var(--space-8)' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/job-description" element={<JobDescription />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
