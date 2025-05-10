
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="bg-snyk-darkgray py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display text-white mb-4">JOIN THE COMMUNITY</h2>
          <p className="text-zinc-300 mb-8 text-lg">
            Subscribe to get exclusive updates on new drops, special offers, and community events.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              required
            />
            <Button 
              type="submit" 
              className="bg-snyk-purple hover:bg-purple-700 text-white transition-colors"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-zinc-400 text-sm">
            By subscribing, you agree to receive marketing communications from Snyk.
            Don't worry, we respect your privacy and will never spam you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
