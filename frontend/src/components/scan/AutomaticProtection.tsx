import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AutomaticProtectionProps {
  onProtect: () => void;
  isProcessing: boolean;
  selectedCategoriesCount: number;
}

export const AutomaticProtection: React.FC<AutomaticProtectionProps> = ({
  onProtect,
  isProcessing,
  selectedCategoriesCount
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 mt-8 border border-red-200 dark:border-red-900/50 bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-red-950/20 rounded-3xl shadow-sm text-center">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-full">
          <Shield className="w-12 h-12 text-red-600 dark:text-red-500" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Ready to Secure Your Data?
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
        You have selected {selectedCategoriesCount} categories for automatic redaction. 
        Our on-device AI will process the document locally, ensuring your information never leaves this device.
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onProtect}
        disabled={isProcessing || selectedCategoriesCount === 0}
        className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-all
          ${isProcessing || selectedCategoriesCount === 0
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed shadow-none'
            : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
          }
        `}
      >
        <span>
          {isProcessing ? 'PROCESSING LOCALLY...' : 'PROTECT EVERYTHING'}
        </span>
        {!isProcessing && <ArrowRight className="w-6 h-6" />}
      </motion.button>
      
      {selectedCategoriesCount === 0 && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Please select at least one category to enable automatic protection.
        </p>
      )}
    </div>
  );
};
