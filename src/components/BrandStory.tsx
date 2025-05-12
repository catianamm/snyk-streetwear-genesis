
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BrandStory = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-zinc-900 to-black relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 border border-zinc-700 opacity-20 rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border border-zinc-700 opacity-30 -rotate-12"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-display uppercase mb-6 text-zinc-100">
            <span className="relative inline-block">
              Our Story
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"></span>
            </span>
          </h2>
          <p className="text-sm mb-6 text-zinc-300">
            Established in 2021, SNYK was founded with the vision of creating authentic 
            streetwear that embodies the spirit of urban culture while maintaining 
            high-quality craftsmanship and distinctive design.
          </p>
          <p className="text-sm mb-8 text-zinc-300">
            Each piece in our collection represents our dedication to self-expression 
            and individuality. Our garments are designed to be timeless while embracing 
            contemporary trends, creating a unique intersection of classic and modern aesthetics.
          </p>
          <Button asChild className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 uppercase text-sm px-10 group relative overflow-hidden">
            <Link to="/about">
              <span className="relative z-10">Read More</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-800/0 via-purple-800 to-purple-800/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
