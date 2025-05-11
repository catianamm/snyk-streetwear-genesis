import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [glitchLogo, setGlitchLogo] = useState(false);
  
  // Add scroll effect with more extreme transformation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Create more frequent glitch effects
  useEffect(() => {
    // More frequent random glitch text effect
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 3000);
    
    // Random logo glitches
    const logoInterval = setInterval(() => {
      setGlitchLogo(true);
      setTimeout(() => setGlitchLogo(false), 150);
    }, 4000);
    
    return () => {
      clearInterval(interval);
      clearInterval(logoInterval);
    };
  }, []);

  return (
    <header className={`w-full transition-all duration-300 sticky top-0 z-40 ${
      scrolled 
        ? 'bg-black text-white border-b border-zinc-800 h-16' 
        : 'bg-white text-black border-b border-zinc-200 h-20'
    }`}>
      <div className="container-custom h-full flex items-center justify-between">
        {/* Mobile menu with enhanced glitch effect */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`${scrolled ? "text-white" : "text-black"} relative overflow-hidden group`}>
                <Menu size={24} className="group-hover:animate-button-glitch" />
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full bg-black text-white p-0">
              <div className="flex flex-col p-6 relative">
                <div className="absolute inset-0 noise opacity-5"></div>
                <div className="absolute inset-0 scanlines"></div>
                
                <div className="flex justify-end mb-8 relative z-10">
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                      <X size={24} className="hover:animate-button-glitch" />
                    </Button>
                  </SheetTrigger>
                </div>
                <div className="space-y-6 relative z-10">
                  <Link to="/" className="text-3xl font-display uppercase relative overflow-hidden group">
                    <span className={`inline-block ${glitchText ? 'mega-glitch glitching' : ''} group-hover:text-gray-300`} data-text="HOME">HOME</span>
                  </Link>
                  <Link to="/products" className="text-3xl font-display uppercase relative overflow-hidden group">
                    <span className={`inline-block ${glitchText ? 'translate-x-[3px]' : ''} transition-all group-hover:text-gray-300`} data-text="SHOP">SHOP</span>
                  </Link>
                  <Link to="/collections" className="text-3xl font-display uppercase group">
                    <span className="group-hover:text-gray-300">COLLECTIONS</span>
                  </Link>
                  <Link to="/about" className="text-3xl font-display uppercase group">
                    <span className="group-hover:text-gray-300">ABOUT</span>
                  </Link>
                  <Link to="/contact" className="text-3xl font-display uppercase group">
                    <span className="group-hover:text-gray-300">CONTACT</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - with transcending, dislocated and rotated effect - original color preserved */}
        <div className="flex-1 lg:flex-none flex justify-center lg:justify-start relative">
          <Link to="/" className="h-20 relative group -mt-6 -mb-3 transform -rotate-3 hover:-rotate-6 transition-transform duration-500">
            <div className={`absolute h-full w-full overflow-visible opacity-0 ${glitchLogo ? 'opacity-100' : ''} transition-all duration-100`}>
              <img 
                src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
                alt="Snyk Logo Glitch" 
                className="h-full w-auto translate-x-[6px] translate-y-[4px] scale-110"
              />
            </div>
            <div className="absolute h-full w-full overflow-visible opacity-0 group-hover:opacity-100 transition-all duration-300">
              <img 
                src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
                alt="Snyk Logo Hover" 
                className="h-full w-auto translate-x-[4px] translate-y-[2px] scale-110"
              />
            </div>
            <img 
              src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
              alt="Snyk Logo" 
              className={`h-full w-auto transition-transform duration-500 ${glitchLogo ? 'skew-x-3 scale-105' : ''}`}
            />
            <div className="absolute top-0 left-0 h-full w-full noise opacity-10 pointer-events-none"></div>
          </Link>
        </div>

        {/* Desktop Navigation - with enhanced hover effects */}
        <nav className="hidden lg:flex space-x-10">
          <Link to="/" className={`nav-link uppercase text-sm relative ${glitchText ? 'line-through' : ''} group`}>
            <span className="relative z-10 transition-all duration-300 group-hover:text-distort">Home</span>
            <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-black'}`}></span>
          </Link>
          <Link to="/products" className="nav-link uppercase text-sm relative overflow-hidden group">
            <span className="relative z-10 transition-all duration-300 group-hover:text-distort">Shop</span>
            <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-black'}`}></span>
            <span className="absolute top-0 left-0 w-full h-full bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">SHOP</span>
          </Link>
          <Link to="/collections" className="nav-link uppercase text-sm relative group">
            <span className="relative z-10 transition-all duration-300 group-hover:text-distort">Collections</span>
            <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-black'}`}></span>
          </Link>
          <Link to="/about" className="nav-link uppercase text-sm relative group">
            <span className="relative z-10 transition-all duration-300 group-hover:text-distort">About</span>
            <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-black'}`}></span>
          </Link>
          <Link to="/contact" className="nav-link uppercase text-sm relative group">
            <span className="relative z-10 transition-all duration-300 group-hover:text-distort">Contact</span>
            <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-black'}`}></span>
          </Link>
        </nav>

        {/* Search & Cart with more dramatic effects */}
        <div className="flex items-center space-x-4">
          {searchOpen ? (
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
                      className="h-full w-auto invert"
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
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(true)}
              className={`${scrolled ? "text-white" : "text-black"} relative group overflow-hidden`}
            >
              <Search className="h-5 w-5 group-hover:animate-button-glitch relative z-10" />
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          )}
          <Link to="/cart" className="relative group overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${scrolled ? "text-white" : "text-black"} group-hover:scale-105 transition-transform`}
            >
              <ShoppingCart className="h-5 w-5 group-hover:animate-button-glitch" />
              <span className={`absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] ${
                scrolled ? 'bg-white text-black' : 'bg-black text-white'
              } transition-colors`}>
                0
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
