'use client';

import { useEffect, useState } from 'react';

export function CuteSleepingCatLoader() {
  const [zCount, setZCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setZCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full max-w-[200px] max-h-[200px] flex flex-col items-center justify-center">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-200 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* CAT */}
        <div className="relative w-full aspect-[6/5]">
          <svg viewBox="0 0 120 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* body */}
            <ellipse cx="60" cy="65" rx="35" ry="25" fill="#F97316" opacity="0.9" />

            {/* head */}
            <circle cx="55" cy="45" r="22" fill="#F97316" />

            {/* ears */}
            <path d="M 40 35 L 35 25 L 45 30 Z" fill="#F97316" />
            <path d="M 70 35 L 75 25 L 65 30 Z" fill="#F97316" />

            {/* eyes */}
            <line x1="45" y1="45" x2="50" y2="45" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="45" x2="65" y2="45" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />

            {/* nose */}
            <circle cx="55" cy="52" r="2" fill="#fa87c8" />

            {/* whiskers */}
            <line x1="30" y1="48" x2="40" y2="48" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
            <line x1="32" y1="52" x2="40" y2="51" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
            <line x1="70" y1="48" x2="80" y2="48" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />
            <line x1="70" y1="51" x2="78" y2="52" stroke="#7C2D12" strokeWidth="1" opacity="0.4" />

            {/* belly */}

            {/* tail */}
            <path d="M 85 60 Q 95 55 95 45" stroke="#F97316" strokeWidth="8" fill="F97316" opacity="0.9" strokeLinecap="round" />
          </svg>

          {/* ZZZ */}
          <div className="absolute -top-2 right-0 flex flex-col-reverse gap-1">
            <span className={`transition-all duration-500 ${zCount >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>z</span>
            <span className={`transition-all duration-500 ${zCount >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>Z</span>
            <span className={`transition-all duration-500 ${zCount >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>Z</span>
          </div>
        </div>

        {/* TEXT */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-orange-600 text-sm font-medium">Ачааллаж байна</p>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
