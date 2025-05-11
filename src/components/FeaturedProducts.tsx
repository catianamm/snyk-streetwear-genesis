
import React, { useEffect, useState } from 'react';
import ProductCard, { ProductType } from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { fetchProducts } from '@/lib/woocommerce';
import { useProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts();
  
  // Filter to get only featured products
  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-xl md:text-2xl font-display uppercase text-center mb-10 glitch" data-text="FEATURED PRODUCTS">FEATURED PRODUCTS</h2>
        
        {loading && (
          <div className="text-center py-12">
            <p className="text-lg">Loading products...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12 text-red-500">
            <p className="text-lg">{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="product-grid">
              {featuredProducts.length > 0 ? 
                featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                )) : 
                <div className="col-span-full text-center py-12">
                  <p>No featured products found.</p>
                </div>
              }
            </div>
            
            <div className="flex justify-center mt-12">
              <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-10 relative overflow-hidden group">
                <Link to="/products">
                  <span className="relative z-10 group-hover:text-white transition-colors">VIEW ALL</span>
                  <span className="absolute inset-0 bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
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
