
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/components/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Star, Heart, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

const MostWanted = () => {
  const { products, loading, error } = useProducts();
  const [glitchActive, setGlitchActive] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  
  // Choose a few products to feature as "most wanted"
  const mostWantedProducts = products.slice(0, 3);
  
  // Create random glitch effects at intervals
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);
    
    const textGlitchInterval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 200);
    }, 6000);
    
    return () => {
      clearInterval(glitchInterval);
      clearInterval(textGlitchInterval);
    };
  }, []);

  return (
    <section id="most-wanted" className="py-16 bg-white text-black relative overflow-hidden">
      {/* Lighter scanlines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none opacity-30"></div>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <h2 
            className={`text-xl md:text-2xl font-display uppercase text-center mb-10 mega-glitch ${glitchActive ? 'glitching' : ''} ${textGlitch ? 'text-distort' : ''}`} 
            data-text="MOST WANTED"
          >
            <span className="relative">
              <span className="relative overflow-hidden">
                M<span className={`inline-block ${glitchActive ? '-translate-x-[1px]' : ''}`}>OST W</span>ANTED
                {glitchActive && <span className="absolute top-0 left-0 w-full h-full bg-white mix-blend-difference"></span>}
              </span>
            </span>
          </h2>
          
          <span className="text-xs uppercase opacity-60">In High Demand</span>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-snyk-purple mb-4" />
              <p>Loading products...</p>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-lg mb-2 error-text">{error}</p>
            <p className="text-base text-zinc-600">Unable to connect to the store</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mostWantedProducts.length > 0 ? mostWantedProducts.map((product, index) => (
                <Card key={product.id} className="bg-transparent border border-zinc-800 overflow-hidden transform transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 flex flex-col">
                        <Badge variant="outline" className="bg-black/20 text-white border-none mb-2 inline-flex gap-1 items-center">
                          <Heart size={12} className="text-red-500" /> Hot Item
                        </Badge>
                        
                        <Link to={`/product/${product.id}`}>
                          <Button variant="outline" className="text-xs text-white bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white hover:text-black">
                            VIEW DETAILS
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    {product.isNew && (
                      <Badge className="absolute top-2 right-2 bg-black text-white uppercase text-xs font-normal px-2">
                        New
                      </Badge>
                    )}
                    
                    {index === 0 && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-orange-400 px-2 py-1 text-xs">
                        <Star size={12} fill="currentColor" /> #1 Most Wanted
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-display uppercase tracking-wide text-sm">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1 text-xs text-zinc-400">
                        <Package size={14} />
                        <span>{product.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full text-center py-12">
                  <p>No products available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center mt-12">
              <Button 
                variant="outline" 
                className="border border-zinc-800 bg-transparent text-black hover:bg-white hover:text-black uppercase text-sm px-10 relative overflow-hidden group"
                asChild
              >
                <Link to="/products">
                  <span className="relative z-10 group-hover:text-black transition-colors">VIEW ALL</span>
                  <span className="absolute inset-0 bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MostWanted;
