
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-display text-white">SNYK</Link>
            <p className="mt-4">
              Authentic streetwear for the bold and expressive. Define your own style.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-display text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/collections/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/collections/sale" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display text-white mb-4">Info</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display text-white mb-4">Connect</h3>
            <p className="mb-2">Follow us on social media for exclusive content and drops.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-white">Instagram</a>
              <a href="#" className="text-zinc-400 hover:text-white">TikTok</a>
              <a href="#" className="text-zinc-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} SNYK. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
