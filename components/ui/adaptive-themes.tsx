'use client';

import { useScrollPosition } from '@/lib/hooks/use-scroll-position';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Theme = {
  id: string;
  gradientFrom: string;
  gradientVia?: string;
  gradientTo: string;
  pattern: string;
  startY: number;
  endY: number;
  name: string;
};

// African-inspired color palettes with explicit patterns
const themes: Theme[] = [
  {
    id: 'hero',
    name: 'Savanna Dusk',
    gradientFrom: 'from-gray-950',
    gradientVia: 'via-amber-950/30',
    gradientTo: 'to-black',
    pattern: 'pattern-kente',
    startY: 0,
    endY: 800,
  },
  {
    id: 'features',
    name: 'Serengeti Gold',
    gradientFrom: 'from-amber-950/80',
    gradientVia: 'via-amber-900/20',
    gradientTo: 'to-gray-950',
    pattern: 'pattern-adinkra',
    startY: 800,
    endY: 2000,
  },
  {
    id: 'solutions',
    name: 'Adire Blue',
    gradientFrom: 'from-purple-950/80',
    gradientVia: 'via-indigo-950/30',
    gradientTo: 'to-gray-950',
    pattern: 'pattern-leteisi',
    startY: 2000,
    endY: 3000,
  },
  {
    id: 'problems',
    name: 'Kalahari Sunset',
    gradientFrom: 'from-pink-950/50',
    gradientVia: 'via-rose-950/30',
    gradientTo: 'to-gray-950',
    pattern: 'pattern-mud-cloth',
    startY: 3000,
    endY: 4000,
  },
  {
    id: 'how-it-works',
    name: 'Zambezi Night',
    gradientFrom: 'from-indigo-950/80',
    gradientVia: 'via-blue-950/20',
    gradientTo: 'to-gray-950',
    pattern: 'pattern-ndebele',
    startY: 4000,
    endY: 5000,
  },
  {
    id: 'community',
    name: 'Kilimanjaro Dawn',
    gradientFrom: 'from-purple-950/50',
    gradientVia: 'via-fuchsia-950/20',
    gradientTo: 'to-gray-950',
    pattern: 'pattern-batik',
    startY: 5000,
    endY: 6000,
  },
  {
    id: 'cta',
    name: 'Ubuntu Glow',
    gradientFrom: 'from-amber-950/80',
    gradientVia: 'via-amber-900/40',
    gradientTo: 'to-gray-950',
    pattern: 'pattern-yoruba',
    startY: 6000,
    endY: 7000,
  },
];

export function AdaptiveThemes() {
  const scrollY = useScrollPosition();
  const [activeTheme, setActiveTheme] = useState<string>('hero');
  const [opacity, setOpacity] = useState(1);
  const [prevTheme, setPrevTheme] = useState<string>('hero');
  const [isChanging, setIsChanging] = useState(false);

  // ADDED - throttle theme changes to reduce animations
  const [lastThemeChange, setLastThemeChange] = useState(0);
  const themeChangeThreshold = 1000; // Only change theme every 1000ms minimum

  useEffect(() => {
    // Only check for theme changes occasionally to reduce animations
    const now = Date.now();
    if (now - lastThemeChange < themeChangeThreshold) {
      return;
    }

    // Find the current theme based on scroll position
    let currentTheme = themes[0].id;
    let isInTransition = false;

    for (let i = themes.length - 1; i >= 0; i--) {
      if (scrollY >= themes[i].startY) {
        // Calculate opacity for smooth transition
        const theme = themes[i];
        const nextTheme = themes[i + 1];

        if (nextTheme && scrollY <= nextTheme.startY) {
          // REDUCED transition effect - more subtle
          const progress =
            (scrollY - theme.startY) / (nextTheme.startY - theme.startY);
          setOpacity(1 - progress * 0.3); // Fade to 70% during transition (was 50%)
          isInTransition = true;
        } else {
          setOpacity(1);
        }

        currentTheme = theme.id;
        break;
      }
    }

    // Handle theme transition - only if theme actually changed
    if (currentTheme !== activeTheme) {
      setPrevTheme(activeTheme);
      setActiveTheme(currentTheme);
      setIsChanging(true);
      setLastThemeChange(now); // Track when we last changed theme

      // Hide theme indicator faster
      setTimeout(() => setIsChanging(false), 800); // Was 1500 - shorter display time
    }
  }, [scrollY, activeTheme, lastThemeChange]);

  const currentTheme = themes.find((t) => t.id === activeTheme) || themes[0];
  const previousTheme = themes.find((t) => t.id === prevTheme) || themes[0];

  return (
    <>
      {/* Previous theme (fading out) - REDUCED animation duration */}
      <motion.div
        key={`prev-${prevTheme}`}
        className={`fixed inset-0 pointer-events-none z-[-2] bg-gradient-to-b ${previousTheme.gradientFrom} ${previousTheme.gradientVia || ''} ${previousTheme.gradientTo}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }} // Was 1.5 - faster transition
      />

      {/* Previous theme pattern - REDUCED animation duration */}
      <motion.div
        key={`prev-pattern-${prevTheme}`}
        className={`fixed inset-0 pointer-events-none z-[-2] ${previousTheme.pattern}`}
        style={{ opacity: 0.25 }} // INCREASED base opacity from 0.15
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }} // Was 1.8 - faster transition
      />

      {/* Current theme background - REDUCED animation duration */}
      <motion.div
        key={`current-${activeTheme}`}
        className={`fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-b ${currentTheme.gradientFrom} ${currentTheme.gradientVia || ''} ${currentTheme.gradientTo}`}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 0.8, ease: 'easeIn' }} // Was 1.5 - faster transition
      />

      {/* Current theme pattern - INCREASED opacity, REDUCED animation duration */}
      <motion.div
        key={`pattern-${activeTheme}`}
        className={`fixed inset-0 pointer-events-none z-[-1] ${currentTheme.pattern}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }} // Was 0.15 - increased opacity
        transition={{ duration: 1, ease: 'easeIn' }} // Was 2 - faster transition
      />

      {/* Theme name indicator - only shows briefly during transitions */}
      {/* REMOVED this element to reduce animations */}
    </>
  );
}
