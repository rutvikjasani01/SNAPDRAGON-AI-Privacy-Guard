import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Download, Trash2, Eye, ShieldAlert, ShieldCheck, AlertTriangle, Shield, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock structure mirroring the backend's MOCK_HISTORY_DB
interface ScanRecord {
  id: string;
  filename: string;
  date: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detections: number;
  protected_status: boolean;
}

export const History: React.FC = () => {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch simulation (would normally call GET /api/history)
  useEffect(() => {
    const fetchHistory = async () => {
      // Mock data mirroring backend state
      const mockData: ScanRecord[] = [
        {
          id: 'sample-id-1',
          filename: 'tax_return_2025.pdf',
          date: new Date().toISOString(),
          risk: 'HIGH',
          detections: 14,
          protected_status: true
        },
        {
          id: 'sample-id-2',
          filename: 'meeting_notes.docx',
          date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          risk: 'LOW',
          detections: 2,
          protected_status: false
        }
      ];
      
      setTimeout(() => {
        setRecords(mockData);
        setLoading(false);
      }, 600);
    };
    
    fetchHistory();
  }, []);

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'HIGH': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'MEDIUM': return <Shield className="w-5 h-5 text-yellow-500" />;
      case 'LOW': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      default: return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleDelete = (id: string) => {
    // Normally would call DELETE /api/history/{id}
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <HistoryIcon className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                Scan History
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Review past localized on-device processing sessions.</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search filenames..." 
              className="pl-10 pr-4 py-2 w-full md:w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
          </div>
        </div>

        {/* History Table/List */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : records.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              <HistoryIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No scan history available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    <th className="p-4 pl-6">Filename</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Risk</th>
                    <th className="p-4">Detections</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {records.map((record) => (
                      <motion.tr 
                        key={record.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, backgroundColor: '#fecaca' }}
                        className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                      >
                        <td className="p-4 pl-6 font-medium text-gray-900 dark:text-white">
                          {record.filename}
                        </td>
                        <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                          {formatDate(record.date)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {getRiskIcon(record.risk)}
                            <span className="text-sm font-semibold">{record.risk}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white font-mono">
                          {record.detections}
                        </td>
                        <td className="p-4">
                          {record.protected_status ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              PROTECTED
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                              UNPROTECTED
                            </span>
                          )}
                        </td>
                        <td className="p-4 pr-6">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(record.id)} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
