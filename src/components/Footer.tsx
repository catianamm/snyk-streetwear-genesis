
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`bg-black text-zinc-300 border-t border-zinc-800 ${className}`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="block mb-4">
              <img 
                src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
                alt="Snyk Logo" 
                className="h-12 w-auto invert"
              />
            </Link>
            <p className="text-sm mt-4 text-zinc-400">
              Authentic streetwear for the bold and expressive. Define your own style.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 text-zinc-100">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-xs hover:text-purple-400 transition-colors">All Products</Link></li>
              <li><Link to="/collections/new-arrivals" className="text-xs hover:text-purple-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections/best-sellers" className="text-xs hover:text-purple-400 transition-colors">Best Sellers</Link></li>
              <li><Link to="/collections/sale" className="text-xs hover:text-purple-400 transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 text-zinc-100">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-xs hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-xs hover:text-purple-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-xs hover:text-purple-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-xs hover:text-purple-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 text-zinc-100">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-xs hover:text-purple-400 transition-colors">Instagram</a>
              <a href="#" className="text-xs hover:text-purple-400 transition-colors">Twitter</a>
              <a href="#" className="text-xs hover:text-purple-400 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} SNYK. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs hover:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs hover:text-purple-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
         {/* Bottom left squares */}
    <div className={`pointer-events-none inset-0 z-0 overflow-hidden ${className}`}>
        <div className="relative bottom-6 left-32 w-20 h-20 border border-pink-500/20 rotate-45"></div>
      
      </div>
        </div>
    </footer>
  );
};

export default Footer;
