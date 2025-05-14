
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Search, ShoppingCart, Menu, X, Facebook, Instagram, Twitter } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [glitchLogo, setGlitchLogo] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  
  // Enhanced scroll effect with progress tracking and section detection
  useEffect(() => {
    const handleScroll = () => {
      // Track scroll position for progress effects
      const scrollPos = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPos / maxScroll, 1);
      setScrollProgress(progress);
      
      // Scrolled state
      if (scrollPos > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Detect active section
      const sections = ['home', 'collections', 'featured', 'new', 'newsletter'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
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
    <header className="fixed left-0 top-0 h-full max-w-16 md:w-24 z-40 flex flex-col transition-all duration-500 bg-black text-white border-r border-zinc-800 shadow-lg shadow-purple-900/20">
      {/* Dynamic progress indicator */}
      <div 
        className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 transition-all duration-300"
        style={{ 
          opacity: 1,
          height: `${100 * scrollProgress}%` 
        }}
      ></div>
      
      <div className="h-full flex flex-col items-center justify-between py-6">
        {/* Logo - with transcending, dislocated and rotated effect - original color preserved */}
        <div className="flex justify-center relative">
          <Link to="/" className="h-16 relative group transform -rotate-3 hover:-rotate-6 transition-transform duration-500">
            <div className={`absolute h-full w-full overflow-visible opacity-0 ${glitchLogo ? 'opacity-100' : ''} transition-all duration-100`}>
              <img 
                src="http://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
                alt="Snyk Logo Glitch" 
                className="h-full w-auto translate-x-[6px] translate-y-[4px] scale-110"
              />
            </div>
            <div className="absolute h-full w-full overflow-visible opacity-0 group-hover:opacity-100 transition-all duration-300">
              <img 
                src="http://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
                alt="Snyk Logo Hover" 
                className="h-full w-auto translate-x-[4px] translate-y-[2px] scale-110"
              />
            </div>
            <img 
              src="http://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
              alt="Snyk Logo" 
              className={`h-full w-auto transition-transform duration-500 ${glitchLogo ? 'skew-x-3 scale-105' : ''}`}
            />
            <div className="absolute top-0 left-0 h-full w-full noise opacity-10 pointer-events-none"></div>
          </Link>
        </div>

        {/* Vertical Navigation Links with vertical text */}
        <NavigationMenu orientation="vertical" className="flex flex-col space-y-10">
          <NavigationMenuList className="flex flex-col space-y-10">
            
            <NavigationMenuItem>
              <Link 
                to="/products" 
                className={`nav-link relative overflow-hidden group flex flex-col items-center ${activeSection === 'shop' ? 'text-pink-400' : ''}`}
              >
                <span className="vertical-text text-sm uppercase tracking-wide relative z-10 transition-all duration-300 group-hover:text-pink-400 transform-rotate-90 origin-center whitespace-nowrap py-6">Shop</span>
                <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-pink-500 to-orange-500 ${activeSection === 'shop' ? 'w-full' : ''} group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </NavigationMenuItem>

 <NavigationMenuItem>
              <Link 
                to="/#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured')?.scrollIntoView({behavior: 'smooth'});
                }}
                className={`nav-link relative group flex flex-col items-center ${activeSection === 'featured' ? 'text-purple-400' : ''}`}
              >
                <span className="vertical-text text-sm uppercase tracking-wide relative z-10 transition-all duration-300 group-hover:text-purple-400 transform-rotate-90 origin-center whitespace-nowrap py-6">Featured</span>
                <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-500 to-pink-500 ${activeSection === 'featured' ? 'w-full' : ''} group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link 
                to="/#collections"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('collections')?.scrollIntoView({behavior: 'smooth'});
                }}
                className={`nav-link relative group flex flex-col items-center ${activeSection === 'collections' ? 'text-orange-400' : ''}`}
              >
                <span className="vertical-text text-sm uppercase tracking-wide relative z-10 transition-all duration-300 group-hover:text-orange-400 transform-rotate-90 origin-center whitespace-nowrap py-6">Collections</span>
                <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-orange-500 to-yellow-500 ${activeSection === 'collections' ? 'w-full' : ''} group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </NavigationMenuItem>
            
           
            
            <NavigationMenuItem>
              <Link 
                to="/#new"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('new')?.scrollIntoView({behavior: 'smooth'});
                }}
                className={`nav-link relative group flex flex-col items-center ${activeSection === 'new' ? 'text-blue-400' : ''}`}
              >
                <span className="vertical-text text-sm uppercase tracking-wide relative z-10 transition-all duration-300 group-hover:text-blue-400 transform-rotate-90 origin-center whitespace-nowrap py-6">New</span>
                <span className={`absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 to-cyan-500 ${activeSection === 'new' ? 'w-full' : ''} group-hover:w-full transition-all duration-300`}></span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile menu button at bottom on vertical navbar */}
        <div className="lg:hidden block">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white relative overflow-hidden group">
                <Menu size={24} className="group-hover:animate-button-glitch" />
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
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
                    <span className={`inline-block ${glitchText ? 'mega-glitch glitching' : ''} group-hover:text-purple-400`} data-text="HOME">HOME</span>
                  </Link>
                  <Link to="/products" className="text-3xl font-display uppercase relative overflow-hidden group">
                    <span className={`inline-block ${glitchText ? 'translate-x-[3px]' : ''} transition-all group-hover:text-pink-400`} data-text="SHOP">SHOP</span>
                  </Link>
                  <Link 
                    to="/#collections" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('collections')?.scrollIntoView({behavior: 'smooth'});
                    }}
                    className="text-3xl font-display uppercase group"
                  >
                    <span className="group-hover:text-orange-400">COLLECTIONS</span>
                  </Link>
                  <Link 
                    to="/#featured" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('featured')?.scrollIntoView({behavior: 'smooth'});
                    }}
                    className="text-3xl font-display uppercase group"
                  >
                    <span className="group-hover:text-purple-400">FEATURED</span>
                  </Link>
                  <Link 
                    to="/#latest" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('latest')?.scrollIntoView({behavior: 'smooth'});
                    }}
                    className="text-3xl font-display uppercase group"
                  >
                    <span className="group-hover:text-blue-400">LATEST</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
