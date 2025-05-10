
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-white text-black">
      {/* Main hero image */}
      <div className="w-full aspect-[16/9] md:aspect-[21/9]">
        <img 
          src="https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=2070" 
          alt="Hero Image" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left product feature */}
          <div className="aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1974" 
              alt="Summer Collection" 
              className="w-full h-full object-cover"
            />
            <div className="mt-4">
              <h2 className="text-lg md:text-xl font-display uppercase mb-2">SUMMER 2025</h2>
              <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-8">
                <Link to="/collections/summer2025">SHOP NOW</Link>
              </Button>
            </div>
          </div>
          
          {/* Right product feature */}
          <div className="aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=1974" 
              alt="Essentials Collection" 
              className="w-full h-full object-cover"
            />
            <div className="mt-4">
              <h2 className="text-lg md:text-xl font-display uppercase mb-2">ESSENTIALS</h2>
              <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-8">
                <Link to="/collections/essentials">SHOP NOW</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
