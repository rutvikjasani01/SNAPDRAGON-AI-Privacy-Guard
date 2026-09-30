import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout';
import { Hero } from './components/landing';

function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary pt-20">
      <Hero />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholders for upcoming routes to avoid 404s on nav links */}
        <Route path="/privacy" element={<div className="pt-24 text-center">Privacy Page (Coming Soon)</div>} />
        <Route path="/technology" element={<div className="pt-24 text-center">Technology Page (Coming Soon)</div>} />
        <Route path="/scan" element={<div className="pt-24 text-center">Scan Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
