
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
      // Brevo API integration
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'A9vGsEbWVxkPdfQ1',
        },
        body: JSON.stringify({
          email: email,
          listIds: [2], // Updated list ID - you may need to check your Brevo account for the correct ID
          attributes: {
            FIRSTNAME: '',
            LASTNAME: '',
            SOURCE: 'Coming Soon Page'
          },
          updateEnabled: true
        }),
      });

      console.log('Brevo API response status:', response.status);
      const responseData = await response.json();
      console.log('Brevo API response data:', responseData);

      if (response.ok || response.status === 201) {
        console.log(`Newsletter subscription successful: ${email}`);
        toast({
          title: "🎉 Thank you for subscribing!",
          description: "You'll be the first to know when we launch. Check your email for confirmation.",
        });
        setEmail('');
      } else if (response.status === 400 && responseData.code === 'duplicate_parameter') {
        // Handle case where email is already subscribed
        console.log('Email already subscribed:', email);
        toast({
          title: "Already subscribed!",
          description: "This email is already on our list. Thanks for your interest!",
        });
        setEmail('');
      } else {
        throw new Error(`Brevo API error: ${response.status} - ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: "There was an error subscribing you to our newsletter. Please try again later.",
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
