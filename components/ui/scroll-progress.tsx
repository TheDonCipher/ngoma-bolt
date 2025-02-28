'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MusicIcon } from './music-icon';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Use state to track opacity and other values
  const [progressOpacity, setProgressOpacity] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [beatActive, setBeatActive] = useState(false);

  // Use useTransform for rotation and scale effects
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const pulseScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.05, 1, 1.05, 1]
  );
  const progressColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      'rgba(251,191,36,0.8)', // amber
      'rgba(168,85,247,0.8)', // purple
      'rgba(244,114,182,0.8)', // pink
      'rgba(251,191,36,0.8)', // amber
    ]
  );

  // Dynamic icon type based on progress
  const getIconType = (progress: number) => {
    if (progress < 0.33) return 'note';
    if (progress < 0.66) return 'clef';
    return 'drum';
  };

  // Update state values when scrollYProgress changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setProgressOpacity(value);
      setProgressPercentage(Math.round(value * 100));

      // Trigger pulse effect on notable progress changes
      if (value % 0.2 <= 0.01 && value > 0) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 500);
      }

      // Create beat animation at regular intervals
      if (value % 0.1 <= 0.02 && value > 0) {
        setBeatActive(true);
        setTimeout(() => setBeatActive(false), 300);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center z-50 shadow-lg shadow-purple-500/20"
        style={{
          rotate: rotateValue,
          scale: isPulsing ? pulseScale : 1,
        }}
        animate={{
          boxShadow: isPulsing
            ? '0 0 15px 5px rgba(168,85,247,0.5)'
            : '0 0 5px 2px rgba(168,85,247,0.2)',
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Vinyl record design */}
        <motion.div
          className="absolute inset-1 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(244,114,182,0.8) 0%, rgba(168,85,247,0.8) 50%, rgba(251,191,36,0.8) 100%)',
            clipPath: 'inset(0 0 0 0)',
            opacity: progressOpacity,
          }}
        >
          {/* Record grooves */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-black/20"
                style={{
                  width: `${70 - i * 20}%`,
                  height: `${70 - i * 20}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
        <div className="absolute inset-7 rounded-full bg-gray-900 flex items-center justify-center">
          <motion.div
            className="absolute h-2 w-2 rounded-full bg-amber-400"
            animate={{
              scale: beatActive ? [1, 1.5, 1] : 1,
              opacity: beatActive ? [1, 0.8, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </>
  );
}
