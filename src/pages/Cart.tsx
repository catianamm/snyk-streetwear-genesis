import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [cartItems] = useState([]);
  
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
              data-text="YOUR CART"
            >
              YOUR CART
            </h1>
            
            <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12"></div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl mb-8 text-zinc-300">Your cart is empty</p>
                
                <Button asChild variant="outline" className="border-white hover:bg-white hover:text-black uppercase text-sm px-10 relative overflow-hidden group">
                  <Link to="/products">
                    <span className="relative z-10 group-hover:text-black transition-colors">SHOP NOW</span>
                    <span className="absolute inset-0 bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Button>
              </div>
            ) : (
              <div>
                {/* Cart items will go here once implemented */}
                <p>Cart items display coming soon</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default Cart;
