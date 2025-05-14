
import React from 'react';

interface HeroBackgroundEffectsProps {
  scrollIntensity: number;
}

const HeroBackgroundEffects: React.FC<HeroBackgroundEffectsProps> = ({ scrollIntensity }) => {
  return (
    <>
      {/* Enhanced noise texture with color shift on scroll */}
      <div 
        className="absolute inset-0 noise opacity-20"
        style={{ 
          backgroundBlendMode: 'overlay', 
          backgroundColor: `rgba(${scrollIntensity * 20}, ${scrollIntensity * 5}, ${scrollIntensity * 70}, 0.2)` 
        }}
      ></div>
      
      {/* Enhanced scanlines effect with color change on scroll */}
      <div 
        className="absolute inset-0 scanlines opacity-30"
        style={{ opacity: 0.3 + (scrollIntensity * 0.2) }}
      ></div>
      
      {/* Scroll-reactive color overlay with purple */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/10 pointer-events-none z-10"
        style={{ opacity: scrollIntensity * 0.5 }}
      ></div>
    </>
  );
};

export default HeroBackgroundEffects;
