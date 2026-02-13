'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PawIcon } from '../paw-trail/Paw-Icon';
import { Trail, STEP_INTERVAL, PAW_LIFETIME } from '../types';
import { generateTrail } from './utils';

function WalkingTrail({ trail, onFinish }: { trail: Trail; onFinish: (id: number) => void }) {
  useEffect(() => {
    // Mör bür garch duusaad 12 sekundiin daraа ustadag bolgow
    const timer = setTimeout(() => onFinish(trail.id), 12000);
    return () => clearTimeout(timer);
  }, [trail.id, onFinish]);

  return (
    <>
      {trail.prints.map((print, i) => (
        <motion.span
          key={`${trail.id}-${print.id}`}
          className="absolute text-[#c08909]"
          style={{
            left: `${print.x}%`,
            top: `${print.y}%`,
            width: print.size,
            height: print.size,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0], // Opacity nemsen
            scale: [0.4, 1, 1, 0.8],
          }}
          transition={{
            delay: i * 0.3, // Alhalah hurd (baga zereg nemsen)
            duration: PAW_LIFETIME,
            times: [0, 0.1, 0.8, 1],
            ease: 'easeInOut',
          }}
        >
          <PawIcon className="h-full w-full" />
        </motion.span>
      ))}
    </>
  );
}

export function PawBackground({ children }: { children?: React.ReactNode }) {
  const [trails, setTrails] = useState<Trail[]>([]);
  const nextId = useRef(0);
  const printIdRef = useRef(0);

  const spawnTrail = useCallback(() => {
    const trailId = nextId.current++;
    const trail = generateTrail(trailId, printIdRef.current);
    printIdRef.current += trail.prints.length;
    setTrails((prev) => [...prev, trail]);
  }, []);

  const removeTrail = useCallback((id: number) => {
    setTrails((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    spawnTrail();
    // 🐾 NEW_TRAIL_INTERVAL - 2.5 sekund bolgoj bagasgaw.
    // Ene ni mör dousahyg hülээlgüi araasaa shuud shined garaad bh bolomj ogno.
    const interval = setInterval(spawnTrail, 2500);
    return () => clearInterval(interval);
  }, [spawnTrail]);

  return (
    <div className="relative min-h-screen w-full">
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <AnimatePresence>
          {trails.map((trail) => (
            <WalkingTrail key={trail.id} trail={trail} onFinish={removeTrail} />
          ))}
        </AnimatePresence>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
