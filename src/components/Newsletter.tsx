
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="bg-white py-16 border-t border-zinc-100">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
              alt="Snyk Logo" 
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-black mb-4">JOIN THE COMMUNITY</h2>
          <p className="text-zinc-600 mb-8 text-lg">
            Subscribe to get exclusive updates on new drops, special offers, and community events.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 bg-white border-zinc-200 text-black placeholder:text-zinc-400 rounded-none"
              required
            />
            <Button 
              type="submit" 
              className="bg-black hover:bg-zinc-800 text-white transition-colors rounded-none"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-zinc-500 text-sm">
            By subscribing, you agree to receive marketing communications from Snyk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
