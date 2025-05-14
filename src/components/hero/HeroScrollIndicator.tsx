
import React from 'react';

interface HeroScrollIndicatorProps {
  scrollIntensity: number;
}

const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({ scrollIntensity }) => {
  return (
    <div 
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      style={{ opacity: 1 - scrollIntensity * 2 }}
    >
      <span 
        className="text-xs uppercase tracking-widest mb-2 opacity-70"
        style={{ color: scrollIntensity > 0.1 ? '#8B5CF6' : 'white' }}
      >Scroll</span>
      <div 
        className="w-px h-6 bg-white opacity-50 animate-bounce"
        style={{ 
          background: `linear-gradient(to bottom, white, ${scrollIntensity > 0.1 ? '#8B5CF6' : 'white'})`,
          height: `${6 - scrollIntensity * 3}px` 
        }}
      ></div>
    </div>
  );
};

export default HeroScrollIndicator;
