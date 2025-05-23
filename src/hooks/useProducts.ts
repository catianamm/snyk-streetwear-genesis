
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log('[useProducts] Starting to fetch products...');
        setLoading(true);
        setError(null);
        
        // Fetch products from WooCommerce API
        const productData = await fetchProducts();
        
        console.log('[useProducts] Raw product data received:', productData);
        
        if (Array.isArray(productData) && productData.length > 0) {
          setProducts(productData);
          console.log('[useProducts] Products set successfully:', productData.length);
        } else {
          console.log('[useProducts] No products returned from API');
          setProducts([]);
          setError('No products available');
        }
      } catch (err) {
        console.error('[useProducts] Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []); // Remove dependencies to prevent re-fetching loops

  // Force refresh method
  const refresh = () => {
    setLoading(true);
    setError(null);
    setProducts([]);
  };

  return { products, loading, error, refresh };
};
