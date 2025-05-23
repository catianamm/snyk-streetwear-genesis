
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewArrivals from '@/components/NewArrivals';
import MostWanted from '@/components/MostWanted';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import SquareElements from '@/components/SquareElements';
import { Button } from '@/components/ui/button';
import { MoveRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroContentLeftProps {
  scrollIntensity: number;
  glitchActive: boolean;
}

const Index = () => {
  // Add state variables for glitch effects
  const [glitchActive, setGlitchActive] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  const [hoverShopNow, setHoverShopNow] = useState(false);
  
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
         {/* Most Wanted section */}
          <section id="most-wanted" className="min-h-screen">
            <MostWanted />
          </section>
          <section id="shop" className=" ">
            <div className="ml-14 md:ml-16">
              {/*  <section id="featured" className="min-h-screen">
            <FeaturedProducts />
             </section>  */}        
              {/* Collections section with full height */}
            
            <Link to="/products" className="group">
              <div 
                className="flex flex-row items-center gap-2 hover:gap-4 transition-all duration-300"
                onMouseEnter={() => setHoverShopNow(true)}
                onMouseLeave={() => setHoverShopNow(false)}
              >
                <h1 className={`text-5xl mt-2 md:text-7xl lg:text-8xl font-display uppercase mb-6 leading-none 
                  mega-glitch group-hover:text-purple-400 transition-colors duration-300 ${glitchActive ? 'glitching' : ''}`}
                  data-text="SHOP NOW"
                > 
                  <span className="text-5xl mt-2 md:text-7xl lg:text-8xl font-display uppercase mt-6 leading-none">
                    shop now
                  </span>
                </h1>
                <ArrowRight 
                  className={`w-8 h-8 md:w-12 md:h-12 transform transition-transform duration-300 ${hoverShopNow ? 'translate-x-2' : ''}`}
                />
              </div>           
            </Link>
          </div>
         </section>
                                  
          {/* New Arrivals section */}
          <section id="latest" className="min-h-screen">
            <NewArrivals />
          </section>
          
          <section id="newsletter" className="">
            <Newsletter />
          </section>
       
      </main>
      <Footer className="ml-14 md:ml-16" />
    </div>
  );
};

export default Index;
