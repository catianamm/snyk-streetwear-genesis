
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[85vh] bg-zinc-100 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070')]" 
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-xl animate-fade-in [animation-delay:200ms]">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
              alt="Snyk Logo" 
              className="h-16 md:h-20 w-auto mb-6"
            />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display text-black mb-4 leading-tight">
            DEFINE YOUR <span className="text-black">STYLE</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 mb-8 max-w-md">
            Authentic streetwear for those who dare to express themselves. Limited drops, unlimited attitude.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-black hover:bg-zinc-800 text-white px-8 py-6 text-lg rounded">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-black text-black hover:bg-black/5 px-8 py-6 text-lg rounded">
              <Link to="/collections">New Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
