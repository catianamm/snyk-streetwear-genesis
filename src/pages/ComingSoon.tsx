
import React, { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import NewsletterSignup from '@/components/NewsletterSignup';
import SocialMediaLinks from '@/components/SocialMediaLinks';

const ComingSoon = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  // Occasional glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

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
          
          {/* Countdown Timer Component */}
          <CountdownTimer />
          
          {/* Newsletter Signup Component */}
          <NewsletterSignup />
          
          {/* Social Media Links Component */}
          <SocialMediaLinks />
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
