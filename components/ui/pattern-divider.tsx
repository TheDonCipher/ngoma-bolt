import React from 'react';
import { cn } from '@/lib/utils';

interface PatternDividerProps {
  className?: string;
  variant?: 'subtle' | 'none';
}

export function PatternDivider({
  className,
  variant = 'subtle',
}: PatternDividerProps) {
  if (variant === 'none') return null;

  return (
    <div className={cn('relative h-8 w-full overflow-hidden', className)}>
      <div className="absolute inset-0 pattern-leteisi opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
    </div>
  );
}
