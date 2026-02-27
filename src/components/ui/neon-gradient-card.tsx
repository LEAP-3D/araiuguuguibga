"use client";

import type { ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";

type NeonColorsProps = {
  firstColor: string;
  secondColor: string;
};

type NeonGradientCardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: ReactElement;
  className?: string;
  children?: ReactNode;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: NeonColorsProps;
  innerClassName?: string;
};

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 1,
  borderRadius = 24,
  innerClassName,
  neonColors = {
    firstColor: "#ff9a56",
    secondColor: "#FFBE98",
  },
  ...props
}) => {
  const innerRadius = Math.max(0, borderRadius - borderSize);

  return (
    <div
      className={cn("relative size-full overflow-visible", className)}
      style={{
        padding: `${borderSize}px`,
        borderRadius: `${borderRadius}px`,
        background: `linear-gradient(135deg, ${neonColors.firstColor}, ${neonColors.secondColor}, ${neonColors.firstColor})`,
        backgroundSize: "200% 200%",
        animation: "neon-gradient-shift 4s ease infinite",
        boxShadow: `0 0 20px ${neonColors.firstColor}40, 0 0 40px ${neonColors.secondColor}30`,
      }}
      {...props}
    >
      <div
        className={cn("relative size-full overflow-hidden rounded-[var(--inner-r)]", innerClassName ?? "bg-white")}
        style={{ "--inner-r": `${innerRadius}px` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
};
