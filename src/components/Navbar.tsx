
import React, { useState } from 'react';
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

  return (
    <header className="w-full bg-white sticky top-0 z-40 border-b border-zinc-200">
      <div className="container-custom flex items-center justify-between h-16">
        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full bg-white p-0">
              <div className="flex flex-col p-6">
                <div className="flex justify-end mb-8">
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X size={24} />
                    </Button>
                  </SheetTrigger>
                </div>
                <div className="space-y-6">
                  <Link to="/" className="text-2xl font-display uppercase">
                    Home
                  </Link>
                  <Link to="/products" className="text-2xl font-display uppercase">
                    Shop
                  </Link>
                  <Link to="/collections" className="text-2xl font-display uppercase">
                    Collections
                  </Link>
                  <Link to="/about" className="text-2xl font-display uppercase">
                    About
                  </Link>
                  <Link to="/contact" className="text-2xl font-display uppercase">
                    Contact
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
          <Link to="/" className="h-9">
            <img 
              src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
              alt="Snyk Logo" 
              className="h-full w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-10">
          <Link to="/" className="nav-link uppercase text-sm">
            Home
          </Link>
          <Link to="/products" className="nav-link uppercase text-sm">
            Shop
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
            <div className="fixed inset-0 bg-white z-50 flex flex-col">
              <div className="container-custom py-4">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-8"></div>
                  <Link to="/" className="h-6">
                    <img 
                      src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
                      alt="Snyk Logo" 
                      className="h-30 w-auto"
                    />
                  </Link>
                  <button 
                    onClick={() => setSearchOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="w-full max-w-xl mx-auto">
                  <input
                    type="text"
                    placeholder="SEARCH"
                    className="w-full p-2 border-b border-zinc-300 text-lg uppercase focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs h-4 w-4 flex items-center justify-center">
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
