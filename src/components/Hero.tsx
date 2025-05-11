
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Create random glitch effect
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white text-black">
      {/* Deconstructed hero with juxtaposed imagery */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
        <div className={`absolute inset-0 z-10 bg-black opacity-0 ${glitchActive ? 'opacity-5' : ''} transition-opacity`}></div>
        
        {/* Main image */}
        <img 
          src="https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=2070" 
          alt="Hero Image" 
          className={`w-full h-full object-cover object-center ${glitchActive ? 'scale-[1.01] translate-x-[2px]' : ''} transition-all duration-200`}
        />
        
        {/* Text overlay with social commentary */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20">
          <div className="bg-black bg-opacity-50 p-6 md:p-10 max-w-lg text-center">
            <h1 className="text-4xl md:text-6xl font-display uppercase mb-4 mix-blend-difference">
              <span className={`inline-block ${glitchActive ? 'translate-x-[3px] translate-y-[2px]' : ''} transition-transform`}>RE</span>
              <span className="inline-block">DE</span>
              <span className={`inline-block ${glitchActive ? '-translate-x-[3px]' : ''} transition-transform`}>FINE</span>
            </h1>
            <p className="text-sm md:text-base mb-6 max-w-sm mx-auto">
              Question norms. Create identity. Express resistance through style.
            </p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black uppercase text-sm px-8">
              <Link to="/products">EXPLORE NOW</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left product feature - Deconstructed with art reference */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1974" 
                alt="Summer Collection" 
                className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
              />
              {/* Abstract symbolism overlay */}
              <div className="absolute top-0 left-0 w-20 h-20 border border-black mix-blend-difference">
                <div className="w-full h-full bg-white opacity-50"></div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <h2 className="text-lg md:text-xl font-display uppercase mb-2">SUMMER 2025</h2>
                <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-8">
                  <Link to="/collections/summer2025">SHOP NOW</Link>
                </Button>
              </div>
              {/* Typography as art element */}
              <div className="text-xs uppercase opacity-50 rotate-90 origin-bottom-right pb-6">
                REIMAGINED
              </div>
            </div>
          </div>
          
          {/* Right product feature - Surreal imagery */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=1974" 
                alt="Essentials Collection" 
                className="w-full h-full object-cover filter hover:contrast-125 transition-all duration-700"
              />
              {/* Minimalist design with a twist */}
              <div className={`absolute inset-0 border-2 border-white scale-95 ${glitchActive ? 'scale-[0.97] rotate-1' : ''} transition-all duration-300 opacity-60 pointer-events-none`}></div>
            </div>
            <div className="mt-4">
              <h2 className="text-lg md:text-xl font-display uppercase mb-2">ESSENTIALS</h2>
              <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-8 relative overflow-hidden group">
                <Link to="/collections/essentials">
                  <span className="relative z-10 group-hover:text-white transition-colors">SHOP NOW</span>
                  <span className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
