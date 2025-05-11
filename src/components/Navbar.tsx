
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
  
  // Add scroll effect
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
  
  // Create glitch effect on text
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(prev => !prev);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`w-full transition-all duration-300 sticky top-0 z-40 border-b ${
      scrolled ? 'bg-black text-white border-zinc-800' : 'bg-white text-black border-zinc-200'
    }`}>
      <div className="container-custom flex items-center justify-between h-16">
        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={scrolled ? "text-white" : "text-black"}>
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full bg-black text-white p-0">
              <div className="flex flex-col p-6">
                <div className="flex justify-end mb-8">
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <X size={24} />
                    </Button>
                  </SheetTrigger>
                </div>
                <div className="space-y-6">
                  <Link to="/" className="text-2xl font-display uppercase relative overflow-hidden">
                    <span className={`inline-block ${glitchText ? 'animate-pulse' : ''}`}>HOME</span>
                  </Link>
                  <Link to="/products" className="text-2xl font-display uppercase relative overflow-hidden">
                    <span className={`inline-block ${glitchText ? 'translate-x-[2px]' : ''} transition-all`}>SHOP</span>
                  </Link>
                  <Link to="/collections" className="text-2xl font-display uppercase">
                    COLLECTIONS
                  </Link>
                  <Link to="/about" className="text-2xl font-display uppercase">
                    ABOUT
                  </Link>
                  <Link to="/contact" className="text-2xl font-display uppercase">
                    CONTACT
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - deconstructed version */}
        <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
          <Link to="/" className="h-12 relative group">
            <div className="absolute h-full w-full overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
              <img 
                src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
                alt="Snyk Logo Glitch" 
                className="h-full w-auto translate-x-[2px] translate-y-[2px]"
              />
            </div>
            <img 
              src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
              alt="Snyk Logo" 
              className="h-full w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-10">
          <Link to="/" className={`nav-link uppercase text-sm ${glitchText ? 'line-through' : ''}`}>
            Home
          </Link>
          <Link to="/products" className="nav-link uppercase text-sm relative overflow-hidden">
            <span className="relative z-10">Shop</span>
            <span className="absolute top-0 left-0 w-full h-full bg-black text-white opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">SHOP</span>
          </Link>
          <Link to="/collections" className="nav-link uppercase text-sm">
            Collections
          </Link>
          <Link to="/about" className="nav-link uppercase text-sm">
            About
          </Link>
          <Link to="/contact" className="nav-link uppercase text-sm">
            Contact
          </Link>
        </nav>

        {/* Search & Cart */}
        <div className="flex items-center space-x-4">
          {searchOpen ? (
            <div className="fixed inset-0 bg-black z-50 flex flex-col">
              <div className="container-custom py-4">
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
                    className="text-white"
                  >
                    <X size={20} />
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
              className={scrolled ? "text-white" : ""}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Link to="/cart">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${scrolled ? "text-white" : ""}`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className={`absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs ${
                scrolled ? 'bg-white text-black' : 'bg-black text-white'
              }`}>
                0
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
