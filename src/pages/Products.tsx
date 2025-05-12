
import React, { useEffect, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

const Products = () => {
  const { products, loading, error } = useProducts();
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    // Random glitch effects for the section title
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <TopBar />
      
      <main className="flex-grow pt-12 pb-20 ml-20 md:ml-24">
        {/* Page header with glitch effect */}
        <div className="container-custom py-12 relative">
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
          <div className="absolute inset-0 noise opacity-10 pointer-events-none"></div>
          
          <h1 
            className={`text-3xl md:text-4xl font-display uppercase mb-8 mega-glitch ${glitchActive ? 'glitching' : ''}`}
            data-text="ALL PRODUCTS"
          >
            ALL PRODUCTS
          </h1>
          
          <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12"></div>
          
          {loading && (
            <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
              <p className="text-lg glitch-text">Loading products from WooCommerce...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-lg mb-2 error-text">{error}</p>
              <p className="text-base text-zinc-400">Please try again later</p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="product-grid">
              {products.length > 0 ? 
                products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`product-card-wrapper ${index % 2 === 0 ? 'even-product' : 'odd-product'}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                )) : 
                <div className="col-span-full text-center py-12">
                  <p>No products found. Please add products in your WooCommerce store.</p>
                </div>
              }
            </div>
          )}
        </div>
      </main>
      
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default Products;
