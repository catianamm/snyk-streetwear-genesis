
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Flame } from 'lucide-react';

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoverGlitch, setHoverGlitch] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create random glitch effects
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroImgs = heroRef.current.querySelectorAll('.parallax-img');
        heroImgs.forEach((img: Element) => {
          const speed = (img as HTMLElement).dataset.speed || '0.1';
          (img as HTMLElement).style.transform = `translateY(${scrollY * parseFloat(speed)}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative bg-black text-white overflow-hidden">
      {/* Enhanced noise texture */}
      <div className="absolute inset-0 noise opacity-20"></div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 scanlines opacity-30"></div>
      
      {/* Main hero area with split design */}
      <div className="w-full min-h-[90vh] flex flex-col md:flex-row">
        {/* Left side: Bold typography and call to action */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 z-20 relative">
          <div className={`mb-4 inline-flex items-center text-sm uppercase tracking-widest font-bold 
            ${glitchActive ? 'text-distort' : ''} text-purple-400`}>
            <Sparkles className="w-4 h-4 mr-2" />
            <span>New Collection 2025</span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-display uppercase mb-6 leading-none 
            mega-glitch ${glitchActive ? 'glitching' : ''}`}
            data-text="BREAK THE RULES">
            <span className="block">BREAK</span>
            <span className="block text-purple-500 shine-text transform -rotate-1">THE RULES</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-md mb-8 text-zinc-300">
            Defy expectations. Express resistance. Create your identity through 
            style that speaks louder than words.
          </p>
          
          <div className="flex space-x-4">
            <Button
              asChild
              size="lg"
              className={`bg-purple-600 hover:bg-purple-700 text-white border-none px-8 py-6 
                text-lg uppercase tracking-wider relative overflow-hidden group ${hoverGlitch ? 'animate-button-glitch' : ''}`}
              onMouseEnter={() => setHoverGlitch(true)}
              onMouseLeave={() => setHoverGlitch(false)}
            >
              <Link to="/products">
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="glitch-hover-effect"></span>
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black uppercase 
                tracking-wider relative overflow-hidden group"
            >
              <Link to="/about">
                <Flame className="w-4 h-4 mr-2 group-hover:text-red-500" />
                <span>Our Story</span>
              </Link>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-24 h-24 border border-purple-500 opacity-40 rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 border border-pink-500 opacity-30 -rotate-12"></div>
        </div>
        
        {/* Right side: Audacious imagery with glitch effects */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          {/* Main image with glitch effect */}
          <div className="relative h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920" 
              alt="Fashion Model" 
              className={`w-full h-full object-cover parallax-img ${glitchActive ? 'glitch-img' : ''}`}
              data-speed="0.05"
            />
            
            {/* Glitch overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 
              mix-blend-color-dodge ${glitchActive ? 'opacity-70' : 'opacity-40'}`}></div>
            
            {/* RGB split effect */}
            <div className={`absolute inset-0 rgb-shift ${glitchActive ? 'active' : ''}`}></div>
            
            {/* Abstract geometric overlay */}
            <svg className="absolute inset-0 w-full h-full z-10 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,100 100,0 100,100" fill="url(#gradient)" className="animate-pulse-slow"></polygon>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.7"></stop>
                  <stop offset="100%" stopColor="#D946EF" stopOpacity="0.3"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Secondary floating image */}
          <div className="absolute bottom-10 right-10 w-40 h-56 overflow-hidden border-2 border-white z-20
            transform rotate-6 shadow-lg hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800" 
              alt="Fashion Detail" 
              className="w-full h-full object-cover parallax-img"
              data-speed="0.1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-xs uppercase tracking-widest mb-2 opacity-70">Scroll</span>
        <div className="w-px h-6 bg-white opacity-50 animate-bounce"></div>
      </div>
      
      {/* Secondary product features section */}
      <div className="container-custom py-12 md:py-16 bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left product feature - Deconstructed with art reference */}
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1974" 
                alt="Summer Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Animated RGB overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 to-pink-500/0 
                group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500"></div>
              
              {/* Abstract symbolism overlay */}
              <div className="absolute top-0 left-0 w-20 h-20 border border-white mix-blend-difference">
                <div className="w-full h-full bg-white opacity-50"></div>
              </div>
              
              {/* Futuristic element */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 z-10 
                transform rotate-3 border-l-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-widest">Experimental</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <h2 className="text-lg md:text-xl font-display uppercase mb-2 group-hover:text-purple-400 transition-colors">
                  SUMMER 2025
                </h2>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black 
                  uppercase text-sm px-8 relative overflow-hidden group">
                  <Link to="/collections/summer2025">
                    <span className="relative z-10 group-hover:text-black transition-colors">SHOP NOW</span>
                    <span className="absolute inset-0 bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform"></span>
                  </Link>
                </Button>
              </div>
              {/* Typography as art element */}
              <div className="text-xs uppercase opacity-50 rotate-90 origin-bottom-right pb-6">
                REIMAGINED
              </div>
            </div>
          </div>
          
          {/* Right product feature - Surreal imagery */}
          <div className="relative group overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=1974" 
                alt="Essentials Collection" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:contrast-125"
              />
              {/* Glitch effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                bg-gradient-to-b from-transparent via-purple-500/10 to-black/40"></div>
              
              {/* Animated border */}
              <div className={`absolute inset-0 border-2 border-white scale-95 opacity-0 
                group-hover:opacity-60 transition-all duration-700 group-hover:scale-90 group-hover:rotate-3`}></div>
            </div>
            <div className="mt-4 group-hover:translate-x-2 transition-transform duration-300">
              <h2 className="text-lg md:text-xl font-display uppercase mb-2 group-hover:text-purple-400 transition-colors">
                ESSENTIALS
              </h2>
              <Button asChild variant="outline" className="border-white text-white hover:bg-purple-600 hover:border-purple-600 
                hover:text-white uppercase text-sm px-8 relative overflow-hidden group">
                <Link to="/collections/essentials">
                  <span className="relative z-10 transition-colors">SHOP NOW</span>
                  <span className="absolute inset-0 bg-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
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
