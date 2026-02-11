'use client';

import React, { useId, useMemo } from 'react';
import { cn } from '@/lib/utils';

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

/** Deterministic 0..1 from index and seed (pure, no Math.random). */
function pseudo(i: number, seed: number): number {
  return ((i * 9301 + seed) % 233280) / 233280;
}

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background = 'transparent',
    minSize = 1,
    maxSize = 3,
    speed = 4,
    particleColor = '#ffffff',
    particleDensity = 120,
  } = props;

  const generatedId = useId();

  const particles = useMemo(() => {
    const count = Math.min(Math.max(particleDensity, 20), 200);
    const seed = 12345;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: pseudo(i, seed) * 100,
      y: pseudo(i, seed + 1) * 100,
      size: minSize + pseudo(i, seed + 2) * (maxSize - minSize),
      duration: 2 + pseudo(i, seed + 3) * (6 / (speed * 0.25)),
      delay: pseudo(i, seed + 4) * 2,
    }));
  }, [particleDensity, minSize, maxSize, speed]);

  return (
    <div
      id={id || generatedId}
      className={cn('h-full w-full relative overflow-hidden opacity-0 animate-in fade-in duration-1000', className)}
      style={{ background }}
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: particleColor,
            animation: 'sparkle ease-in-out infinite',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
