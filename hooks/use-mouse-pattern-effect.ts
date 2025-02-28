import { useState, useEffect } from 'react';

interface MousePatternOptions {
  intensity?: number;
  limitRange?: number;
}

export function useMousePatternEffect(options: MousePatternOptions = {}) {
  const {
    intensity = 0.005, // Reduced intensity for subtle movement
    limitRange = 10, // Added max movement range
  } = options;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [patternPosition, setPatternPosition] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate pattern position directly without bounce
      const offsetX = (window.innerWidth / 2 - mouseX) * intensity;
      const offsetY = (window.innerHeight / 2 - mouseY) * intensity;

      // Apply limit to movement range
      const limitedX = Math.max(Math.min(offsetX, limitRange), -limitRange);
      const limitedY = Math.max(Math.min(offsetY, limitRange), -limitRange);

      // Set pattern position directly
      setMousePosition({ x: mouseX, y: mouseY });
      setPatternPosition({ x: limitedX, y: limitedY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, limitRange]);

  return patternPosition;
}
