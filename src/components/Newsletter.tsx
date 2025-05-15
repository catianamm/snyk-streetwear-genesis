
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden border-t border-zinc-800">
      {/* Abstract elements */}
      <div className="absolute -right-20 top-10 w-40 h-20 border border-zinc-700 opacity-20 rotate-45"></div>
      <div className="absolute -left-10 bottom-10 w-24 h-24 border border-zinc-700 opacity-10 -rotate-12"></div>
      
      {/* Subtle scanlines */}
      <div className="absolute inset-0 scanlines opacity-5"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl md:text-2xl font-display uppercase mb-6 text-center text-zinc-100">Newsletter</h2>
          <p className="text-center mb-8 text-sm text-zinc-400">
            Sign up to receive updates on new arrivals and special offers
          </p>
          
          <form className="flex gap-0 border border-zinc-700 bg-zinc-900 backdrop-blur-sm">
            <Input 
              type="email" 
              placeholder="Email address"
              className="flex-1 border-0 focus:ring-0 text-sm bg-transparent text-zinc-300"
              required
            />
            <Button 
              type="submit" 
              className="bg-zinc-800 hover:bg-zinc-700 text-white uppercase text-xs px-6 relative overflow-hidden group"
            >
              <span className="relative z-10">Subscribe</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-800/0 via-purple-800 to-purple-800/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
