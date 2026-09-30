import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navbar } from './components/layout';

function Home() {
  const [backendStatus, setBackendStatus] = useState<string>('Checking connection...');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setBackendStatus(`Backend connected: ${data.status}`);
      })
      .catch(err => {
        console.error('Backend connection error:', err);
        setBackendStatus('Backend connection failed');
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-primary pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Snapdragon AI Privacy Guard</h1>
        <p className="mt-2 text-text-secondary">Frontend configured successfully</p>
        <div className="mt-4 p-3 border border-surfaceBorder rounded bg-surfaceHover">
          <p className={`text-sm ${backendStatus.includes('connected') ? 'text-green-400' : 'text-red-400'}`}>
            {backendStatus}
          </p>
        </div>
      </motion.div>
    </div>
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
