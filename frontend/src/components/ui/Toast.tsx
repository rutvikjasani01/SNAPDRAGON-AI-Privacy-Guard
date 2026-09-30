import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: 'info' | 'success' | 'error';
}

export function Toast({ message, isVisible, type = 'info' }: ToastProps) {
  const colors = {
    info: 'bg-surface border-surfaceBorder text-white',
    success: 'bg-green-900/50 border-green-500/50 text-green-100',
    error: 'bg-red-900/50 border-red-500/50 text-red-100',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-glass border ${colors[type]} z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
