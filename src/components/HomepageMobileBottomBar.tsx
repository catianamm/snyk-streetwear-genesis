import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const HomepageMobileBottomBar = () => {
  const [glitchText, setGlitchText] = useState(false); // Keep glitch state if needed for mobile links

  // You might want to add glitch effects here too, similar to Navbar.tsx
  // For simplicity, let's omit them for now unless requested.

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black text-white border-t border-zinc-800 shadow-lg shadow-purple-900/20 h-16 flex items-center justify-around lg:hidden"> {/* Added lg:hidden */}
      {/* Mobile Menu Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white relative overflow-hidden group">
            <span className="flex items-center justify-center h-full w-full relative">
              <Menu size={24} className="group-hover:animate-button-glitch" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </Button>
        </SheetTrigger>
        {/* Sheet Content (Mobile Menu) - Copied from Navbar.tsx */}
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
              {/* Mobile Links - Adjusted for navigation */}
              <Link to="/products" className="text-3xl font-display uppercase relative overflow-hidden group">
                <span className={`inline-block ${glitchText ? 'translate-x-[3px]' : ''} transition-all group-hover:text-pink-400`} data-text="SHOP">SHOP</span>
              </Link>
              <Link
                to="/collections"
                className="text-3xl font-display uppercase group"
              >
                <span className="group-hover:text-orange-400">COLLECTIONS</span>
              </Link>
              {/* Removed onClick and e.preventDefault() - rely on browser hash scrolling after navigation */}
              <Link
                to="/home#most-wanted"
                className="text-3xl font-display uppercase group"
              >
                <span className="group-hover:text-purple-400">MOST WANTED</span>
              </Link>
              <Link
                to="/home#new"
                className="text-3xl font-display uppercase group"
              >
                <span className="group-hover:text-green-400">NEW</span>
              </Link>
               <Link to="/user-panel" className="text-3xl font-display uppercase group">
                 <span className="group-hover:text-purple-400">MY ACCOUNT</span>
               </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add other icons here if needed, e.g., Search, Cart */}
      {/* For now, Search and Cart remain in the TopBar on mobile homepage */}

    </footer>
  );
};

export default HomepageMobileBottomBar;