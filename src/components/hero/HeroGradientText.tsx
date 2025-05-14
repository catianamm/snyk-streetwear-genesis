
import React from 'react';

interface HeroGradientTextProps {
  scrollIntensity: number;
}

const HeroGradientText: React.FC<HeroGradientTextProps> = ({ scrollIntensity }) => {
  return (
    <span 
      className={`block text-transparent bg-clip-text transition-all duration-300`}
      style={{ 
        backgroundImage: scrollIntensity > 0.1
          ? 'linear-gradient(90deg, #ea384c 0%, #9b87f5 30%, #F97316 60%, #0EA5E9 80%, #8B5CF6 100%)'
          : 'linear-gradient(90deg, #fff 0%, #9b87f5 50%, #6E59A5 100%)',
        backgroundSize: '300% auto',
        backgroundPosition: `${scrollIntensity * 120}% center`,
        WebkitBackgroundClip: 'text',
        textShadow: scrollIntensity > 0.15 ? '0 0 5px rgba(155, 135, 245, 0.7)' : 'none'
      }}
    >
      AUTHENTIC
    </span>
  );
};

export default HeroGradientText;
