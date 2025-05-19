
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Facebook, Instagram, Twitter } from 'lucide-react';

// Countdown timer calculation
const calculateTimeLeft = () => {
  // Set launch date to one month from now
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 1);
  
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

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);

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
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      return;
    }
    
    // Here you would typically connect to a newsletter service API
    toast({
      title: "Thank you!",
      description: "We'll notify you when we launch.",
    });
    
    setEmail('');
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
                src="http://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
                alt="Snyk Logo Glitch" 
                className="h-24 w-auto translate-x-[6px] translate-y-[4px] scale-110"
              />
            </div>
            <img 
              src="http://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
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
          <p className="text-lg mb-10 text-zinc-300">
            Our new online store is currently under construction. We're working hard to bring you the best in streetwear.
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
              />
              <Button 
                type="submit" 
                className="bg-white text-black hover:bg-pink-500 hover:text-white"
              >
                Subscribe
              </Button>
            </div>
          </form>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
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
