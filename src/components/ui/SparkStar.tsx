'use client';
import React from 'react';
import { SparklesCore } from './sparkles';

// TypeScript алдааг засахын тулд 'type' ашиглана
type SparklesPreviewProps = {
  className?: string;
};

export function SparklesPreview({ className }: SparklesPreviewProps) {
  return (
    // h-full w-full-ийг заавал өгнө
    <div className={`h-full w-full relative flex flex-col items-center justify-center overflow-hidden bg-white ${className}`}>
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore id="particles-background" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#ffa500" />
      </div>
    </div>
  );
}
