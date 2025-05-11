
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  
  // Calculate content width and sections
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Get the total scrollable width and all sections
    const sectionElements = Array.from(container.children) as HTMLElement[];
    setSections(sectionElements);
    
    const sectionsTotal = sectionElements.reduce((width, child) => {
      return width + child.getBoundingClientRect().width;
    }, 0);
    
    setTotalWidth(sectionsTotal);
    setViewportWidth(window.innerWidth);
    setIsInitialized(true);
    
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      
      // Recalculate section widths on resize
      const updatedTotal = sectionElements.reduce((width, child) => {
        return width + child.getBoundingClientRect().width;
      }, 0);
      setTotalWidth(updatedTotal);
      
      // Update current position based on active section
      if (activeSection < sectionElements.length) {
        const newPosition = calculatePositionForSection(activeSection, sectionElements);
        setScrollPosition(newPosition);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);
  
  // Calculate position for a specific section
  const calculatePositionForSection = (index: number, sectionElements: HTMLElement[]) => {
    let position = 0;
    for (let i = 0; i < index; i++) {
      position += sectionElements[i].getBoundingClientRect().width;
    }
    return position;
  };
  
  // Handle the horizontal scrolling based on vertical scroll
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      
      // Use scroll percentage to determine active section
      const sectionIndex = Math.min(
        Math.floor(scrollPercentage * sections.length),
        sections.length - 1
      );
      
      if (sectionIndex !== activeSection) {
        setActiveSection(sectionIndex);
        
        // Add random glitch effect during section change
        setGlitching(true);
        setTimeout(() => setGlitching(false), 300);
      }
      
      // Smooth position calculation
      const newPosition = calculatePositionForSection(sectionIndex, sections);
      const extraScroll = (scrollPercentage * sections.length - sectionIndex) * (sections[sectionIndex]?.offsetWidth || 0);
      
      setScrollPosition(newPosition + extraScroll);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInitialized, sections, activeSection]);
  
  // Apply the horizontal scroll transformation with smooth animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    container.style.transform = `translateX(-${scrollPosition}px)`;
  }, [scrollPosition]);
  
  // Create a dummy height div to allow scrolling
  useEffect(() => {
    if (!isInitialized || sections.length === 0) return;
    
    // Calculate the total height needed for scrolling
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
    
    // Calculate how tall the dummy element needs to be - slightly more than required to ensure full scrolling
    const requiredHeight = totalWidth / viewportWidth * viewportHeight * 1.05;
    dummyHeight.style.height = `${Math.max(requiredHeight, totalScrollHeight)}px`;
    
    return () => {
      if (dummyHeight && dummyHeight.parentNode) {
        dummyHeight.parentNode.removeChild(dummyHeight);
      }
    };
  }, [isInitialized, totalWidth, sections]);

  // Navigation buttons
  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && activeSection > 0) {
      const newSection = activeSection - 1;
      setActiveSection(newSection);
      
      // Calculate scroll position in document
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const newScrollY = totalHeight * (newSection / (sections.length - 1));
      window.scrollTo({ top: newScrollY, behavior: 'smooth' });
      
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    } else if (direction === 'next' && activeSection < sections.length - 1) {
      const newSection = activeSection + 1;
      setActiveSection(newSection);
      
      // Calculate scroll position in document
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const newScrollY = totalHeight * (newSection / (sections.length - 1));
      window.scrollTo({ top: newScrollY, behavior: 'smooth' });
      
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }
  };

  return (
    <div className="horizontal-scroll-container overflow-hidden fixed inset-0">
      <div 
        ref={scrollContainerRef} 
        className={`horizontal-scroll-inner flex transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${glitching ? 'translate-y-[3px] scale-[1.01] blur-[1px]' : ''}`}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </div>
      
      {/* Navigation buttons */}
      <div className="fixed bottom-10 right-10 z-50 flex items-center space-x-4">
        <button 
          onClick={() => handleNavigation('prev')} 
          className={`p-3 border border-black bg-white hover:bg-black hover:text-white transition-colors ${activeSection === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          disabled={activeSection === 0}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-sm font-mono">
          {activeSection + 1} / {sections.length}
        </div>
        <button 
          onClick={() => handleNavigation('next')} 
          className={`p-3 border border-black bg-white hover:bg-black hover:text-white transition-colors ${activeSection === sections.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          disabled={activeSection === sections.length - 1}
        >
          <ArrowRight size={20} />
        </button>
      </div>
      
      {/* Section indicator dots */}
      <div className="fixed left-10 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-3">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === index ? 'bg-black w-5' : 'bg-gray-400'}`}
              onClick={() => {
                // Calculate scroll position for this section
                const totalHeight = document.body.scrollHeight - window.innerHeight;
                const newScrollY = totalHeight * (index / (sections.length - 1));
                window.scrollTo({ top: newScrollY, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced overlay for glitch effects */}
      <div 
        className={`fixed inset-0 bg-white opacity-0 pointer-events-none z-[100] mix-blend-difference transition-opacity duration-100 
        ${glitching ? 'opacity-10' : ''}`} 
      />
      
      {/* Scan lines overlay */}
      <div className="fixed inset-0 z-[90] pointer-events-none opacity-20 scan-lines"></div>
    </div>
  );
};

export default HorizontalScroll;
