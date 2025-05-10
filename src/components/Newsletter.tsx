
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="bg-white py-16 border-t border-zinc-200">
      <div className="container-custom">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl md:text-2xl font-display uppercase mb-6 text-center">Newsletter</h2>
          <p className="text-center mb-8 text-sm">
            Sign up to receive updates on new arrivals and special offers
          </p>
          
          <form className="flex gap-0 border border-black">
            <Input 
              type="email" 
              placeholder="Email address"
              className="flex-1 border-0 focus:ring-0 text-sm"
              required
            />
            <Button 
              type="submit" 
              className="bg-black hover:bg-zinc-800 text-white uppercase text-xs px-6"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
