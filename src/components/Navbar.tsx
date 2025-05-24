import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIndicator from './CartIndicator';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-zinc-800 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="http://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
              alt="Snyk Logo" 
              className="h-8 w-auto invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm hover:text-purple-400 transition-colors">
              Shop
            </Link>
            <Link to="/collections" className="text-sm hover:text-purple-400 transition-colors">
              Collections
            </Link>
            <Link to="/about" className="text-sm hover:text-purple-400 transition-colors">
              About
            </Link>
            <Link to="/coming-soon" className="text-sm hover:text-purple-400 transition-colors">
              Coming Soon
            </Link>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <CartIndicator />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-sm hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-sm hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/collections" 
                className="text-sm hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                to="/about" 
                className="text-sm hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/coming-soon" 
                className="text-sm hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Coming Soon
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
