
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-zinc-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="block mb-4">
              <img 
                src="/lovable-uploads/6cfa3ddb-234b-4de4-acf5-1fc606e41b97.png" 
                alt="Snyk Logo" 
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-sm mt-4">
              Authentic streetwear for the bold and expressive. Define your own style.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-xs hover:underline">All Products</Link></li>
              <li><Link to="/collections/new-arrivals" className="text-xs hover:underline">New Arrivals</Link></li>
              <li><Link to="/collections/best-sellers" className="text-xs hover:underline">Best Sellers</Link></li>
              <li><Link to="/collections/sale" className="text-xs hover:underline">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-xs hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="text-xs hover:underline">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-xs hover:underline">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-xs hover:underline">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-xs hover:underline">Instagram</a>
              <a href="#" className="text-xs hover:underline">Twitter</a>
              <a href="#" className="text-xs hover:underline">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between">
          <p className="text-xs">&copy; {new Date().getFullYear()} SNYK. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-xs hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
