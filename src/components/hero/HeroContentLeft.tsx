
import React from 'react';
import { Sparkles } from 'lucide-react';
import HeroGradientText from './HeroGradientText';
import HeroButtons from './HeroButtons';

interface HeroContentLeftProps {
  scrollIntensity: number;
  glitchActive: boolean;
}

const HeroContentLeft: React.FC<HeroContentLeftProps> = ({ scrollIntensity, glitchActive }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 z-20 relative">
      <div className={`mb-4 inline-flex items-center text-sm uppercase tracking-widest font-bold 
        ${glitchActive ? 'text-distort' : ''} text-green-400`}
        style={{ color: `rgb(${200 + scrollIntensity * 60}, ${140 + scrollIntensity * 40}, ${220 + scrollIntensity * 35})` }}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        <span>New Collection 2025</span>
      </div>
      
      <h1 className={`text-5xl md:text-7xl lg:text-8xl font-display uppercase mb-6 leading-none 
        mega-glitch ${glitchActive ? 'glitching' : ''}`}
        data-text="DARE TO BE AUTHENTIC"
        style={{ transform: `translateX(${scrollIntensity * -20}px)` }}
      >
        <span className="block">DARE TO BE</span>
        <HeroGradientText scrollIntensity={scrollIntensity} />
      </h1>
      
      <p className="text-lg md:text-xl max-w-md mb-8 text-zinc-300"
        style={{ transform: `translateX(${scrollIntensity * 30}px) translateY(${scrollIntensity * 10}px)` }}
      >
        Defy expectations. Express resistance. Create your identity through 
        style that speaks louder than words.
      </p>
      
      <HeroButtons scrollIntensity={scrollIntensity} />
      
      {/* Decorative elements with rotation on scroll */}
      <div 
        className="absolute top-10 right-10 w-24 h-24 border border-zinc-500 opacity-40 rotate-45 rotate-on-scroll"
        data-direction="1"
        style={{ 
          borderColor: `rgba(${155 + scrollIntensity * 100}, ${135 + scrollIntensity * 100}, ${245 - scrollIntensity * 50}, ${0.4 + scrollIntensity * 0.2})` 
        }}
      ></div>
      <div 
        className="absolute bottom-10 left-10 w-16 h-16 border border-zinc-400 opacity-30 -rotate-12 rotate-on-scroll" 
        data-direction="-1"
        style={{ 
          borderColor: `rgba(${249 - scrollIntensity * 50}, ${115 + scrollIntensity * 100}, ${22 + scrollIntensity * 50}, ${0.3 + scrollIntensity * 0.3})` 
        }}
      ></div>
    </div>
  );
};

export default HeroContentLeft;
