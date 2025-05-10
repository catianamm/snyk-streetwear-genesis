
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <section className="py-16 bg-white border-t border-b border-zinc-200">
          <div className="container-custom text-center">
            <h2 className="text-xl md:text-2xl font-display uppercase mb-10">LATEST RELEASES</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020" alt="Latest Release 1" className="w-full aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1020" alt="Latest Release 2" className="w-full aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1020" alt="Latest Release 3" className="w-full aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=1020" alt="Latest Release 4" className="w-full aspect-square object-cover" />
            </div>
            <Button variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-10">
              VIEW ALL
            </Button>
          </div>
        </section>
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
