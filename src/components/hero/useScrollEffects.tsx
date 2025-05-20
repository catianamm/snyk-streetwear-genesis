
import { useState, useEffect, useRef, RefObject } from 'react';

export const useScrollEffects = () => {
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [hoverGlitch, setHoverGlitch] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create random glitch effects
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    
    const textGlitchInterval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 300);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearInterval(textGlitchInterval);
    };
  }, []);
  
  // Enhanced parallax effect on scroll with color transitions
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        
        // Calculate scroll intensity (0-1) for scroll-based effects
        // Modified to make effects appear earlier - multiplying by 2.5
        const intensity = Math.min(scrollY / (heroHeight * 0.3), 1);
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

  return {
    scrollIntensity,
    glitchActive,
    hoverGlitch, 
    setHoverGlitch,
    heroRef,
    textGlitch
  };
};
