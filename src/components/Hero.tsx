
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [distortLevel, setDistortLevel] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Create random glitch effect
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Add mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
      
      // Random chance to trigger glitch on mouse movement
      if (Math.random() > 0.98) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Scroll distortion effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / scrollMax;
      setDistortLevel(scrollPercent * 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative bg-white text-black h-full w-full digital-noise scan-lines">
      {/* Deconstructed hero with juxtaposed imagery */}
      <div className="w-full h-full relative overflow-hidden">
        <div className={`absolute inset-0 z-10 bg-black opacity-0 ${glitchActive ? 'opacity-5' : ''} transition-opacity`}></div>
        
        {/* Main image with parallax effect based on mouse position */}
        <div 
          className="w-full h-full absolute top-0 left-0"
          style={{ 
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)` 
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=2070" 
            alt="Hero Image" 
            className={`w-full h-full object-cover object-center scale-110 ${glitchActive ? 'scale-[1.11] translate-x-[3px]' : ''} transition-all duration-200`}
          />
        </div>
        
        {/* Distorted shape overlays */}
        <div className={`absolute top-0 left-0 w-full h-full flex z-5 pointer-events-none opacity-10 mix-blend-color-dodge`}>
          <div className="w-1/3 h-full bg-red-500" 
               style={{ transform: `translateX(${distortLevel * 2}px) skew(${distortLevel}deg)`}}></div>
          <div className="w-1/3 h-full bg-blue-500"
               style={{ transform: `translateY(${-distortLevel * 2}px)`}}></div>
          <div className="w-1/3 h-full bg-green-500"
               style={{ transform: `translateX(${-distortLevel * 2}px) skew(${-distortLevel}deg)`}}></div>
        </div>
        
        {/* Text overlay with social commentary */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20">
          <div className="bg-black bg-opacity-50 p-6 md:p-10 max-w-lg text-center">
            <h1 className="text-4xl md:text-6xl font-display uppercase mb-4 mix-blend-difference">
              <span className={`inline-block ${glitchActive ? 'translate-x-[5px] translate-y-[3px] scale-105' : ''} transition-all`}>RE</span>
              <span className={`inline-block ${glitchActive ? 'translate-y-[-2px] scale-95' : ''} transition-all`}>DE</span>
              <span className={`inline-block ${glitchActive ? 'translate-x-[-3px] rotate-1' : ''} transition-all`}>FINE</span>
            </h1>
            <p className="text-sm md:text-base mb-6 max-w-sm mx-auto">
              Question norms. Create identity. Express resistance through style.
            </p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase text-sm px-8 relative overflow-hidden group">
              <Link to="/products" className="mix-blend-difference">
                <span className={`inline-block relative z-10 ${glitchActive ? 'text-red-500' : ''} group-hover:text-black transition-all duration-500`}>
                  E X P L O R E&nbsp;&nbsp;N O W
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
