import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

import { useEffect, useState } from 'react';

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Snapdragon AI Privacy Guard</h1>
        <p className="mt-2 text-gray-400">Frontend configured successfully</p>
        <div className="mt-4 p-3 border border-gray-800 rounded bg-gray-900/50">
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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
