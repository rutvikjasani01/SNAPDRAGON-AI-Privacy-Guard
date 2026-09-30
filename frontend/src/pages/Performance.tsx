import React, { useState, useEffect } from 'react';
import { Activity, Clock, Cpu, MemoryStick, HardDrive, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// In a real application, these would be fetched from the backend `/api/performance`
// which aggregates the latency metrics from `model_manager.py`
interface PerformanceMetrics {
  isAvailable: boolean;
  inferenceLatencyMs?: number;
  ocrTimeMs?: number;
  modelSizeBytes?: number;
  peakMemoryBytes?: number;
  runtime?: string;
  device?: string;
}

export const Performance: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching hardware telemetry
    const fetchMetrics = async () => {
      try {
        // Normally: const response = await fetch('/api/performance');
        // We simulate that hardware profiling is currently unavailable 
        // to strictly abide by the rule: "Never fabricate benchmark numbers."
        setTimeout(() => {
          setMetrics({
            isAvailable: false
          });
          setLoading(false);
        }, 800);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const formatBytes = (bytes?: number) => {
    if (bytes === undefined) return 'N/A';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <Activity className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
              Performance Monitor
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
            Live telemetry and hardware profiling metrics for the on-device AI inference engine.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : !metrics?.isAvailable ? (
          
          /* Awaiting Hardware Profiling State */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-gray-900 dark:bg-black border border-gray-800 rounded-3xl p-12 text-center shadow-xl"
          >
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest text-yellow-500">
              Awaiting Hardware Profiling
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              True benchmark numbers require explicit integration with the Qualcomm Neural Processing SDK or execution via the Qualcomm AI Hub. 
              Fabricated benchmark numbers are prohibited. Please configure the target hardware environment to view active telemetry.
            </p>
          </motion.div>

        ) : (
          
          /* Active Metrics Grid (Will render once real data is injected) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 mb-4">
                <Activity className="w-5 h-5" />
                <h3 className="font-semibold uppercase tracking-wider text-sm">Inference Latency</h3>
              </div>
              <div className="text-4xl font-light text-gray-900 dark:text-white">
                {metrics.inferenceLatencyMs ? `${metrics.inferenceLatencyMs.toFixed(1)} ms` : 'N/A'}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold uppercase tracking-wider text-sm">OCR Time</h3>
              </div>
              <div className="text-4xl font-light text-gray-900 dark:text-white">
                {metrics.ocrTimeMs ? `${metrics.ocrTimeMs.toFixed(1)} ms` : 'N/A'}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 mb-4">
                <HardDrive className="w-5 h-5" />
                <h3 className="font-semibold uppercase tracking-wider text-sm">Model Size</h3>
              </div>
              <div className="text-4xl font-light text-gray-900 dark:text-white">
                {formatBytes(metrics.modelSizeBytes)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 mb-4">
                <MemoryStick className="w-5 h-5" />
                <h3 className="font-semibold uppercase tracking-wider text-sm">Peak Memory</h3>
              </div>
              <div className="text-4xl font-light text-gray-900 dark:text-white">
                {formatBytes(metrics.peakMemoryBytes)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm col-span-1 md:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 mb-4">
                <Cpu className="w-5 h-5" />
                <h3 className="font-semibold uppercase tracking-wider text-sm">Runtime Configuration</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm text-gray-400 mb-1">Runtime</span>
                  <span className="text-xl font-medium text-gray-900 dark:text-white">{metrics.runtime || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400 mb-1">Device</span>
                  <span className="text-xl font-medium text-gray-900 dark:text-white">{metrics.device || 'N/A'}</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
