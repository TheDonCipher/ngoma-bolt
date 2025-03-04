'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

// This is a simple scroll area component that doesn't rely on Radix UI
export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative overflow-auto', className)}
      {...props}
    >
      {children}
    </div>
  )
);
ScrollArea.displayName = 'ScrollArea';

export const ScrollBar = ({ orientation = 'vertical', ...props }: any) => {
  return <div className="hidden" {...props} />;
};

// Named export for compatibility with existing imports
export { ScrollArea as ScrollAreaViewport };
