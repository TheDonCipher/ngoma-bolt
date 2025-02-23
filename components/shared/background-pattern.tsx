"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import '@/lib/styles/patterns.css';

export function BackgroundPattern() {
  const pathname = usePathname();
  const patternRef = useRef<HTMLDivElement>(null);

  const getPatternClass = () => {
    switch (pathname) {
      case '/':
        return 'pattern-kente';
      case '/explore':
        return 'pattern-mud-cloth';
      case '/news':
        return 'pattern-adinkra';
      case '/search':
        return 'pattern-zulu';
      case '/settings':
        return 'pattern-bogolan';
      default:
        if (pathname?.startsWith('/dashboard')) return 'pattern-yoruba';
        return '';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!patternRef.current) return;
      const scrolled = window.scrollY;
      const parallaxValue = scrolled * 0.15;
      patternRef.current.style.transform = `translateY(${parallaxValue}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={patternRef}
      className={`fixed inset-0 pointer-events-none ${getPatternClass()} pattern-parallax z-[-1]`}
      aria-hidden="true"
    />
  );
}