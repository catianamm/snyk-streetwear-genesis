
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        
        {/* Deconstructed Latest Releases section with social commentary */}
        <section className="py-16 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden border-t border-zinc-800">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
              <h2 className="text-xl md:text-2xl font-display uppercase">LATEST RELEASES</h2>
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
              <Button variant="outline" className="border-white hover:bg-white hover:text-black uppercase text-sm px-10 relative overflow-hidden group">
                <span className="relative z-10 group-hover:text-black transition-colors">VIEW ALL</span>
                <span className="absolute inset-0 bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
              </Button>
            </div>
          </div>
        </section>
        
        <BrandStory />
        <Newsletter />
      </main>
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default Index;
