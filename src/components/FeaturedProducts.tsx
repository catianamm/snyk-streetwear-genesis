
import React from 'react';
import ProductCard, { ProductType } from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';

// Adding disturb effect wrapper
const DisturbEffect = ({ children, intensity = 'low' }: { children: React.ReactNode, intensity?: 'low' | 'medium' | 'high' }) => {
  const [isGlitching, setIsGlitching] = React.useState(false);
  
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), intensity === 'low' ? 200 : intensity === 'medium' ? 400 : 600);
    }, intensity === 'low' ? 7000 : intensity === 'medium' ? 5000 : 3000);
    
    return () => clearInterval(glitchInterval);
  }, [intensity]);
  
  return (
    <div className={`relative ${isGlitching ? 'before:content-[\'\'] before:absolute before:inset-0 before:bg-white before:opacity-10 before:z-10' : ''}`}>
      <div className={isGlitching ? 'transform translate-x-[1px] translate-y-[1px] scale-[1.01]' : ''}>
        {children}
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts();
  
  // Filter to get only featured products
  const featuredProducts = products.filter(product => product.isFeatured);
  
  // If no featured products, show first 4 products as featured
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts 
    : products.slice(0, 4);
  
  console.log('Featured products:', featuredProducts);
  console.log('All products:', products);
  console.log('Display products:', displayProducts);

  return (
    <section className="py-16 bg-white" data-section="featured">
      <div className="container-custom">
        <DisturbEffect intensity="medium">
          <h2 className="text-xl md:text-3xl font-display uppercase text-center mb-10 glitch" data-text="FEATURED PRODUCTS">FEATURED PRODUCTS</h2>
        </DisturbEffect>
        
        {loading && (
          <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            <p className="text-lg">Loading products from WooCommerce...</p>
          </div>
        )}
        
        {error && !loading && (
          <div className="text-center py-12 text-zinc-800">
            <p className="text-lg mb-2">{error}</p>
            <p className="text-base text-zinc-600">Showing fallback products</p>
          </div>
        )}
        
        {!loading && (
          <>
            <div className="product-grid">
              {displayProducts.length > 0 ? 
                displayProducts.map(product => (
                  <DisturbEffect key={product.id} intensity="low">
                    <ProductCard product={product} />
                  </DisturbEffect>
                )) : 
                <div className="col-span-full text-center py-12">
                  <p>No products found. Please add products in your WooCommerce store.</p>
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
