import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout';
import { Hero, Storytelling, TechPreview } from './components/landing';
import { Scan } from './pages/Scan';
import { History } from './pages/History';
import { PrivacySimulator } from './pages/PrivacySimulator';
import { Performance } from './pages/Performance';
import { Technology } from './pages/Technology';
import { Settings } from './pages/Settings';
import { Models } from './pages/Models';

function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary pt-20">
      <Hero />
      <Storytelling />
      <TechPreview />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/history" element={<History />} />
        <Route path="/privacy" element={<PrivacySimulator />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </Router>
  );
}

export default App;
