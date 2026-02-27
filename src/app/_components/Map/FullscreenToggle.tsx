'use client';

import React, { useEffect } from 'react';

type Props = {
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
};

const FullscreenToggle: React.FC<Props> = ({ isFullScreen, setIsFullScreen, className = '', style = {} }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsFullScreen]);

  return (
    <button
      onClick={() => setIsFullScreen(!isFullScreen)}
      className={`absolute right-4 top-4 z-[2100] cursor-pointer h-11 w-11 flex justify-center items-center rounded-full bg-white p-2 shadow transition hover:bg-gray-100 ${className}`}
      style={style}
      title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
    >
      {isFullScreen ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0v4m0-4h4M15 9l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4M15 15l5 5m0 0v-4m0 4h-4" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
        </svg>
      )}
    </button>
  );
};

export default FullscreenToggle;
