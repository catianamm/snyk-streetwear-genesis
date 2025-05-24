
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      return;
    }
    
    setIsSubmitting(true);
    console.log('Starting newsletter subscription for:', email);
    
    try {
      // Call Supabase edge function for secure API handling
      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: { email }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Newsletter subscription successful:', data);
      
      if (data.success) {
        toast({
          title: "🎉 Successfully subscribed!",
          description: "Thank you! You'll be the first to know when we launch.",
        });
        setEmail('');
      } else if (data.alreadySubscribed) {
        toast({
          title: "Already subscribed!",
          description: "This email is already on our list. Thanks for your interest!",
        });
        setEmail('');
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="mb-10">
      <h3 className="text-sm uppercase mb-4">Get notified when we launch</h3>
      <div className="flex gap-2">
        <Input 
          type="email" 
          placeholder="Your email address"
          className="bg-zinc-900 border-zinc-800 focus:border-pink-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <Button 
          type="submit" 
          className="bg-white text-black hover:bg-pink-500 hover:text-white transition-colors"
          disabled={isSubmitting || !email}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterSignup;
