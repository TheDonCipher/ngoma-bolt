'use client';

import { useMousePatternEffect } from '@/hooks/use-mouse-pattern-effect';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface MouseResponsivePatternProps {
  opacity?: number;
  intensity?: number;
  className?: string;
  patternType?: 'leteisi';
  limitRange?: number;
}

export function MouseResponsivePattern({
  opacity = 0.2,
  intensity = 0.005,
  className,
  patternType = 'leteisi',
  limitRange = 10,
}: MouseResponsivePatternProps) {
  const [isMounted, setIsMounted] = useState(false);
  const patternPosition = useMousePatternEffect({
    intensity,
    limitRange,
  });

  // Avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const patternClass = {
    leteisi: 'pattern-leteisi',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-0',
        patternClass[patternType],
        className
      )}
      style={{
        opacity,
        transform: `translate(${patternPosition.x}px, ${patternPosition.y}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    />
  );
}
