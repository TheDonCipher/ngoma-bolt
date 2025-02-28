'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PatternBackgroundProps {
  children: ReactNode;
  pattern:
    | 'kente'
    | 'adinkra'
    | 'leteisi'
    | 'yoruba'
    | 'ndebele'
    | 'batik'
    | 'mud-cloth';
  className?: string;
  baseOpacity?: number;
  animate?: boolean;
  accent?: boolean;
  blur?: 'none' | 'sm' | 'md' | 'lg';
}

export function PatternBackground({
  children,
  pattern,
  className,
  baseOpacity = 0.25,
  animate = true,
  accent = false,
  blur = 'none',
}: PatternBackgroundProps) {
  const blurClasses = {
    none: '',
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Base pattern layer */}
      <div
        className={cn(
          'absolute inset-0',
          `pattern-${pattern}`,
          `opacity-${Math.round(baseOpacity * 100)}`,
          'pointer-events-none',
          blurClasses[blur]
        )}
      ></div>

      {/* Animated floating accent patterns */}
      {accent && animate && (
        <>
          <motion.div
            className={cn(
              'absolute -top-20 left-1/4 w-60 h-60 rounded-full opacity-30 pointer-events-none',
              `pattern-${pattern}`,
              blurClasses[blur]
            )}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className={cn(
              'absolute -bottom-40 right-1/4 w-80 h-80 rounded-full opacity-30 pointer-events-none',
              `pattern-${pattern === 'kente' ? 'yoruba' : pattern === 'adinkra' ? 'leteisi' : 'kente'}`,
              blurClasses[blur]
            )}
            animate={{
              y: [0, 20, 0],
              rotate: [0, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Gradient overlay for better content readability */}
      {accent && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 pointer-events-none"></div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
