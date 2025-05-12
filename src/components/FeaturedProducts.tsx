
import React, { useEffect, useState } from 'react';
import ProductCard, { ProductType } from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts();
  const [glitchActive, setGlitchActive] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  
  // Filter to get only featured products
  const featuredProducts = products.filter(product => product.isFeatured);
  
  // If no featured products, show first 4 products as featured
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts 
    : products.slice(0, 4);

  useEffect(() => {
    // Random glitch effects for the section title
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);
    
    // Text distortion glitch
    const textGlitchInterval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 80);
    }, Math.random() * 5000 + 3000);
    
    return () => {
      clearInterval(glitchInterval);
      clearInterval(textGlitchInterval);
    };
  }, []);
  
  console.log('Featured products:', featuredProducts);
  console.log('All products:', products);
  console.log('Display products:', displayProducts);

  return (
    <section id="products" className="py-16 bg-white relative overflow-hidden">
      {/* Lighter scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30"></div>
      
      {/* Random noise pattern */}
      <div className="noise absolute inset-0 opacity-10 pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <h2 
          className={`text-xl md:text-2xl font-display uppercase text-center mb-10 mega-glitch ${glitchActive ? 'glitching' : ''} ${textGlitch ? 'text-distort' : ''}`} 
          data-text="FEATURED PRODUCTS"
        >
          <span className="relative">
            F<span className={`inline-block ${glitchActive ? 'translate-x-[2px] translate-y-[1px]' : ''}`}>E</span>ATURED{' '}
            <span className="relative overflow-hidden">
              P<span className={`inline-block ${glitchActive ? '-translate-x-[1px]' : ''}`}>ROD</span>UCTS
              {glitchActive && <span className="absolute top-0 left-0 w-full h-full bg-white mix-blend-difference"></span>}
            </span>
          </span>
        </h2>
        
        {loading && (
          <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            <p className="text-lg glitch-text">Loading products from WooCommerce...</p>
          </div>
        )}
        
        {error && !loading && (
          <div className="text-center py-12 text-zinc-800">
            <p className="text-lg mb-2 error-text">{error}</p>
            <p className="text-base text-zinc-600">Showing fallback products</p>
          </div>
        )}
        
        {!loading && (
          <>
            <div className="product-grid">
              {displayProducts.length > 0 ? 
                displayProducts.map((product, index) => (
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
            
            <div className="flex justify-center mt-12">
              <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-10 relative overflow-hidden group brutal-button">
                <Link to="/products">
                  <span className="relative z-10 group-hover:text-white transition-colors">VIEW ALL</span>
                  <span className="absolute inset-0 bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="glitch-hover-effect"></span>
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
