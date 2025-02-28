'use client';

import { usePatternParallax } from '@/hooks/use-pattern-parallax';
import { cn } from '@/lib/utils';

interface SeamlessPatternBackgroundProps {
  opacity?: number;
  className?: string;
}

export function SeamlessPatternBackground({
  opacity = 0.2,
  className,
}: SeamlessPatternBackgroundProps) {
  const parallax = usePatternParallax(0.03);

  return (
    <div
      className={cn(
        'fixed inset-0 pattern-leteisi pointer-events-none z-0',
        className
      )}
      style={{
        opacity,
        backgroundPosition: `${parallax.x}px ${parallax.y}px`,
      }}
    />
  );
}
