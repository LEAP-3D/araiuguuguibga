import { cn } from '@/lib/utils';

type PawIconProps = {
  className?: string;
  size?: number;
};

export const PawIcon = ({ className, size = 24 }: PawIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={cn('', className)}>
    <ellipse cx="12" cy="14" rx="4" ry="5" />
    <ellipse cx="6" cy="8" rx="2.5" ry="3" />
    <ellipse cx="18" cy="8" rx="2.5" ry="3" />
    <ellipse cx="4" cy="13" rx="2" ry="2.5" />
    <ellipse cx="20" cy="13" rx="2" ry="2.5" />
  </svg>
);
