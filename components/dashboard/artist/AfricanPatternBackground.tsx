import React from 'react';

interface AfricanPatternBackgroundProps {
  pattern:
    | 'kente'
    | 'mud-cloth'
    | 'zigzag'
    | 'dots'
    | 'waves'
    | 'triangles'
    | 'grid';
  opacity?: number;
  color?: string;
  className?: string;
}

const AfricanPatternBackground: React.FC<AfricanPatternBackgroundProps> = ({
  pattern,
  opacity = 0.05,
  color = '#F59E0B', // Default amber color
  className = '',
}) => {
  // Helper function to generate SVG patterns
  const getPatternSvg = () => {
    switch (pattern) {
      case 'kente':
        return `
          <pattern id="kente-pattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
            <rect width="100%" height="100%" fill="none"/>
            <rect x="0" y="0" width="10" height="40" fill="${color}" opacity="${opacity}"/>
            <rect x="20" y="0" width="10" height="40" fill="${color}" opacity="${opacity * 0.7}"/>
            <rect x="0" y="0" width="40" height="10" fill="${color}" opacity="${opacity * 0.5}"/>
            <rect x="0" y="20" width="40" height="10" fill="${color}" opacity="${opacity * 0.3}"/>
          </pattern>
        `;
      case 'mud-cloth':
        return `
          <pattern id="mud-cloth-pattern" patternUnits="userSpaceOnUse" width="60" height="60">
            <rect width="60" height="60" fill="none"/>
            <circle cx="15" cy="15" r="5" fill="${color}" opacity="${opacity}"/>
            <circle cx="45" cy="15" r="5" fill="${color}" opacity="${opacity}"/>
            <circle cx="15" cy="45" r="5" fill="${color}" opacity="${opacity}"/>
            <circle cx="45" cy="45" r="5" fill="${color}" opacity="${opacity}"/>
            <rect x="25" y="0" width="10" height="60" fill="${color}" opacity="${opacity * 0.7}"/>
            <rect x="0" y="25" width="60" height="10" fill="${color}" opacity="${opacity * 0.7}"/>
          </pattern>
        `;
      case 'zigzag':
        return `
          <pattern id="zigzag-pattern" patternUnits="userSpaceOnUse" width="40" height="20" patternTransform="rotate(0)">
            <path d="M0,10 L10,0 L20,10 L30,0 L40,10 L40,20 L30,10 L20,20 L10,10 L0,20 Z" fill="${color}" opacity="${opacity}"/>
          </pattern>
        `;
      case 'dots':
        return `
          <pattern id="dots-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="5" cy="5" r="2" fill="${color}" opacity="${opacity * 1.2}"/>
            <circle cx="15" cy="15" r="2" fill="${color}" opacity="${opacity * 1.2}"/>
          </pattern>
        `;
      case 'waves':
        return `
          <pattern id="waves-pattern" patternUnits="userSpaceOnUse" width="60" height="20" patternTransform="rotate(0)">
            <path d="M0,10 C10,5 20,15 30,10 C40,5 50,15 60,10 L60,0 L0,0 Z" fill="${color}" opacity="${opacity}"/>
            <path d="M0,20 C10,15 20,25 30,20 C40,15 50,25 60,20 L60,10 C50,15 40,5 30,10 C20,15 10,5 0,10 Z" fill="${color}" opacity="${opacity * 0.7}"/>
          </pattern>
        `;
      case 'triangles':
        return `
          <pattern id="triangles-pattern" patternUnits="userSpaceOnUse" width="30" height="30">
            <polygon points="15,5 25,25 5,25" fill="${color}" opacity="${opacity}"/>
          </pattern>
        `;
      case 'grid':
        return `
          <pattern id="grid-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity * 1.2}"/>
          </pattern>
        `;
      default:
        return `
          <pattern id="default-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
          </pattern>
        `;
    }
  };

  const patternId = `${pattern}-pattern`;
  const svgContent = getPatternSvg();

  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs dangerouslySetInnerHTML={{ __html: svgContent }} />
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export default AfricanPatternBackground;
