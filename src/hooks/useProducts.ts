
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 3;

  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log(`[useProducts] Fetching products, attempt ${retryCount + 1}`);
        setLoading(true);
        
        // Fetch products from WooCommerce API
        const productData = await fetchProducts();
        console.log('[useProducts] Products fetched:', productData);
        setProducts(productData);
        
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('[useProducts] Failed to fetch products:', err);
        
        if (retryCount < maxRetries) {
          console.log(`[useProducts] Retrying... Attempt ${retryCount + 1} of ${maxRetries}`);
          setRetryCount(prev => prev + 1);
          // Don't set error or loading state yet, as we're retrying
        } else {
          setError('Failed to load products from WooCommerce. Please check your connection and try again.');
          setProducts([]);
          setLoading(false);
        }
      }
    };

    getProducts();
  }, [retryCount]);

  return { products, loading, error };
};
