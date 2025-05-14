
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Facebook, Instagram, Twitter, X } from 'lucide-react';

const TopBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Fixed top bar for search, cart and social icons */}
      <div className="fixed top-0 right-0 z-50 flex items-center space-x-2 p-4">
        {/* Social Media Icons */}
        <div className="hidden md:flex items-center  space-x-2 mr-2">
                    <Button variant="ghost" size="icon" className="text-white relative group overflow-hidden">
            <Instagram size={18} />
                      <span className="absolute inset-0 bg-gradient-to-r group-hover:animate-button-glitch from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>          
        </div>
        
        {/* Search Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSearchOpen(true)}
          className="text-white relative group overflow-hidden"
        >
          <Search className="h-5 w-5 group-hover:animate-button-glitch relative z-10" />
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Button>
        
        {/* Cart Button */}
        <Link to="/cart" className="relative group overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-white group-hover:scale-105 transition-transform"
          >
            <ShoppingCart className="h-5 w-5 group-hover:animate-button-glitch" />
            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px]  text-white">
              0
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
        </Link>
      </div>
      
      {/* Full-screen search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="absolute inset-0 noise opacity-5"></div>
          <div className="absolute inset-0 scanlines"></div>
          
          <div className="container-custom py-4 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="w-8"></div>
              <Link to="/" className="h-12">
                <img 
                  src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
                  alt="Snyk Logo" 
                  className="h-full w-auto"
                />
              </Link>
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X size={20} className="hover:animate-button-glitch" />
              </button>
            </div>
            <div className="w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="SEARCH"
                className="w-full p-2 border-b border-zinc-700 text-lg uppercase focus:outline-none bg-transparent text-white"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
