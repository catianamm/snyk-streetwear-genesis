
import React from 'react';

interface HeroImageRightProps {
  scrollIntensity: number;
  glitchActive: boolean;
}

const HeroImageRight: React.FC<HeroImageRightProps> = ({ scrollIntensity, glitchActive }) => {
  return (
    <div className="w-full md:w-1/2 relative overflow-hidden">
      {/* Main image with glitch effect */}
      <div className="relative h-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920" 
          alt="Fashion Model" 
          className={`w-full h-full object-cover parallax-img ${scrollIntensity > 0.7 ? 'grayscale-[70%]' : 'grayscale'} ${glitchActive ? 'glitch-img' : ''}`}
          data-speed="0.05"
          style={{ filter: `grayscale(${100 - scrollIntensity * 40}%) contrast(${1 + scrollIntensity * 0.3})` }}
        />
        
        {/* Enhanced glitch overlay with dynamic colors */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 
            mix-blend-color-dodge ${glitchActive ? 'opacity-70' : 'opacity-40'}`}
          style={{ opacity: 0.4 + (scrollIntensity * 0.4) }}
        ></div>
        
        {/* RGB split effect enhanced by scroll */}
        <div 
          className={`absolute inset-0 rgb-shift ${glitchActive || scrollIntensity > 0.7 ? 'active' : ''}`}
          style={{ opacity: 0.1 + (scrollIntensity * 0.4) }}
        ></div>
        
        {/* Abstract geometric overlay with scroll-based animation and purple */}
        <svg 
          className="absolute inset-0 w-full h-full z-10 opacity-30" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ opacity: 0.3 + (scrollIntensity * 0.2) }}
        >
          <polygon 
            points={`0,100 ${100 - scrollIntensity * 30},${0 + scrollIntensity * 20} 100,100`} 
            fill="url(#gradient)" 
            className="animate-pulse-slow"
          ></polygon>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.7 - scrollIntensity * 0.2}></stop>
              <stop offset="100%" stopColor={scrollIntensity > 0.1 ? "#8B5CF6" : "#cccccc"} stopOpacity={0.3 + scrollIntensity * 0.4}></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Secondary floating image with enhanced scroll effects and purple tones */}
      <div 
        className="absolute bottom-10 right-10 w-40 h-56 overflow-hidden border-2 border-white z-20
          transform rotate-6 shadow-lg hidden md:block"
        style={{ 
          transform: `rotate(${6 + scrollIntensity * 6}deg) translateY(${-scrollIntensity * 30}px)`,
          borderColor: scrollIntensity > 0.1 ? '#8B5CF6' : 'white',
          boxShadow: `0 10px 25px rgba(139, 92, 246, ${0.2 + scrollIntensity * 0.4})`
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800" 
          alt="Fashion Detail" 
          className="w-full h-full object-cover parallax-img grayscale"
          data-speed="0.1"
          style={{ filter: `grayscale(${100 - scrollIntensity * 60}%)` }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-zinc-500/30 to-transparent"
          style={{ background: `linear-gradient(to top, rgba(139, 92, 246, ${0.3 + scrollIntensity * 0.3}) 0%, transparent 100%)` }}
        ></div>
      </div>
    </div>
  );
};

export default HeroImageRight;
