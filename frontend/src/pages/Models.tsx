import React, { useState, useEffect } from 'react';
import { Cpu, Zap, BrainCircuit, Info, Save, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Models: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'STANDARD' | 'ADVANCED'>('STANDARD');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load from local storage mock on mount
  useEffect(() => {
    const saved = localStorage.getItem('privacy_guard_ai_model');
    if (saved) {
      setActiveModel(saved as 'STANDARD' | 'ADVANCED');
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    
    // Mock save delay
    setTimeout(() => {
      localStorage.setItem('privacy_guard_ai_model', activeModel);
      setIsSaving(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <BrainCircuit className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                AI Model Configuration
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Select the local inference engine.</p>
            </div>
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${
              showSuccess 
                ? 'bg-green-500 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : showSuccess ? (
              <span>Applied!</span>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Apply Model</span>
              </>
            )}
          </button>
        </div>

        {/* Model Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Standard Model */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setActiveModel('STANDARD')}
            className={`cursor-pointer bg-white dark:bg-gray-900 border-2 rounded-3xl p-8 transition-all relative overflow-hidden ${
              activeModel === 'STANDARD'
                ? 'border-red-500 shadow-md ring-4 ring-red-500/10'
                : 'border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-700/50'
            }`}
          >
            {activeModel === 'STANDARD' && (
              <div className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
            
            <div className="flex items-center space-x-3 mb-6">
              <Zap className={`w-8 h-8 ${activeModel === 'STANDARD' ? 'text-red-500' : 'text-gray-400'}`} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
                Standard Model
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 min-h-[4rem]">
              Optimized for maximum speed and minimal resource footprint. Best for everyday document scanning.
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Accuracy</span>
                  <span className="font-semibold text-gray-900 dark:text-white">High</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Speed (Latency)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Ultra Fast</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Memory Impact</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Low (~150MB)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced Model */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setActiveModel('ADVANCED')}
            className={`cursor-pointer bg-white dark:bg-gray-900 border-2 rounded-3xl p-8 transition-all relative overflow-hidden ${
              activeModel === 'ADVANCED'
                ? 'border-red-500 shadow-md ring-4 ring-red-500/10'
                : 'border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-700/50'
            }`}
          >
            {activeModel === 'ADVANCED' && (
              <div className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}

            <div className="flex items-center space-x-3 mb-6">
              <Cpu className={`w-8 h-8 ${activeModel === 'ADVANCED' ? 'text-red-500' : 'text-gray-400'}`} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
                Advanced Model
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 min-h-[4rem]">
              Complex deep learning architecture utilizing advanced NLP heuristics. Best for complex, unstructured legal or medical documents.
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Accuracy</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Maximum</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Speed (Latency)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Moderate</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Memory Impact</span>
                  <span className="font-semibold text-gray-900 dark:text-white">High (~800MB)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Tradeoff Explanation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-6 flex items-start space-x-4"
        >
          <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <div className="text-sm text-blue-900 dark:text-blue-300">
            <h4 className="font-bold mb-2 uppercase tracking-wide">Understanding Tradeoffs</h4>
            <p className="leading-relaxed">
              Running AI locally requires balancing hardware limitations. The <strong>Standard Model</strong> uses heavily quantized weights (INT8) to ensure it can run on virtually any device instantly without draining the battery. The <strong>Advanced Model</strong> uses higher precision weights (FP16/FP32) to catch complex edge cases, but requires significantly more RAM and may cause slight latency on older processors. Both models guarantee 100% data privacy.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
