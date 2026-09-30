import React from 'react';
import { CloudOff, ServerOff, Cpu, Trash2, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const PRIVACY_CLAIMS = [
  {
    id: 'cloud_upload',
    title: 'Cloud Upload',
    status: 'NONE',
    description: 'Documents are never uploaded to remote cloud servers.',
    icon: <CloudOff className="w-6 h-6 text-green-500" />,
    positive: true
  },
  {
    id: 'external_api',
    title: 'External API',
    status: 'NONE',
    description: 'No third-party APIs are called during processing.',
    icon: <ServerOff className="w-6 h-6 text-green-500" />,
    positive: true
  },
  {
    id: 'local_processing',
    title: 'Local Processing',
    status: 'ACTIVE',
    description: 'All AI inference and redaction occurs on your local device.',
    icon: <Cpu className="w-6 h-6 text-blue-500" />,
    positive: true
  },
  {
    id: 'temp_files',
    title: 'Temporary Files',
    status: 'EPHEMERAL',
    description: 'Files reside in RAM or temporary secure directories and are deleted post-scan.',
    icon: <Trash2 className="w-6 h-6 text-yellow-500" />,
    positive: true
  },
  {
    id: 'data_retention',
    title: 'Data Retention',
    status: 'ZERO',
    description: 'Original and protected files are not retained after you download or clear the session.',
    icon: <Database className="w-6 h-6 text-green-500" />,
    positive: true
  }
];

export const PrivacyStatusPanel: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm my-12">
      <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          System Privacy Status
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Verified runtime privacy guarantees of the Snapdragon AI Privacy Guard architecture.
        </p>
      </div>

      <div className="space-y-4">
        {PRIVACY_CLAIMS.map((claim, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            key={claim.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="mt-1 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                {claim.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{claim.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{claim.description}</p>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0 ml-14 sm:ml-0">
              <span className={`inline-flex px-3 py-1 text-sm font-bold uppercase rounded-full ${
                claim.positive 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {claim.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
