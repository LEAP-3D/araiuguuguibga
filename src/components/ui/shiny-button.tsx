"use client";

import React from "react";
import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 } as React.CSSProperties & { "--x"?: string },
  animate: { "--x": "-100%", scale: 1 } as React.CSSProperties & { "--x"?: string },
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.02 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface ShinyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>,
    Partial<MotionProps> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ShinyButtonProps>(
  ({ children, className, href, onClick, ...props }, ref) => {
    const baseClasses = cn(
      "relative flex items-center justify-center gap-2 overflow-hidden cursor-pointer rounded-full border-2 border-[#FF782D] px-8 py-3.5 font-bold backdrop-blur-xl transition-all duration-300 ease-in-out",
      href
        ? "bg-transparent text-[#FF782D] hover:bg-[#FF782D] hover:text-white hover:shadow-lg"
        : "bg-[#FF782D] text-white shadow-md hover:shadow-lg",
      className
    );

    const content = (
      <>
        <span
          className="relative flex items-center justify-center gap-2 text-base tracking-wide"
          style={{
            maskImage:
              "linear-gradient(-75deg,currentColor calc(var(--x) + 20%),transparent calc(var(--x) + 30%),currentColor calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            WebkitMask:
              "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            backgroundImage:
              "linear-gradient(-75deg,currentColor/10% calc(var(--x)+20%),currentColor/50% calc(var(--x)+25%),currentColor/10% calc(var(--x)+100%))",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        />
      </>
    );

    if (href) {
      return (
        <Link href={href}>
          <motion.span
            ref={ref as React.Ref<HTMLSpanElement>}
            className={baseClasses}
            {...animationProps}
          >
            {content}
          </motion.span>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={baseClasses}
        onClick={onClick}
        {...animationProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";
