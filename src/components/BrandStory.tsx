
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BrandStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display mb-6">OUR STORY</h2>
            <p className="text-lg mb-6 text-zinc-700">
              Snyk was born from the streets, created for those who dare to stand out. 
              We believe in the power of self-expression through fashion – authentic
              pieces that speak to the youth culture, hip-hop roots, and the voice of 
              a generation that refuses to be silenced.
            </p>
            <p className="text-lg mb-8 text-zinc-700">
              Each collection is carefully curated to blend urban aesthetics with quality
              craftsmanship. We're not just selling clothes – we're building a community 
              of individuals who express themselves boldly and authentically.
            </p>
            <Button asChild className="bg-black hover:bg-zinc-800 text-white">
              <Link to="/about">More About Us</Link>
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-zinc-100 rounded-full -z-10"></div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1000" 
                alt="Snyk Brand Story" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-zinc-200 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
