
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

interface HeroButtonsProps {
  scrollIntensity: number;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ scrollIntensity }) => {
  const [hoverGlitch, setHoverGlitch] = useState(false);

  return (
    <div className="flex space-x-4" style={{ transform: `translateY(${scrollIntensity * 20}px)` }}>
      <Button
        asChild
        size="lg"
        className={`bg-white hover:bg-zinc-200 text-black border-none px-8 py-6 
          text-lg uppercase tracking-wider relative overflow-hidden group ${hoverGlitch ? 'animate-button-glitch' : ''}`}
        onMouseEnter={() => setHoverGlitch(true)}
        onMouseLeave={() => setHoverGlitch(false)}
        style={{ 
          background: scrollIntensity > 0.1
            ? 'linear-gradient(to right, #9b87f5, #8B5CF6, #6E59A5)'
            : 'white',
          color: scrollIntensity > 0.1 ? 'white' : 'black'
        }}
      >
        <Link to="/products">
          <span className="relative z-10">Shop Now</span>
          <span className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="glitch-hover-effect"></span>
        </Link>
      </Button>
      
     
    </div>
  );
};

export default HeroButtons;
