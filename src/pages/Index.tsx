
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import HorizontalScroll from '@/components/HorizontalScroll';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Disable body scrollbar styles and add custom styling for horizontal scroll
  useEffect(() => {
    // Enhance the scrolling experience
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.classList.add('horizontal-scroll-page');
    
    // Add audacious styling to the page
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .page-transition-in {
        animation: fadeInBlur 1.2s ease-out forwards;
      }
      
      @keyframes fadeInBlur {
        0% { filter: blur(10px); opacity: 0; }
        100% { filter: blur(0); opacity: 1; }
      }
      
      .horizontal-section {
        position: relative;
      }
      
      .horizontal-section::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background: rgba(0,0,0,0.1);
      }
      
      .horizontal-section:last-child::after {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);
    
    if (pageRef.current) {
      pageRef.current.classList.add('page-transition-in');
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.classList.remove('horizontal-scroll-page');
      
      // Clean up custom styles
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-black" ref={pageRef}>
      <Navbar />
      <div className="relative">
        <HorizontalScroll>
          {/* Each section is a panel in the horizontal scroll */}
          <section className="w-screen h-screen flex-shrink-0 horizontal-section" id="hero">
            <Hero />
          </section>
          
          <section className="w-screen h-screen flex-shrink-0 horizontal-section" id="featured-products">
            <FeaturedProducts />
          </section>
          
          {/* Enhanced Deconstructed Latest Releases section */}
          <section className="w-screen h-screen flex-shrink-0 py-16 bg-white border-l border-r border-zinc-200 overflow-hidden horizontal-section" id="latest-releases">
            <div className="container-custom flex flex-col h-full">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
                <h2 className="text-xl md:text-4xl font-display uppercase glitch" data-text="LATEST RELEASES">LATEST RELEASES</h2>
                <span className="text-xs uppercase opacity-60 tracking-widest">Question Everything</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 flex-1">
                {/* Enhanced product displays with more audacious effects */}
                <div className="relative group overflow-hidden digital-noise">
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020" 
                    alt="Latest Release 1" 
                    className="w-full h-full object-cover transform transition-all duration-1000 ease-out group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-white text-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-3xl font-display glitch mb-2" data-text="REVOLT">REVOLT</div>
                      <div className="text-xs tracking-widest uppercase">Spring 2024</div>
                    </div>
                  </div>
                </div>
                
                {/* Abstract product presentation */}
                <div className="relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1020" 
                    alt="Latest Release 2" 
                    className="w-full h-full object-cover filter transition-all duration-700 group-hover:contrast-125"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border border-white w-24 h-24 rotate-45 opacity-0 group-hover:opacity-70 transition-all duration-700 transform group-hover:rotate-[225deg]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black to-transparent w-full">
                    <span className="font-display">PARADIGM</span>
                  </div>
                </div>
                
                {/* Surreal presentation */}
                <div className="relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1020" 
                    alt="Latest Release 3" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center transform rotate-90 origin-center">
                      <span className="font-display text-2xl">DISRUPT</span>
                    </div>
                  </div>
                </div>
                
                {/* Reimagined classic */}
                <div className="relative group overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=1020" 
                    alt="Latest Release 4" 
                    className="w-full h-full object-cover filter transition-all duration-500 group-hover:saturate-150" 
                  />
                  <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                  <div className="absolute top-2 right-2 text-xs bg-white px-2 py-1 transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    REDEFINED
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-0 group-hover:bg-opacity-70 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
                    <p className="text-xs tracking-widest uppercase">Limited Edition</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-auto pb-10">
                <Button variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-12 relative overflow-hidden group">
                  <span className="relative z-10 group-hover:text-white transition-colors">VIEW ALL COLLECTIONS</span>
                  <span className="absolute inset-0 bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"></span>
                </Button>
              </div>
            </div>
          </section>
          
          <section className="w-screen h-screen flex-shrink-0 horizontal-section" id="brand-story">
            <BrandStory />
          </section>
          
          <section className="w-screen h-screen flex-shrink-0 horizontal-section" id="newsletter">
            <Newsletter />
          </section>
          
          <section className="w-screen h-screen flex-shrink-0 horizontal-section" id="footer">
            <Footer />
          </section>
        </HorizontalScroll>
      </div>
    </div>
  );
};

export default Index;
