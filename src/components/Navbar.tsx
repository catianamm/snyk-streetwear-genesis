
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
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-40">
      <div className="container-custom flex items-center justify-between h-16 md:h-15">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-zinc-900">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-white">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="text-xl font-display font-bold">
                  Home
                </Link>
                <Link to="/products" className="text-xl font-display font-bold">
                  Shop
                </Link>
                <Link to="/collections" className="text-xl font-display font-bold">
                  Collections
                </Link>
                <Link to="/about" className="text-xl font-display font-bold">
                  About
                </Link>
                <Link to="/contact" className="text-xl font-display font-bold">
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link to="/" className="h-8 md:h-10">
            <img 
              src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
              alt="Snyk Logo" 
              className="h-full w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Shop
          </Link>
          <Link to="/collections" className="nav-link">
            Collections
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* Search & Cart */}
        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <div className="fixed inset-0 bg-black/70 flex items-start justify-center pt-20 px-4 z-50">
              <div className="bg-white rounded-lg p-4 w-full max-w-md relative">
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-4"
                >
                  <X size={20} />
                </button>
                <div className="pt-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border border-zinc-300 rounded-md"
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
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
