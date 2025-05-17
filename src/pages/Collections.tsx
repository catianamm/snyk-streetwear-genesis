
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { fetchFromWooCommerce } from '@/lib/woocommerce';
import { Loader2 } from 'lucide-react';

interface Collection {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description: string;
  count: number;
}

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        // Fetch categories from WooCommerce which will serve as our collections
        const response = await fetchFromWooCommerce('/products/categories');
        
        if (Array.isArray(response)) {
          // Map WooCommerce categories to our Collection interface
          // Only include categories that have products
          const validCollections = response
            .filter(cat => cat.count > 0)
            .map(cat => ({
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
              image: cat.image?.src || null,
              description: cat.description || '',
              count: cat.count
            }));
            
          setCollections(validCollections);
          console.log('Fetched collections:', validCollections);
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
        // Set some fallback collections if API fails
        setCollections([
          { id: 1, name: 'Summer', slug: 'summer', image: null, description: 'Summer collection', count: 5 },
          { id: 2, name: 'Winter', slug: 'winter', image: null, description: 'Winter collection', count: 3 },
          { id: 3, name: 'Special', slug: 'special', image: null, description: 'Special collection', count: 2 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
    
    // Random glitch effects for the section title
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <TopBar />
      
      <main className="flex-grow pt-12 pb-20 ml-20 md:ml-24">
        <div className="container-custom py-12 relative">
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
          <div className="absolute inset-0 noise opacity-10 pointer-events-none"></div>
          
          {/* Page header */}
          <div className="mb-12">
            <h1 
              className={`text-3xl md:text-4xl font-display uppercase mb-4 mega-glitch ${glitchActive ? 'glitching' : ''}`}
              data-text="COLLECTIONS"
            >
              COLLECTIONS
            </h1>
            <p className="max-w-2xl text-zinc-600">
              Explore our curated collections designed for every style and occasion.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mt-8"></div>
          </div>
          
          {loading ? (
            <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
              <p className="text-lg glitch-text">Loading collections...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link 
                  to={`/collections/${collection.slug}`} 
                  key={collection.id}
                  className="group relative overflow-hidden bg-zinc-100 h-64 flex items-center justify-center"
                >
                  {/* Collection background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundImage: collection.image 
                        ? `url(${collection.image})`
                        : `url(https://source.unsplash.com/random/600x400/?${collection.name.toLowerCase()})` 
                    }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                  
                  {/* Collection info */}
                  <div className="relative z-10 text-center p-4">
                    <h3 className="text-2xl font-display uppercase text-white mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-4 max-w-xs mx-auto">
                      {collection.description || `Explore our ${collection.name} collection`}
                    </p>
                    <span className="inline-block px-4 py-2 border border-white text-white text-xs uppercase tracking-wider">
                      {collection.count} {collection.count === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default Collections;
