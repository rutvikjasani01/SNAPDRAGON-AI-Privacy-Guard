import React from 'react';
import { Shield, ShieldAlert, AlertTriangle, ShieldCheck, Check, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Detection {
  id: string;
  type: string;
  text: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  location?: { x: number; y: number; width: number; height: number };
  action: 'REDACT' | 'KEEP' | 'REVIEW';
}

interface DetectionControlsProps {
  detections: Detection[];
  onActionChange: (id: string, action: 'REDACT' | 'KEEP' | 'REVIEW') => void;
}

export const DetectionControls: React.FC<DetectionControlsProps> = ({
  detections,
  onActionChange
}) => {

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'HIGH': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'MEDIUM': return <Shield className="w-5 h-5 text-yellow-500" />;
      case 'LOW': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      default: return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return 'bg-red-50 text-red-700 border-red-200';
      case 'HIGH': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'LOW': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Detected Sensitive Information</h3>
      
      <div className="space-y-3">
        <AnimatePresence>
          {detections.map((detection) => (
            <motion.div
              key={detection.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm transition-all hover:shadow-md"
            >
              {/* Left Info */}
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {getRiskIcon(detection.risk)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider text-sm">
                      {detection.type.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getRiskColor(detection.risk)}`}>
                      {detection.risk}
                    </span>
                  </div>
                  
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-mono">
                    <span className="blur-[4px] hover:blur-none transition-all cursor-pointer">
                      {detection.text}
                    </span>
                  </div>
                  
                  <div className="mt-1 text-xs text-gray-400 dark:text-gray-500 flex items-center space-x-4">
                    <span>Confidence: {(detection.confidence * 100).toFixed(1)}%</span>
                    {detection.location && (
                      <span>Loc: [x:{detection.location.x.toFixed(0)}, y:{detection.location.y.toFixed(0)}]</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <button
                  onClick={() => onActionChange(detection.id, 'REDACT')}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    detection.action === 'REDACT' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <EyeOff className="w-4 h-4" />
                  <span>Redact</span>
                </button>
                
                <button
                  onClick={() => onActionChange(detection.id, 'KEEP')}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    detection.action === 'KEEP' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Keep</span>
                </button>

                <button
                  onClick={() => onActionChange(detection.id, 'REVIEW')}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    detection.action === 'REVIEW' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Review</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
