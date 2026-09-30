import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckSquare, Square } from 'lucide-react';

const REDACTION_CATEGORIES = [
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Address' },
  { id: 'ids', label: 'IDs' },
  { id: 'financial_information', label: 'Financial information' },
  { id: 'api_keys', label: 'API keys' },
  { id: 'passwords', label: 'Passwords' },
  { id: 'confidential_text', label: 'Confidential text' }
];

interface SelectiveRedactionProps {
  selectedCategories: string[];
  onChange: (selected: string[]) => void;
}

export const SelectiveRedaction: React.FC<SelectiveRedactionProps> = ({
  selectedCategories,
  onChange
}) => {
  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      onChange(selectedCategories.filter(cat => cat !== id));
    } else {
      onChange([...selectedCategories, id]);
    }
  };

  const handleSelectAll = () => {
    onChange(REDACTION_CATEGORIES.map(cat => cat.id));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Selective Redaction</h3>
        </div>
        <div className="space-x-3">
          <button 
            onClick={handleSelectAll}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Select All
          </button>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <button 
            onClick={handleClearAll}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
        Choose the specific categories of sensitive information you want to automatically protect in this document.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {REDACTION_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleCategory(category.id)}
              className={`flex items-center p-4 rounded-xl cursor-pointer border transition-all ${
                isSelected 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 shadow-sm' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750'
              }`}
            >
              <div className="mr-3 flex-shrink-0">
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 text-red-600 dark:text-red-500" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <span className="font-medium text-sm select-none">{category.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
