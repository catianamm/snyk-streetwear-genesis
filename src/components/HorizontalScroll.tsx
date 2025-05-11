
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [glitching, setGlitching] = useState(false);
  
  // Calculate content width and trigger glitch effects during scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Get the total scrollable width
    const sectionsTotal = Array.from(container.children).reduce((width, child) => {
      return width + child.getBoundingClientRect().width;
    }, 0);
    
    setTotalWidth(sectionsTotal);
    setViewportWidth(window.innerWidth);
    
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle the horizontal scrolling based on vertical scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const newPosition = scrollPercentage * (totalWidth - viewportWidth);
      setScrollPosition(newPosition);
      
      // Add random glitch effect during scrolling
      if (Math.random() > 0.9) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 200);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWidth, viewportWidth]);
  
  // Apply the horizontal scroll transformation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    container.style.transform = `translateX(-${scrollPosition}px)`;
  }, [scrollPosition]);
  
  // Create a dummy height div to allow scrolling
  useEffect(() => {
    const totalScrollHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    // Create a dummy element for vertical scrolling
    let dummyHeight = document.getElementById('dummy-scroll-height');
    if (!dummyHeight) {
      dummyHeight = document.createElement('div');
      dummyHeight.id = 'dummy-scroll-height';
      dummyHeight.style.position = 'absolute';
      dummyHeight.style.top = '0';
      dummyHeight.style.left = '0';
      dummyHeight.style.width = '1px';
      dummyHeight.style.pointerEvents = 'none';
      dummyHeight.style.visibility = 'hidden';
      document.body.appendChild(dummyHeight);
    }
    
    // Calculate how tall the dummy element needs to be
    const requiredHeight = (totalWidth / viewportWidth) * viewportHeight;
    dummyHeight.style.height = `${Math.max(requiredHeight, totalScrollHeight)}px`;
    
    return () => {
      if (dummyHeight) document.body.removeChild(dummyHeight);
    };
  }, [totalWidth]);

  return (
    <div className="horizontal-scroll-container overflow-hidden fixed inset-0">
      <div 
        ref={scrollContainerRef} 
        className={`horizontal-scroll-inner flex transition-transform duration-100 ${glitching ? 'translate-y-[2px] scale-[1.005]' : ''}`}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </div>
      
      {/* Overlay for glitch effects */}
      <div 
        className={`fixed inset-0 bg-white opacity-0 pointer-events-none z-[100] mix-blend-difference transition-opacity duration-100 
        ${glitching ? 'opacity-5' : ''}`} 
      />
    </div>
  );
};

export default HorizontalScroll;
