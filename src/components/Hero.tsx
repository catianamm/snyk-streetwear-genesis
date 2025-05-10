
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[85vh] bg-black text-white overflow-hidden">
      {/* Modern, urban background with a subtle overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=2064')]" 
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-xl animate-fade-in [animation-delay:200ms]">
          <div className="mb-8 flex items-center">
            <img 
              src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
              alt="Snyk Logo" 
              className="h-16 md:h-20 w-auto mb-6"
            />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display text-white mb-6 leading-none">
            DEFINE YOUR <br /><span className="text-zinc-300">IDENTITY</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-md">
            Exclusive streetwear for the next generation. Minimal design, maximum impact.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-white hover:bg-zinc-200 text-black px-8 py-6 text-lg">
              <Link to="/products">SHOP NOW</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              <Link to="/collections">SS25 COLLECTION</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
