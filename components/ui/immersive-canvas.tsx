'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/lib/hooks/use-mouse-position';
import { useScrollPosition } from '@/lib/hooks/use-scroll-position';

// Simple African-inspired symbols for drawing
const africanSymbols = [
  // Circle
  (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.stroke();
  },
  // Diamond
  (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
    ctx.stroke();
  },
  // Cross
  (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.stroke();
  },
  // Square
  (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  },
  // Triangle
  (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.closePath();
    ctx.stroke();
  },
];

// Map section IDs to specific symbols
const sectionSymbols = {
  hero: [0, 1],
  features: [0, 2],
  solutions: [1, 3],
  problems: [2, 4],
  'how-it-works': [3, 0],
  community: [4, 1],
  cta: [0, 3],
};

export function ImmersiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const scrollPosition = useScrollPosition();
  const [currentSectionId, setCurrentSectionId] = useState('hero');

  // REDUCED the animation intensity by tracking last update time
  const lastUpdateTimeRef = useRef<number>(0);
  const updateIntervalMs = 100; // Only update every 100ms

  // Get current section based on scroll position (with much less sensitivity)
  const getCurrentSection = (scrollY: number) => {
    // Only check sections at major scroll points to reduce processing
    if (scrollY < 800) return 'hero';
    if (scrollY < 2000) return 'features';
    if (scrollY < 3000) return 'solutions';
    if (scrollY < 4000) return 'problems';
    if (scrollY < 5000) return 'how-it-works';
    if (scrollY < 6000) return 'community';
    return 'cta';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSectionId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Only observe main sections
    const sections = [
      'hero',
      'features',
      'solutions',
      'problems',
      'how-it-works',
      'community',
      'cta',
    ];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create African-inspired patterns - GREATLY REDUCED number to just 10 patterns
    let patterns: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      rotation: number;
      shape: number;
      paralaxFactor: number;
      opacity: number;
      speed: number;
    }> = [];

    const createPatterns = () => {
      patterns = [];
      const currentSection = getCurrentSection(scrollPosition);
      const allowedShapes = sectionSymbols[
        currentSection as keyof typeof sectionSymbols
      ] || [0, 1];

      // REDUCED from 30+ patterns to just 10
      for (let i = 0; i < 10; i++) {
        const isGold = Math.random() > 0.6;
        const hue = isGold ? 43 : Math.random() > 0.5 ? 270 : 330; // Gold, Purple, or Pink
        const saturation = isGold ? 80 : 60;
        const lightness = 50 + Math.random() * 20;
        const opacity = Math.random() * 0.15 + 0.15; // Higher base opacity for better visibility

        const shapeIndex =
          allowedShapes[Math.floor(Math.random() * allowedShapes.length)];

        patterns.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 25 + 15, // Slightly larger size for visibility
          color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`,
          rotation: Math.random() * Math.PI * 2,
          shape: shapeIndex,
          // GREATLY REDUCED parallax factor by 80%
          paralaxFactor: Math.random() * 0.05 + 0.01,
          opacity: Math.random() * 0.3 + 0.3,
          // GREATLY REDUCED rotation speed by 80%
          speed: Math.random() * 0.0001 + 0.00005,
        });
      }
    };

    createPatterns();

    // Animation loop with timestamp for rotation
    let lastTime = 0;
    let lastSection = '';

    const animate = (time: number) => {
      // Throttle updates to reduce CPU usage
      if (time - lastUpdateTimeRef.current < updateIntervalMs) {
        requestAnimationFrame(animate);
        return;
      }

      lastUpdateTimeRef.current = time;

      const deltaTime = time - lastTime;
      lastTime = time;

      // Only check for section changes occasionally to reduce overhead
      const currentSection = getCurrentSection(scrollPosition);
      if (currentSection !== lastSection) {
        lastSection = currentSection;
        // Only recreate patterns when section changes
        createPatterns();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw patterns with GREATLY REDUCED parallax effect
      patterns.forEach((pattern) => {
        ctx.save();

        ctx.globalAlpha = pattern.opacity * 0.8; // Slightly reduced opacity
        ctx.lineWidth = 1.5; // Made lines a bit thicker for visibility

        // Apply parallax based on mouse position and scroll - GREATLY REDUCED
        const mouseParallaxX =
          (mousePosition.x - window.innerWidth / 2) *
          pattern.paralaxFactor *
          0.3;
        const mouseParallaxY =
          (mousePosition.y - window.innerHeight / 2) *
          pattern.paralaxFactor *
          0.3;
        // GREATLY REDUCED scroll parallax
        const scrollParallax = scrollPosition * pattern.paralaxFactor * 0.05;

        // Slowly rotate patterns over time - REDUCED rotation speed
        pattern.rotation += deltaTime * pattern.speed * 0.3;

        // Position with parallax effect
        const x = pattern.x + mouseParallaxX;
        const y = pattern.y + mouseParallaxY - scrollParallax;

        // Wrap around screen
        const wrappedX =
          ((x + canvas.width * 2) % (canvas.width * 2)) - canvas.width * 0.5;
        const wrappedY =
          ((y + canvas.height * 2) % (canvas.height * 2)) - canvas.height * 0.5;

        ctx.translate(wrappedX, wrappedY);
        ctx.rotate(pattern.rotation);
        ctx.strokeStyle = pattern.color;
        ctx.fillStyle = pattern.color;

        // Draw African-inspired shape
        africanSymbols[pattern.shape](ctx, 0, 0, pattern.size);

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [mousePosition.x, mousePosition.y, scrollPosition, currentSectionId]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1.5 }}
    />
  );
}
