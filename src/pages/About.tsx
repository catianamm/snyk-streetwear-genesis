
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

const About = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    // Random glitch effects for the section title
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <TopBar />
      
      <main className="flex-grow pt-12 ml-20 md:ml-24">
        <div className="relative py-16 overflow-hidden">
          <div className="scanlines absolute inset-0 opacity-30 pointer-events-none"></div>
          <div className="noise absolute inset-0 opacity-10 pointer-events-none"></div>
          
          <div className="container-custom relative z-10">
            <h1 
              className={`text-3xl md:text-4xl font-display uppercase mb-8 mega-glitch ${glitchActive ? 'glitching' : ''}`}
              data-text="ABOUT US"
            >
              ABOUT US
            </h1>
            
            <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="space-y-6">
                <h2 className="text-xl font-display uppercase">OUR STORY</h2>
                <p className="text-zinc-300">
                  Born from the underground scene of the late 2010s, Snyk emerged as a cultural response to the sterile, algorithmic-driven fashion industry. We represent the voice of an unfiltered generation - unapologetic and defiantly authentic.
                </p>
                <p className="text-zinc-300">
                  Each Snyk piece is more than clothing; it's a statement of resistance against the mundane and expected. Our designs deconstruct norms and rebuild them with raw creative energy, speaking to those who refuse to blend in.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Snyk Team" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-xl font-display uppercase mb-8">OUR VALUES</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-6 border border-zinc-800 hover:border-pink-500 transition-colors group">
                  <h3 className="text-lg font-display uppercase mb-4 group-hover:text-pink-400 transition-colors">DISRUPTION</h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">We challenge established norms and push boundaries in design and culture.</p>
                </div>
                
                <div className="p-6 border border-zinc-800 hover:border-purple-500 transition-colors group">
                  <h3 className="text-lg font-display uppercase mb-4 group-hover:text-purple-400 transition-colors">AUTHENTICITY</h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">We remain true to our underground roots and create with genuine intention.</p>
                </div>
                
                <div className="p-6 border border-zinc-800 hover:border-orange-500 transition-colors group">
                  <h3 className="text-lg font-display uppercase mb-4 group-hover:text-orange-400 transition-colors">EXPRESSION</h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">We provide a platform for unfiltered creative expression and individuality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default About;
