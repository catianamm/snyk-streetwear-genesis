
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

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
      // Brevo API integration with proper headers and payload
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'A9vGsEbWVxkPdfQ1',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          listIds: [2],
          attributes: {
            FIRSTNAME: '',
            LASTNAME: '',
            SOURCE: 'Coming Soon Page'
          },
          updateEnabled: true
        }),
      });

      console.log('Brevo API response status:', response.status);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Newsletter subscription successful:', responseData);
        
        toast({
          title: "🎉 Successfully subscribed!",
          description: "Thank you! You'll be the first to know when we launch.",
        });
        setEmail('');
      } else {
        const errorData = await response.json();
        console.log('Brevo API error response:', errorData);
        
        if (response.status === 400 && errorData.code === 'duplicate_parameter') {
          console.log('Email already subscribed:', email);
          toast({
            title: "Already subscribed!",
            description: "This email is already on our list. Thanks for your interest!",
          });
          setEmail('');
        } else {
          throw new Error(`API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }
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
