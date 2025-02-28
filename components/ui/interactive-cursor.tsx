'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMousePosition } from '@/lib/hooks/use-mouse-position';

export function InteractiveCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const mousePosition = useMousePosition();
  const [isNavHover, setIsNavHover] = useState(false);

  // Fix for cursor stuck in corner - ensure we have valid coordinates
  const cursorX = mousePosition.x || 0;
  const cursorY = mousePosition.y || 0;

  useEffect(() => {
    // Log initial mouse position to debug
    console.log('Initial mouse position:', mousePosition);

    // Show custom cursor only on desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      setIsVisible(true);

      // Hide the default cursor
      document.body.style.cursor = 'none';

      // Add hover effect detection
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // Special handling for navigation elements
        const navElement = target.closest('nav, header, [data-nav]');
        if (navElement) {
          setIsNavHover(true);
          setIsHovering(false);
          setCursorText('');
          setCursorVariant('hidden');
          return;
        } else {
          setIsNavHover(false);
          setCursorVariant('default');
        }

        const interactiveElement = target.closest(
          'button, a, [data-cursor-interactive], input, textarea, select, [role="button"]'
        );

        if (interactiveElement) {
          setIsHovering(true);

          // Check for custom cursor variant
          const variant = interactiveElement.getAttribute(
            'data-cursor-variant'
          );
          setCursorVariant(variant || 'hover');

          // Check if there's custom text to display
          const text = interactiveElement.getAttribute('data-cursor-text');
          setCursorText(text || '');
        } else {
          setIsHovering(false);
          setCursorVariant('default');
          setCursorText('');
        }
      };

      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mousemove', () => {}); // Force mouse tracking update

      return () => {
        document.body.style.cursor = 'auto';
        document.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, [mousePosition]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`fixed rounded-full pointer-events-none z-[9999] ${
          cursorVariant === 'default' ? 'bg-white' : 'bg-amber-400'
        } mix-blend-difference`}
        animate={{
          x: cursorX - 4,
          y: cursorY - 4,
          scale: isHovering ? 0 : 1,
          opacity: cursorVariant === 'hidden' ? 0.3 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.2,
        }}
        style={{ width: 8, height: 8 }}
      />

      {/* Larger cursor circle for interactive elements */}
      <motion.div
        className={`fixed rounded-full pointer-events-none z-[9999] flex items-center justify-center text-black font-medium ${
          cursorVariant === 'default'
            ? 'border-2 border-white mix-blend-difference'
            : cursorVariant === 'play'
              ? 'bg-gradient-to-r from-amber-400/30 to-purple-500/30 text-white'
              : 'border-2 border-amber-400 mix-blend-difference'
        }`}
        animate={{
          x: cursorX - (isHovering ? 40 : 20),
          y: cursorY - (isHovering ? 40 : 20),
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          opacity: cursorVariant === 'hidden' ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="text-xs whitespace-nowrap font-medium">
            {cursorText}
          </span>
        )}

        {cursorVariant === 'play' && !cursorText && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 4L18 12L6 20V4Z" fill="white" />
          </svg>
        )}
      </motion.div>
    </>
  );
}
