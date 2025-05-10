
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[85vh] bg-snyk-darkgray overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070')]" 
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
      
      <div className="container-custom relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-xl animate-fade-in [animation-delay:200ms]">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display text-white mb-4 leading-tight">
            DEFINE YOUR <span className="text-snyk-purple">STYLE</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-100 mb-8 max-w-md">
            Authentic streetwear for those who dare to express themselves. Limited drops, unlimited attitude.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-snyk-purple hover:bg-purple-700 text-white px-8 py-6 text-lg rounded">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded">
              <Link to="/collections">New Collection</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
