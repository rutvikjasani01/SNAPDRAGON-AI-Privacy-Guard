import React, { useState, useEffect, ReactNode } from 'react';
import { EyeOff, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecureDisplayProps {
  children: ReactNode;
  enabled?: boolean;
}

export const SecureDisplay: React.FC<SecureDisplayProps> = ({ 
  children, 
  enabled = true 
}) => {
  const [isFocused, setIsFocused] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  // Active protection state triggered when window loses focus (OS screenshot/switch) 
  // or mouse leaves the secure viewing area.
  const isProtected = !isFocused || !isHovered;

  return (
    <div 
      className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-950 select-none group border border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={(e) => e.preventDefault()} // Disable right click
    >
      {/* Content Layer (Blurred conditionally) */}
      <div 
        className={`w-full h-full transition-all duration-300 ease-in-out ${
          isProtected ? 'blur-xl opacity-40 scale-105 pointer-events-none' : 'blur-0 opacity-100 scale-100'
        }`}
      >
        {children}
      </div>

      {/* Watermark Overlay (Visible when protected) */}
      <AnimatePresence>
        {isProtected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/60 backdrop-blur-sm pointer-events-none"
          >
            {/* Repeating dynamic watermark background */}
            <div className="absolute inset-0 overflow-hidden opacity-10 flex flex-wrap content-center justify-center pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="transform -rotate-45 text-white font-black text-2xl m-8 whitespace-nowrap">
                  CONFIDENTIAL • PROTECTED VIEW
                </div>
              ))}
            </div>

            {/* Central Warning Badge */}
            <div className="relative z-10 flex flex-col items-center bg-red-900/90 border border-red-500/50 p-6 rounded-2xl shadow-2xl backdrop-blur-md">
              <EyeOff className="w-16 h-16 text-white mb-4" />
              <h3 className="text-xl font-bold text-white uppercase tracking-widest text-center">
                Secure Display Active
              </h3>
              <p className="text-red-200 mt-2 text-center max-w-xs text-sm">
                {!isFocused 
                  ? "Window lost focus. Document hidden to prevent OS-level screenshots."
                  : "Hover over the document area to reveal the secure contents."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Persistent Badge */}
      <div className="absolute bottom-4 right-4 z-40 flex items-center space-x-2 bg-black/80 border border-gray-700 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
        <ShieldAlert className="w-3 h-3 text-red-500" />
        <span className="font-mono tracking-wider">ANTI-SCREENSHOT</span>
      </div>
    </div>
  );
};
