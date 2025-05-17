
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFromWooCommerce } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { Loader2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { transformProduct } from '@/lib/woocommerce/models';

interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  count: number;
}

const CollectionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    const fetchCollectionAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch category (collection) details
        const categories = await fetchFromWooCommerce(`/products/categories?slug=${slug}`);
        
        if (!Array.isArray(categories) || categories.length === 0) {
          setError('Collection not found');
          setLoading(false);
          return;
        }
        
        const collectionData = categories[0];
        setCollection({
          id: collectionData.id,
          name: collectionData.name,
          slug: collectionData.slug,
          description: collectionData.description || '',
          image: collectionData.image?.src || null,
          count: collectionData.count
        });
        
        // Fetch products in this category
        const productsResponse = await fetchFromWooCommerce(`/products?category=${collectionData.id}`);
        
        if (Array.isArray(productsResponse)) {
          setProducts(productsResponse.map(transformProduct));
        } else {
          setError('Failed to load products for this collection');
        }
      } catch (error) {
        console.error('Error fetching collection data:', error);
        setError('Failed to load collection data');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchCollectionAndProducts();
    }
    
    // Random glitch effects for the section title
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(glitchInterval);
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <TopBar />
      
      <main className="flex-grow pt-12 pb-20 ml-20 md:ml-24">
        <div className="container-custom py-12 relative">
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
          <div className="absolute inset-0 noise opacity-10 pointer-events-none"></div>
          
          <Link to="/collections" className="inline-flex items-center mb-8 group">
            <ChevronLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm uppercase tracking-wider group-hover:underline">Back to Collections</span>
          </Link>
          
          {loading ? (
            <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
              <p className="text-lg glitch-text">Loading collection details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg mb-2 error-text">{error}</p>
              <Button asChild className="mt-4">
                <Link to="/collections">View All Collections</Link>
              </Button>
            </div>
          ) : collection ? (
            <>
              {/* Collection header */}
              <div className="mb-12">
                <h1 
                  className={`text-3xl md:text-4xl font-display uppercase mb-4 mega-glitch ${glitchActive ? 'glitching' : ''}`}
                  data-text={collection.name.toUpperCase()}
                >
                  {collection.name.toUpperCase()}
                </h1>
                
                {collection.description && (
                  <div 
                    className="max-w-2xl text-zinc-600 mb-6"
                    dangerouslySetInnerHTML={{ __html: collection.description }}
                  />
                )}
                
                <div className="text-sm mb-8">
                  {collection.count} {collection.count === 1 ? 'Product' : 'Products'} in this collection
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>
              </div>
              
              {/* Collection products */}
              {products.length > 0 ? (
                <div className="product-grid">
                  {products.map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`product-card-wrapper ${index % 2 === 0 ? 'even-product' : 'odd-product'}`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p>No products found in this collection.</p>
                </div>
              )}
            </>
          ) : null}
        </div>
      </main>
      
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default CollectionDetail;
