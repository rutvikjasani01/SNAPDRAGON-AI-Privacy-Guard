import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { Columns, Layers, MoveHorizontal } from 'lucide-react';

interface ComparisonSliderProps {
  originalUrl: string;
  protectedUrl: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  originalUrl,
  protectedUrl
}) => {
  const [viewMode, setViewMode] = useState<'OVERLAY' | 'SIDE_BY_SIDE'>('OVERLAY');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* View Mode Controls */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setViewMode('OVERLAY')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'OVERLAY'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Overlay Slider</span>
        </button>
        <button
          onClick={() => setViewMode('SIDE_BY_SIDE')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'SIDE_BY_SIDE'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          }`}
        >
          <Columns className="w-4 h-4" />
          <span>Side by Side</span>
        </button>
      </div>

      {/* Viewer Area */}
      <div className="bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm p-4 h-[60vh] flex items-center justify-center">
        
        {viewMode === 'OVERLAY' ? (
          <div 
            ref={containerRef}
            className="relative w-full h-full max-w-3xl select-none cursor-ew-resize group"
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onClick={(e) => handleMove(e.clientX)}
          >
            {/* Base Image (Protected) */}
            <img 
              src={protectedUrl} 
              alt="Protected" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            
            {/* Overlay Image (Original) */}
            <div 
              className="absolute inset-0 h-full overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={originalUrl} 
                alt="Original" 
                className="absolute inset-0 w-full h-full object-contain max-w-none"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
              />
            </div>

            {/* Slider Line & Handle */}
            <div 
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 transition-transform group-hover:scale-110">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-xs font-semibold backdrop-blur select-none">
              ORIGINAL
            </div>
            <div className="absolute bottom-4 right-4 bg-red-600/80 text-white px-3 py-1 rounded text-xs font-semibold backdrop-blur select-none">
              PROTECTED
            </div>
          </div>
        ) : (
          <div className="w-full h-full grid grid-cols-2 gap-4">
            <div className="relative flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur z-10">ORIGINAL</div>
              <img src={originalUrl} alt="Original" className="w-full h-full object-contain p-2" />
            </div>
            <div className="relative flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <div className="absolute top-2 right-2 bg-red-600/80 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur z-10">PROTECTED</div>
              <img src={protectedUrl} alt="Protected" className="w-full h-full object-contain p-2" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
