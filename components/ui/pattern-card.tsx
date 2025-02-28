'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PatternCardProps {
  children: ReactNode;
  pattern?:
    | 'kente'
    | 'adinkra'
    | 'leteisi'
    | 'yoruba'
    | 'ndebele'
    | 'batik'
    | 'mud-cloth';
  className?: string;
  hoverEffect?: boolean;
}

export function PatternCard({
  children,
  pattern = 'kente',
  className,
  hoverEffect = true,
}: PatternCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-white/10',
        hoverEffect &&
          'group hover:border-amber-400/30 transition-colors duration-300',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={hoverEffect ? { y: -5 } : undefined}
    >
      {/* Background pattern element */}
      <div
        className={cn(
          `absolute inset-0 ${`pattern-${pattern}`}`,
          hoverEffect
            ? 'opacity-0 group-hover:opacity-20 transition-opacity duration-500'
            : 'opacity-10'
        )}
      ></div>

      {/* Accent border on top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
