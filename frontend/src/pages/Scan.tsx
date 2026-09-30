import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
];

export function Scan() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (selectedFile: File) => {
    setError(null);
    if (!ALLOWED_TYPES.includes(selectedFile.type) && !selectedFile.name.endsWith('.docx')) {
      setError('Invalid file type. Please upload PNG, JPG, PDF, or DOCX.');
      return false;
    }
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit for demo
      setError('File is too large. Maximum size is 10MB.');
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();
      console.log('Upload success:', data);
      
      // Artificial delay to show processing state for a moment
      setTimeout(() => {
        setIsUploading(false);
        // Future: Navigate to results using data
      }, 1500);

    } catch (err: any) {
      console.error('Scan error:', err);
      setError(err.message || 'An error occurred during upload.');
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <Container className="max-w-4xl">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-surface border border-surfaceBorder rounded-full px-4 py-1.5 w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-text-secondary">Local processing enabled</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Secure Document Scan
            </h1>
            <p className="text-xl text-text-secondary">
              Upload your file. Our local AI will analyze it for sensitive information without sending it to the cloud.
            </p>
          </div>

          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative glass-panel rounded-3xl border-2 border-dashed transition-all duration-200 overflow-hidden
              ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-surfaceBorder hover:border-text-secondary'}
              ${file ? 'border-solid border-green-500/50' : ''}
            `}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".png,.jpg,.jpeg,.pdf,.docx"
            />
            
            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-16 md:p-24 text-center"
                >
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 shadow-glass border border-surfaceBorder">
                    <UploadCloud className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Drag & drop your file here</h3>
                  <p className="text-text-secondary mb-8">
                    Supports PNG, JPG, PDF, and DOCX (Max 10MB)
                  </p>
                  <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                    Browse Files
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="file-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-12 md:p-16 text-center"
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30">
                      <File className="w-12 h-12 text-green-400" />
                    </div>
                    <button 
                      onClick={handleRemoveFile}
                      className="absolute -top-3 -right-3 bg-surface border border-surfaceBorder rounded-full p-1.5 text-text-secondary hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                      disabled={isUploading}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{file.name}</h3>
                  <p className="text-sm text-text-secondary mb-8">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for scanning
                  </p>
                  
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-48 h-2 bg-surfaceBorder rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 bottom-0 bg-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                      </div>
                      <p className="text-sm text-primary font-medium animate-pulse">Running local AI models...</p>
                    </div>
                  ) : (
                    <Button variant="primary" size="lg" onClick={handleScan} className="w-full sm:w-auto shadow-glow">
                      START SCAN
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-400">Upload Error</h4>
                  <p className="text-sm text-red-300/80 mt-1">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-surfaceBorder/50">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-text-secondary">Never leaves your device</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-text-secondary">No internet connection required</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-text-secondary">Snapdragon accelerated</span>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
