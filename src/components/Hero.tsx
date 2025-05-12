import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Flame } from 'lucide-react';

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoverGlitch, setHoverGlitch] = useState(false);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create random glitch effects
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Enhanced parallax effect on scroll with color transitions
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const heroHeight = heroRef.current.offsetHeight;
        
        // Calculate scroll intensity (0-1) for scroll-based effects
        const intensity = Math.min(scrollY / (heroHeight * 0.7), 1);
        setScrollIntensity(intensity);
        
        // Enhanced parallax effect with depth
        const heroImgs = heroRef.current.querySelectorAll('.parallax-img');
        heroImgs.forEach((img: Element) => {
          const speed = (img as HTMLElement).dataset.speed || '0.1';
          (img as HTMLElement).style.transform = `translateY(${scrollY * parseFloat(speed)}px) scale(${1 + intensity * 0.1})`;
        });
        
        // Rotate elements on scroll
        const rotateElements = heroRef.current.querySelectorAll('.rotate-on-scroll');
        rotateElements.forEach((el: Element) => {
          const direction = (el as HTMLElement).dataset.direction || '1';
          const rotateAmount = scrollY * 0.03 * parseInt(direction);
          (el as HTMLElement).style.transform = `rotate(${rotateAmount}deg)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative bg-black text-white overflow-hidden">
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
      
      {/* Scroll-reactive color overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/10 pointer-events-none z-10"
        style={{ opacity: scrollIntensity * 0.5 }}
      ></div>
      
      {/* Main hero area with split design */}
      <div className="w-full min-h-[90vh] flex flex-col md:flex-row">
        {/* Left side: Bold typography and call to action */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 z-20 relative">
          <div className={`mb-4 inline-flex items-center text-sm uppercase tracking-widest font-bold 
            ${glitchActive ? 'text-distort' : ''} text-zinc-400`}
            style={{ color: `rgb(${200 + scrollIntensity * 55}, ${140 + scrollIntensity * 40}, ${220 + scrollIntensity * 35})` }}
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
            <span className="block text-transparent bg-clip-text"
              style={{ 
                backgroundImage: `linear-gradient(90deg, #fff ${scrollIntensity * 10}%, #F97316 ${50 + scrollIntensity * 20}%, #9b87f5 ${100 - scrollIntensity * 10}%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text'
              }}
            >AUTHENTIC</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-md mb-8 text-zinc-300"
            style={{ transform: `translateX(${scrollIntensity * 30}px) translateY(${scrollIntensity * 10}px)` }}
          >
            Defy expectations. Express resistance. Create your identity through 
            style that speaks louder than words.
          </p>
          
          <div className="flex space-x-4" style={{ transform: `translateY(${scrollIntensity * 20}px)` }}>
            <Button
              asChild
              size="lg"
              className={`bg-white hover:bg-zinc-200 text-black border-none px-8 py-6 
                text-lg uppercase tracking-wider relative overflow-hidden group ${hoverGlitch ? 'animate-button-glitch' : ''}`}
              onMouseEnter={() => setHoverGlitch(true)}
              onMouseLeave={() => setHoverGlitch(false)}
              style={{ 
                background: scrollIntensity > 0.5 ? 'linear-gradient(to right, #9b87f5, #F97316)' : 'white',
                color: scrollIntensity > 0.5 ? 'white' : 'black'
              }}
            >
              <Link to="/products">
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white 
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
              style={{ 
                borderColor: scrollIntensity > 0.5 ? '#9b87f5' : 'white',
                color: scrollIntensity > 0.5 ? '#9b87f5' : 'white'
              }}
            >
              <Link to="/about">
                <Flame className="w-4 h-4 mr-2 text-white group-hover:text-black" />
                <span>Our Story</span>
              </Link>
            </Button>
          </div>
          
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
        
        {/* Right side: Audacious imagery with glitch effects enhanced with scroll reactivity */}
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
            
            {/* Abstract geometric overlay with scroll-based animation */}
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
                  <stop offset="100%" stopColor={scrollIntensity > 0.5 ? "#9b87f5" : "#cccccc"} stopOpacity={0.3 + scrollIntensity * 0.4}></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Secondary floating image with enhanced scroll effects */}
          <div 
            className="absolute bottom-10 right-10 w-40 h-56 overflow-hidden border-2 border-white z-20
              transform rotate-6 shadow-lg hidden md:block"
            style={{ 
              transform: `rotate(${6 + scrollIntensity * 6}deg) translateY(${-scrollIntensity * 30}px)`,
              borderColor: scrollIntensity > 0.5 ? '#9b87f5' : 'white',
              boxShadow: `0 10px 25px rgba(155, 135, 245, ${0.2 + scrollIntensity * 0.4})`
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
              style={{ background: `linear-gradient(to top, rgba(155, 135, 245, ${0.3 + scrollIntensity * 0.3}) 0%, transparent 100%)` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator with enhanced animation on scroll */}
      <div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        style={{ opacity: 1 - scrollIntensity * 2 }}
      >
        <span 
          className="text-xs uppercase tracking-widest mb-2 opacity-70"
          style={{ color: scrollIntensity > 0.3 ? '#9b87f5' : 'white' }}
        >Scroll</span>
        <div 
          className="w-px h-6 bg-white opacity-50 animate-bounce"
          style={{ 
            background: `linear-gradient(to bottom, white, ${scrollIntensity > 0.5 ? '#9b87f5' : 'white'})`,
            height: `${6 - scrollIntensity * 3}px` 
          }}
        ></div>
      </div>
      
      {/* Secondary product features section with enhanced scroll effects */}
      <div className="container-custom py-12 md:py-16 bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left product feature - Deconstructed with art reference */}
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1974" 
                alt="Summer Collection" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img"
                data-speed="0.03"
                style={{ filter: `grayscale(${100 - scrollIntensity * 100}%)` }}
              />
              {/* Animated RGB overlay on hover with scroll enhancement */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-black/0 to-white/0 
                  group-hover:from-black/30 group-hover:to-white/30 transition-all duration-500"
                style={{ 
                  background: `linear-gradient(to top right, 
                    rgba(0,0,0,${scrollIntensity * 0.3}), 
                    rgba(155,135,245,${scrollIntensity * 0.2}))`
                }}
              ></div>
              
              {/* Abstract symbolism overlay with scroll color change */}
              <div className="absolute top-0 left-0 w-20 h-20 border border-white mix-blend-difference">
                <div 
                  className="w-full h-full opacity-50"
                  style={{ 
                    background: scrollIntensity > 0.5 ? 'linear-gradient(45deg, #9b87f5, #F97316)' : 'white',
                    opacity: 0.5 + (scrollIntensity * 0.3)
                  }}
                ></div>
              </div>
              
              {/* Futuristic element with scroll reactivity */}
              <div 
                className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 z-10 
                  transform rotate-3 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ 
                  borderColor: scrollIntensity > 0.5 ? '#9b87f5' : 'white',
                  transform: `rotate(${3 + scrollIntensity * 2}deg) translateY(${-scrollIntensity * 10}px)`,
                  background: `rgba(0,0,0,${0.8 - scrollIntensity * 0.3})`
                }}
              >
                <span 
                  className="text-xs uppercase tracking-widest"
                  style={{ color: scrollIntensity > 0.5 ? '#9b87f5' : 'white' }}
                >Experimental</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <h2 
                  className="text-lg md:text-xl font-display uppercase mb-2 group-hover:text-white transition-colors"
                  style={{ color: scrollIntensity > 0.5 ? '#9b87f5' : 'white' }}
                >
                  SUMMER 2025
                </h2>
                <Button asChild variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black uppercase text-sm px-8 relative overflow-hidden group"
                  style={{ 
                    borderColor: scrollIntensity > 0.5 ? '#9b87f5' : 'white',
                    color: scrollIntensity > 0.5 ? '#9b87f5' : 'white'
                  }}
                >
                  <Link to="/collections/summer2025">
                    <span className="relative z-10 group-hover:text-black transition-colors">SHOP NOW</span>
                    <span className="absolute inset-0 bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform"></span>
                  </Link>
                </Button>
              </div>
              {/* Typography as art element with scroll color change */}
              <div 
                className="text-xs uppercase opacity-50 rotate-90 origin-bottom-right pb-6"
                style={{ 
                  color: scrollIntensity > 0.5 ? '#F97316' : 'white',
                  opacity: 0.5 + (scrollIntensity * 0.3)
                }}
              >
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
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:contrast-125 parallax-img"
                data-speed="0.05"
                style={{ 
                  filter: `grayscale(${100 - scrollIntensity * 100}%) contrast(${1 + scrollIntensity * 0.2})`,
                  transform: `scale(${1 + scrollIntensity * 0.05})`
                }}
              />
              {/* Glitch effect on hover with scroll enhancement */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  bg-gradient-to-b from-transparent via-white/10 to-black/40"
                style={{ 
                  background: `linear-gradient(to bottom, 
                    transparent,
                    rgba(155,135,245,${scrollIntensity * 0.1}), 
                    rgba(0,0,0,${0.4 + scrollIntensity * 0.2}))`,
                  opacity: scrollIntensity * 0.5
                }}
              ></div>
              
              {/* Animated border with scroll color change */}
              <div 
                className={`absolute inset-0 border-2 scale-95 opacity-0 
                  group-hover:opacity-60 transition-all duration-700 group-hover:scale-90 group-hover:rotate-3`}
                style={{ 
                  borderColor: scrollIntensity > 0.5 ? '#F97316' : 'white',
                  opacity: scrollIntensity * 0.6,
                  transform: `scale(${0.95 - scrollIntensity * 0.05}) rotate(${scrollIntensity * 3}deg)`
                }}
              ></div>
            </div>
            <div 
              className="mt-4 group-hover:translate-x-2 transition-transform duration-300"
              style={{ transform: `translateX(${scrollIntensity * 10}px)` }}
            >
              <h2 
                className="text-lg md:text-xl font-display uppercase mb-2 group-hover:text-white transition-colors"
                style={{ color: scrollIntensity > 0.5 ? '#F97316' : 'white' }}
              >
                ESSENTIALS
              </h2>
              <Button asChild variant="outline" 
                className="border-white text-white hover:bg-white hover:border-white hover:text-black uppercase text-sm px-8 relative overflow-hidden group"
                style={{ 
                  borderColor: scrollIntensity > 0.5 ? '#F97316' : 'white',
                  color: scrollIntensity > 0.5 ? '#F97316' : 'white'
                }}
              >
                <Link to="/collections/essentials">
                  <span className="relative z-10 transition-colors">SHOP NOW</span>
                  <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
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
