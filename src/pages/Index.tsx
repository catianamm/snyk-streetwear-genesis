
import React, { useEffect } from 'react';
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
  // Disable body scrollbar styles and add custom styling for horizontal scroll
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.classList.add('horizontal-scroll-page');
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
      document.body.classList.remove('horizontal-scroll-page');
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="relative">
        <HorizontalScroll>
          {/* Each section is a panel in the horizontal scroll */}
          <section className="w-screen h-screen flex-shrink-0" id="hero">
            <Hero />
          </section>
          
          <section className="w-screen h-screen flex-shrink-0" id="featured-products">
            <FeaturedProducts />
          </section>
          
          {/* Deconstructed Latest Releases section with social commentary */}
          <section className="w-screen h-screen flex-shrink-0 py-16 bg-white border-t border-zinc-200 overflow-hidden" id="latest-releases">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
                <h2 className="text-xl md:text-3xl font-display uppercase glitch" data-text="LATEST RELEASES">LATEST RELEASES</h2>
                <span className="text-xs uppercase opacity-60">Question Everything</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Image with text-based graphic */}
                <div className="relative group">
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020" 
                    alt="Latest Release 1" 
                    className="w-full aspect-square object-cover" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-display text-xl">REVOLT</span>
                  </div>
                </div>
                
                {/* Image with abstract symbolism */}
                <div className="relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1020" 
                    alt="Latest Release 2" 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <div className="border border-white w-16 h-16 rotate-45 opacity-70"></div>
                  </div>
                </div>
                
                {/* Image with surreal elements */}
                <div className="relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1020" 
                    alt="Latest Release 3" 
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Image with reimagined classic */}
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=1020" 
                    alt="Latest Release 4" 
                    className="w-full aspect-square object-cover" 
                  />
                  <div className="absolute top-2 right-2 text-xs bg-white px-2 py-1">
                    REDEFINED
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-10 relative overflow-hidden group">
                  <span className="relative z-10 group-hover:text-white transition-colors">VIEW ALL</span>
                  <span className="absolute inset-0 bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                </Button>
              </div>
            </div>
          </section>
          
          <section className="w-screen h-screen flex-shrink-0" id="brand-story">
            <BrandStory />
          </section>
          
          <section className="w-screen h-screen flex-shrink-0" id="newsletter">
            <Newsletter />
          </section>
          
          <section className="w-screen h-screen flex-shrink-0" id="footer">
            <Footer />
          </section>
        </HorizontalScroll>
      </div>
    </div>
  );
};

export default Index;
