
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewArrivals from '@/components/NewArrivals';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import SquareElements from '@/components/SquareElements';

const Index = () => {
  // Add state variables for glitch effects
  const [glitchActive, setGlitchActive] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  
  // Create random glitch effects at intervals
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    
    const textGlitchInterval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 300);
    }, 5000);
    
    return () => {
      clearInterval(glitchInterval);
      clearInterval(textGlitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <TopBar />
      <SquareElements />
      <main className="flex-grow">
        <section id="home" className="min-h-screen">
          <Hero />
        </section>
        
        {/* Make Collections its own section outside of the ml-14 container */}
        <section id="collections" className="min-h-screen">
          <Collections />
        </section>
        
        <div className="ml-14 md:ml-16">
          <section id="featured" className="min-h-screen">
            <FeaturedProducts />
          </section>
          
          {/* New Arrivals section */}
          <section id="latest" className="min-h-screen">
            <NewArrivals />
          </section>
          
          <section id="newsletter" className="">
            <Newsletter />
          </section>
        </div>
      </main>
      <Footer className="ml-14 md:ml-16" />
    </div>
  );
};

export default Index;
