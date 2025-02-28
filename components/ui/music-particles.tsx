'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Music, Music2, Music3, Music4 } from 'lucide-react';

export function MusicParticles() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      icon: number;
      scale: number;
      rotation: number;
    }>
  >([]);

  // Listen for click events to create particles
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only create particles when clicking on interactive elements
      if ((e.target as HTMLElement).closest('button, a')) {
        createParticles(e.clientX, e.clientY);
      }
    };

    // Create particles on scroll events occasionally
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > 1000) {
        lastScrollTime = now;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createParticles(x, y, 3);
      }
    };

    const createParticles = (x: number, y: number, count = 6) => {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x,
        y,
        icon: Math.floor(Math.random() * 4),
        scale: Math.random() * 0.5 + 0.8,
        rotation: Math.random() * 360,
      }));

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, 3000);
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Return music icon based on index
  const MusicIcon = ({ icon }: { icon: number }) => {
    switch (icon) {
      case 0:
        return <Music className="w-full h-full" />;
      case 1:
        return <Music2 className="w-full h-full" />;
      case 2:
        return <Music3 className="w-full h-full" />;
      default:
        return <Music4 className="w-full h-full" />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-8 h-8 text-amber-400"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0,
            rotate: particle.rotation,
            opacity: 0,
          }}
          animate={{
            x: particle.x + (Math.random() * 200 - 100),
            y: particle.y - 200 - Math.random() * 100,
            scale: particle.scale,
            rotate: particle.rotation + (Math.random() * 180 - 90),
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: 'easeOut',
          }}
        >
          <MusicIcon icon={particle.icon} />
        </motion.div>
      ))}
    </div>
  );
}
