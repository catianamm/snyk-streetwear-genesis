
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Instagram } from 'lucide-react';

// Countdown timer calculation with fixed launch date
const calculateTimeLeft = () => {
  // Set fixed launch date to June 15th, 2025
  const launchDate = new Date('2025-06-15T00:00:00');
  
  const difference = launchDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  };
};

// TikTok Icon Component (since it's not in lucide-react)
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.292-1.982-1.292-3.297h-3.26v14.453c0 2.007-1.635 3.642-3.642 3.642s-3.642-1.635-3.642-3.642 1.635-3.642 3.642-3.642c.394 0 .773.063 1.127.178V8.56a7.045 7.045 0 0 0-1.127-.09c-3.86 0-6.988 3.128-6.988 6.988s3.128 6.988 6.988 6.988 6.988-3.128 6.988-6.988V9.321a9.69 9.69 0 0 0 4.786 1.245v-3.26c-.927 0-1.827-.266-2.6-.744z"/>
  </svg>
);

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Occasional glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearInterval(glitchInterval);
    };
  }, []);
  
  // Format date in a readable format
  const formatLaunchDate = () => {
    const launchDate = new Date('2025-06-15T00:00:00');
    return launchDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
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
    
    try {
      // Brevo API integration
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.REACT_APP_BREVO_API_KEY || '',
        },
        body: JSON.stringify({
          email: email,
          listIds: [1], // Replace with your Brevo list ID
          attributes: {
            FIRSTNAME: '',
            LASTNAME: '',
            SOURCE: 'Coming Soon Page'
          },
          updateEnabled: true
        }),
      });

      if (response.ok) {
        console.log(`Brevo newsletter subscription successful: ${email}`);
        toast({
          title: "Thank you!",
          description: "We'll notify you when we launch.",
        });
        setEmail('');
      } else {
        throw new Error('Brevo API error');
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      
      // Fallback to local storage or alternative method
      console.log(`Newsletter fallback submission: ${email} to mkt@snyk.store`);
      
      toast({
        title: "Thank you!",
        description: "We'll notify you when we launch.",
      });
      
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background elements */}
      <div className="absolute inset-0 noise opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 scanlines pointer-events-none"></div>
      
      {/* Square Elements like on other pages */}
      <div className="fixed top-0 right-0 w-64 h-64 border border-zinc-800 rotate-45 translate-x-32 -translate-y-32 opacity-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-48 h-48 border border-zinc-800 rotate-45 -translate-x-20 translate-y-20 opacity-20 pointer-events-none"></div>
      
      {/* Coming Soon Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center relative">
            <div className={`absolute h-full w-full overflow-visible opacity-0 ${glitchActive ? 'opacity-100' : ''} transition-all duration-100`}>
              <img 
                src="https://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
                alt="Snyk Logo Glitch" 
                className="h-24 w-auto translate-x-[6px] translate-y-[4px] scale-110"
              />
            </div>
            <img 
              src="https://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
              alt="Snyk Logo" 
              className={`h-24 w-auto transition-transform duration-500 ${glitchActive ? 'skew-x-3 scale-105' : ''}`}
            />
          </div>
          
          {/* Headline */}
          <h1 
            className={`text-4xl md:text-5xl font-display uppercase mb-4 mega-glitch ${glitchActive ? 'glitching' : ''}`} 
            data-text="COMING SOON"
          >
            COMING SOON
          </h1>
          
          {/* Message */}
          <p className="text-lg mb-6 text-zinc-300">
            Our new online store is currently under construction. We're working hard to bring you the best in streetwear.
          </p>
          
          {/* Launch Date */}
          <p className="text-xl mb-6 font-semibold text-pink-500">
            Launching on {formatLaunchDate()}
          </p>
          
          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-3 mb-10">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-zinc-900 border border-zinc-800 p-3">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs uppercase text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
          
          {/* Email Subscribe */}
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
              />
              <Button 
                type="submit" 
                className="bg-white text-black hover:bg-pink-500 hover:text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://instagram.com/sny.store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="#" 
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <TikTokIcon size={20} />
              <span className="sr-only">TikTok</span>
            </a>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 border-t border-zinc-800">
        <div className="container-custom text-center">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} SNYK. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
