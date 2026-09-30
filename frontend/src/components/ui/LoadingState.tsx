import { motion } from 'framer-motion';

export function LoadingState({ message = 'Processing...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative w-16 h-16">
        <motion.div 
          className="absolute inset-0 border-4 border-surfaceBorder rounded-full"
        />
        <motion.div 
          className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-text-secondary font-medium animate-pulse">{message}</p>
    </div>
  );
}
