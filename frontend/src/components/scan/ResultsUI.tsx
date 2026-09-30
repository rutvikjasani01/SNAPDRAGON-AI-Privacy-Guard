import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Shield, AlertTriangle } from 'lucide-react';

interface ResultsUIProps {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectionCount: number;
  categories: string[];
  averageConfidence: number;
}

export const ResultsUI: React.FC<ResultsUIProps> = ({
  riskLevel,
  detectionCount,
  categories,
  averageConfidence
}) => {
  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'CRITICAL': return <ShieldAlert className="w-12 h-12 text-red-600" />;
      case 'HIGH': return <AlertTriangle className="w-12 h-12 text-orange-500" />;
      case 'MEDIUM': return <Shield className="w-12 h-12 text-yellow-500" />;
      case 'LOW': return <ShieldCheck className="w-12 h-12 text-green-500" />;
      default: return <Shield className="w-12 h-12 text-gray-500" />;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'CRITICAL': return 'text-red-600 border-red-200 bg-red-50';
      case 'HIGH': return 'text-orange-500 border-orange-200 bg-orange-50';
      case 'MEDIUM': return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'LOW': return 'text-green-600 border-green-200 bg-green-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto p-6 space-y-8"
    >
      {/* Header section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Privacy Scan Complete
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          On-device analysis finished. Review the findings below.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Risk Level Card */}
        <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${getRiskColor()} shadow-sm`}>
          {getRiskIcon()}
          <h3 className="mt-4 text-sm font-medium uppercase tracking-wider opacity-80">Risk Level</h3>
          <p className="text-3xl font-bold mt-1">{riskLevel}</p>
        </div>

        {/* Detections Card */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="text-4xl font-light text-gray-900 dark:text-white">
            {detectionCount}
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
            Total Detections
          </h3>
        </div>

        {/* Confidence Card */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="text-4xl font-light text-gray-900 dark:text-white">
            {(averageConfidence * 100).toFixed(1)}%
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
            AI Confidence
          </h3>
        </div>
        
      </div>

      {/* Categories Section */}
      <div className="mt-8 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detected Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((cat, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
              >
                {cat.replace('_', ' ').toUpperCase()}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No sensitive categories detected.</span>
          )}
        </div>
      </div>
      
    </motion.div>
  );
};
