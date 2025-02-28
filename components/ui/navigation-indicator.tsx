'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/lib/hooks/use-scroll-position';
import { ArrowUp, ChevronUp } from 'lucide-react';

interface NavigationIndicatorProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export function NavigationIndicator({ sections }: NavigationIndicatorProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [showIndicator, setShowIndicator] = useState(false);
  const scrollPosition = useScrollPosition();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const checkActiveSection = () => {
      // Show the indicator only after scrolling a bit
      setShowIndicator(window.scrollY > 200);

      // Determine which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    checkActiveSection();

    window.addEventListener('scroll', checkActiveSection);
    return () => window.removeEventListener('scroll', checkActiveSection);
  }, [sections, scrollPosition]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate progress percentage
  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const progressPercentage = activeIndex / (sections.length - 1);

  // Map sections to African patterns
  const sectionPatterns = {
    hero: {
      pattern: 'kente',
      color: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-400',
    },
    features: {
      pattern: 'adinkra',
      color: 'from-amber-400 to-orange-500',
      textColor: 'text-orange-400',
    },
    solutions: {
      pattern: 'leteisi',
      color: 'from-amber-400 to-purple-500',
      textColor: 'text-purple-400',
    },
    problems: {
      pattern: 'mud-cloth',
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-indigo-400',
    },
    'how-it-works': {
      pattern: 'ndebele',
      color: 'from-indigo-500 to-purple-600',
      textColor: 'text-purple-400',
    },
    community: {
      pattern: 'batik',
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-pink-400',
    },
    cta: {
      pattern: 'yoruba',
      color: 'from-pink-500 to-amber-500',
      textColor: 'text-amber-400',
    },
  };

  if (!showIndicator) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Enhanced Navigation Container with African-inspired design */}
        <div className="p-4 bg-black/70 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden">
          {/* Background pattern that changes with section - Higher opacity */}
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${sectionPatterns[activeSection as keyof typeof sectionPatterns]?.pattern || 'pattern-kente'} opacity-40`}
            ></div>
            {/* Additional gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${sectionPatterns[activeSection as keyof typeof sectionPatterns]?.color || 'from-amber-400/10 to-purple-500/10'} opacity-20`}
            ></div>
          </div>

          {/* African border design on top */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

          {/* Section dots with progress indicator */}
          <div className="flex flex-col items-center gap-5 relative">
            {/* Progress line with enhanced styling */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2"></div>
            <motion.div
              className={`absolute left-1/2 top-0 w-1 bg-gradient-to-b ${sectionPatterns[activeSection as keyof typeof sectionPatterns]?.color || 'from-amber-400 via-purple-500 to-amber-400'} -translate-x-1/2 origin-top rounded-full`}
              style={{
                height: `${progressPercentage * 100}%`,
                scaleY: progressPercentage > 0 ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isHovered = hoveredSection === section.id;
              const sectionColor =
                sectionPatterns[section.id as keyof typeof sectionPatterns]
                  ?.color || 'from-amber-400 to-purple-500';
              const textColor =
                sectionPatterns[section.id as keyof typeof sectionPatterns]
                  ?.textColor || 'text-amber-400';
              const patternName =
                sectionPatterns[section.id as keyof typeof sectionPatterns]
                  ?.pattern || 'pattern-kente';

              return (
                <div key={section.id} className="relative">
                  {/* Enhanced Label that appears on hover/active - now with pattern */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        className="absolute right-10 top-0 transform -translate-y-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className={`bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-lg text-xs border border-white/20 relative overflow-hidden ${isActive ? 'border-l-2 border-l-amber-400' : ''}`}
                        >
                          {/* Background pattern for label */}
                          <div
                            className={`absolute inset-0 ${patternName} opacity-20`}
                          ></div>
                          <span
                            className={`font-medium relative z-10 ${isActive ? textColor : 'text-white'}`}
                          >
                            {section.label}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation dot - enhanced styling */}
                  <motion.button
                    className="relative block p-1"
                    onClick={() => handleClick(section.id)}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Inactive and active dot, positioned within a 20px visual area */}
                    <motion.div
                      className={`w-4 h-4 rounded-full relative z-10 flex items-center justify-center ${
                        isActive
                          ? `bg-gradient-to-r border-2 border-white/30 ${sectionColor}`
                          : 'bg-white/20 border border-white/40'
                      }`}
                      animate={{
                        scale: isActive ? [1, 1.2, 1] : 1,
                      }}
                      transition={
                        isActive
                          ? {
                              duration: 3,
                              repeat: Infinity,
                              repeatType: 'reverse',
                            }
                          : {}
                      }
                    >
                      {/* Inner circle for active state */}
                      {isActive && (
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-white"
                          animate={{ scale: [1, 0.8, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Enhanced glow effect for active section */}
                    {isActive && (
                      <motion.div
                        className={`absolute -inset-3 bg-gradient-to-r ${sectionColor} rounded-full blur-md opacity-50`}
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                    )}

                    {/* Enhanced pattern indicator on hover/active */}
                    {(isHovered || isActive) && (
                      <div className="absolute -inset-2 rounded-full overflow-hidden border border-white/10">
                        <div
                          className={`absolute inset-0 ${patternName} opacity-60`}
                        ></div>
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${sectionColor} opacity-20`}
                        ></div>
                      </div>
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* African border design on bottom */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        </div>

        {/* Enhanced scroll to top button with pattern */}
        <motion.button
          className="mt-6 mx-auto flex flex-col items-center gap-1"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-full relative bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg overflow-hidden group hover:border-amber-400/50 transition-colors">
            <div className="absolute inset-0 pattern-kente opacity-20"></div>
            <ChevronUp className="h-5 w-5 text-white group-hover:text-amber-400 transition-colors" />
          </div>
          <span className="text-xs text-white/50 group-hover:text-white/70">
            Top
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
