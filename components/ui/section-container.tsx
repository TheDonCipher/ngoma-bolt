import { cn } from '@/lib/utils';
import React from 'react';

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  id,
  children,
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('py-24 relative overflow-hidden', className)}
    >
      <div className="container px-4 relative z-10">{children}</div>
    </section>
  );
}
