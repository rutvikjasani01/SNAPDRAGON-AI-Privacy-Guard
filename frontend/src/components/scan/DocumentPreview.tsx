import React, { useState } from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Image as ImageIcon, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentPreviewProps {
  originalUrl: string;
  protectedUrl: string | null;
  fileType: 'IMAGE' | 'PDF';
  totalPages?: number;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  originalUrl,
  protectedUrl,
  fileType,
  totalPages = 1
}) => {
  const [viewMode, setViewMode] = useState<'ORIGINAL' | 'PROTECTED'>(protectedUrl ? 'PROTECTED' : 'ORIGINAL');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));
  
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // Determine which URL to show
  const currentUrl = viewMode === 'PROTECTED' && protectedUrl ? protectedUrl : originalUrl;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      
      {/* Top Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        
        {/* View Mode Toggle */}
        <div className="flex bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('ORIGINAL')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'ORIGINAL' 
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            ORIGINAL
          </button>
          <button
            onClick={() => setViewMode('PROTECTED')}
            disabled={!protectedUrl}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'PROTECTED' 
                ? 'bg-red-600 text-white shadow-sm' 
                : !protectedUrl
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            PROTECTED
          </button>
        </div>

        {/* Zoom & Navigation Controls */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <button onClick={handleZoomOut} className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono w-12 text-center">{zoomLevel}%</span>
            <button onClick={handleZoomIn} className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono w-16 text-center">
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Viewer Area */}
      <div className="relative w-full h-[60vh] bg-gray-100 dark:bg-gray-950 overflow-auto flex items-center justify-center p-4 custom-scrollbar">
        {fileType === 'IMAGE' ? (
          <motion.div
            animate={{ scale: zoomLevel / 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="origin-center shadow-lg border border-gray-200 dark:border-gray-800 bg-white"
          >
            <img 
              src={currentUrl} 
              alt={`${viewMode} document preview`} 
              className="max-w-none"
              style={{ maxHeight: 'none' }}
              draggable={false}
            />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-500">
            <FileText className="w-16 h-16 opacity-50" />
            <p>PDF Preview rendered via {viewMode} URL</p>
            {/* In a real implementation, we would embed a <canvas> running pdf.js or an <iframe> here */}
            <iframe 
              src={`${currentUrl}#zoom=${zoomLevel}`}
              className="w-full h-full border-0 absolute inset-0"
              title="PDF Preview"
            />
          </div>
        )}

        {/* Protection Overlay Indicator */}
        {viewMode === 'PROTECTED' && (
          <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1 z-10">
            <ShieldCheck className="w-4 h-4" />
            <span>PROTECTED VIEW</span>
          </div>
        )}
      </div>
    </div>
  );
};
