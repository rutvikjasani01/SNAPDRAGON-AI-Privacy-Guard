import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Monitor, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppSettings {
  redactionStyle: 'SOLID_BLACK' | 'PIXELATED' | 'BLURRED';
  hardwarePreference: 'AUTO' | 'NPU' | 'GPU' | 'CPU';
  retentionPolicy: 'DELETE_IMMEDIATELY' | 'KEEP_UNTIL_SESSION_END' | 'KEEP_24_HOURS';
}

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    redactionStyle: 'SOLID_BLACK',
    hardwarePreference: 'AUTO',
    retentionPolicy: 'DELETE_IMMEDIATELY'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load from local storage mock on mount
  useEffect(() => {
    const saved = localStorage.getItem('privacy_guard_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    
    // Mock save delay
    setTimeout(() => {
      localStorage.setItem('privacy_guard_settings', JSON.stringify(settings));
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
            <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-xl">
              <SettingsIcon className="w-8 h-8 text-gray-900 dark:text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                Application Settings
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Configure local application behavior.</p>
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
              <span>Saved!</span>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-8">
          
          {/* Default Redaction Style */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Shield className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                Default Redaction Style
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'SOLID_BLACK', label: 'Solid Black', desc: 'Maximum security masking' },
                { id: 'PIXELATED', label: 'Pixelated', desc: 'Visual context maintained' },
                { id: 'BLURRED', label: 'Blurred', desc: 'Smooth obscuration' }
              ].map(style => (
                <div 
                  key={style.id}
                  onClick={() => setSettings({...settings, redactionStyle: style.id as any})}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    settings.redactionStyle === style.id 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-700/50'
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-white mb-1">{style.label}</div>
                  <div className="text-sm text-gray-500">{style.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hardware Acceleration Preference */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Monitor className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                Hardware Acceleration
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'AUTO', label: 'Auto (Recommended)' },
                { id: 'NPU', label: 'Force NPU' },
                { id: 'GPU', label: 'Force GPU' },
                { id: 'CPU', label: 'Force CPU' }
              ].map(hw => (
                <div 
                  key={hw.id}
                  onClick={() => setSettings({...settings, hardwarePreference: hw.id as any})}
                  className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-all ${
                    settings.hardwarePreference === hw.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700/50'
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{hw.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              * Auto will attempt to use the Snapdragon NPU via Qualcomm AI Hub when available, falling back to GPU or CPU.
            </p>
          </motion.div>

          {/* Retention Policy */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <Clock className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                Local Retention Policy
              </h2>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'DELETE_IMMEDIATELY', label: 'Delete Immediately (Safest)', desc: 'Files are wiped from RAM/Temp immediately after download or navigating away.' },
                { id: 'KEEP_UNTIL_SESSION_END', label: 'Keep Until Session End', desc: 'Files remain in memory until the application is closed.' },
                { id: 'KEEP_24_HOURS', label: 'Keep for 24 Hours', desc: 'Allows reviewing history for the current day. Stored locally.' }
              ].map(policy => (
                <label 
                  key={policy.id}
                  className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    settings.retentionPolicy === policy.id
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-yellow-300 dark:hover:border-yellow-700/50'
                  }`}
                >
                  <div className="flex items-center h-5">
                    <input 
                      type="radio" 
                      name="retention" 
                      value={policy.id}
                      checked={settings.retentionPolicy === policy.id}
                      onChange={() => setSettings({...settings, retentionPolicy: policy.id as any})}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="font-bold text-gray-900 dark:text-white block">{policy.label}</span>
                    <span className="text-gray-500">{policy.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
