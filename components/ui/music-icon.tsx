'use client';

import { motion } from 'framer-motion';

type MusicIconProps = {
  type: 'note' | 'clef' | 'drum';
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
};

export function MusicIcon({
  type = 'note',
  size = 24,
  color = 'currentColor',
  className = '',
  animated = true,
}: MusicIconProps) {
  const icons = {
    note: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    clef: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 22a8 8 0 0 1-8-8c0-3.5 2-6 5-7.5" />
        <path d="M16 3c0 3.5-2.5 6-6 8" />
        <path d="M12 12c2 2.5 4 5 4 8" />
        <circle cx="12" cy="3" r="1" />
      </svg>
    ),
    drum: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8" />
        <path d="m9 11 6 2" />
        <path d="m9 13 6-2" />
      </svg>
    ),
  };

  const iconAnimation = {
    animate: animated
      ? {
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0, -2, 0],
        }
      : {},
    transition: {
      repeat: Infinity,
      repeatType: 'reverse' as const,
      duration: 1.5,
    },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      {...iconAnimation}
    >
      {icons[type]}
    </motion.div>
  );
}
