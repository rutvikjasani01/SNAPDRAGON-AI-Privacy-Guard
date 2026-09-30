import React, { useState } from 'react';
import { Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExportFileProps {
  protectedFileUrl: string | null;
  originalFileName: string;
}

export const ExportFile: React.FC<ExportFileProps> = ({
  protectedFileUrl,
  originalFileName
}) => {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    if (!protectedFileUrl) return;

    // Create a safe, distinct filename for the export
    const fileExtension = originalFileName.includes('.') 
      ? originalFileName.split('.').pop() 
      : 'png';
    const baseName = originalFileName.includes('.') 
      ? originalFileName.substring(0, originalFileName.lastIndexOf('.'))
      : originalFileName || 'document';
      
    const safeFileName = `${baseName}_protected.${fileExtension}`;

    // Trigger synthetic download
    const link = document.createElement('a');
    link.href = protectedFileUrl;
    link.download = safeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloaded(true);
    
    // Reset state after a few seconds
    setTimeout(() => {
      setIsDownloaded(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
      <div className="mb-4">
        <ShieldCheck className="w-10 h-10 text-green-500 mx-auto" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Data Protected Successfully
      </h3>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        Your sensitive information has been redacted securely on-device. The original file remains untouched.
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownload}
        disabled={!protectedFileUrl}
        className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-bold shadow-md transition-all ${
          !protectedFileUrl
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            : isDownloaded
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200'
        }`}
      >
        {isDownloaded ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            <span>DOWNLOADED SUCCESSFULLY</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>DOWNLOAD PROTECTED FILE</span>
          </>
        )}
      </motion.button>
      
      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
        Saved as: <span className="font-mono">{originalFileName.replace(/\.[^/.]+$/, "")}_protected</span>
      </p>
    </div>
  );
};
