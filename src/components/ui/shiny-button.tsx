'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// Хөдөлгөөнийг маш зөөлөн (smooth) болгох тохиргоо
const animationProps = {
  whileHover: {
    scale: 1.05,
    y: -2,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  },
  whileTap: {
    scale: 0.94,
    y: 0,
    transition: { type: 'spring', stiffness: 500, damping: 15 },
  },
} as MotionProps;

type ShinyButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> &
  Partial<MotionProps> & {
    children: React.ReactNode;
    className?: string;
    href?: string;
  };

export const ShinyButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ShinyButtonProps>(({ children, className, href, onClick, ...props }, ref) => {
  const baseClasses = cn(
    // Үндсэн стиль: зөөлөн шилжилт (transition-all) нэмсэн
    'relative flex items-center justify-center gap-2 overflow-hidden cursor-pointer rounded-full border-2 border-[#FF782D] px-8 py-3.5 font-bold transition-all duration-300 ease-out',
    // Hover үед shadow нэмж, өнгийг үл ялиг тодруулна
    href ? 'bg-transparent text-[#FF782D] hover:bg-[#FF782D]/5 hover:shadow-xl' : 'bg-[#FF782D] text-white shadow-lg hover:bg-[#ff8542] hover:shadow-2xl hover:shadow-[#FF782D]/30',
    className
  );

  const content = (
    <>
      {/* Текст болон иконыг дээд давхаргад гаргах */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-base tracking-wide">{children}</span>

      {/* Маш зөөлөн гялалзах эффект (хулгана очиход л мэдэгдэхүйц) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block no-underline">
        <motion.span ref={ref as React.Ref<HTMLSpanElement>} className={cn(baseClasses, 'group')} {...animationProps}>
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type="button" className={cn(baseClasses, 'group')} onClick={onClick} {...animationProps} {...props}>
      {content}
    </motion.button>
  );
});

ShinyButton.displayName = 'ShinyButton';
