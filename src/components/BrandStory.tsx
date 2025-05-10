
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BrandStory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-display uppercase mb-6">Our Story</h2>
          <p className="text-sm mb-6">
            Established in 2021, SNYK was founded with the vision of creating authentic 
            streetwear that embodies the spirit of urban culture while maintaining 
            high-quality craftsmanship and distinctive design.
          </p>
          <p className="text-sm mb-8">
            Each piece in our collection represents our dedication to self-expression 
            and individuality. Our garments are designed to be timeless while embracing 
            contemporary trends, creating a unique intersection of classic and modern aesthetics.
          </p>
          <Button asChild className="bg-black hover:bg-zinc-800 text-white uppercase text-sm px-10">
            <Link to="/about">Read More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
