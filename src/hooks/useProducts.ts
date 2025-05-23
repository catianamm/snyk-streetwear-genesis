
import { useState, useEffect, useRef } from 'react';
import { fetchProducts } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 3;
  
  // Use a ref to track if the component is mounted
  const isMounted = useRef(true);
  
  // Track if we've already fetched products successfully to avoid refetching unnecessarily
  const hasProducts = useRef(false);

  useEffect(() => {
    // Set isMounted to true when the component mounts
    isMounted.current = true;
    
    // Reset on unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Skip fetching if we already have products
    if (hasProducts.current && products.length > 0) {
      console.log('[useProducts] Using cached products, length:', products.length);
      return;
    }
    
    const getProducts = async () => {
      // Don't fetch if component is unmounted
      if (!isMounted.current) return;

      try {
        console.log(`[useProducts] Fetching products, attempt ${retryCount + 1}`);
        setLoading(true);
        
        // Fetch products from WooCommerce API
        const productData = await fetchProducts();
        
        // Don't update state if component is unmounted
        if (!isMounted.current) return;
        
        console.log('[useProducts] Products fetched:', productData.length);
        
        if (productData.length > 0) {
          setProducts(productData);
          hasProducts.current = true;
          setError(null);
        } else {
          console.log('[useProducts] No products returned from API');
          setError('No products available');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('[useProducts] Failed to fetch products:', err);
        
        // Don't update state if component is unmounted
        if (!isMounted.current) return;
        
        if (retryCount < maxRetries) {
          console.log(`[useProducts] Retrying... Attempt ${retryCount + 1} of ${maxRetries}`);
          setRetryCount(prev => prev + 1);
        } else {
          setError('Failed to load products from WooCommerce. Please check your connection and try again.');
          setProducts([]);
          setLoading(false);
        }
      }
    };

    getProducts();
  }, [retryCount, products.length]);

  // Force refresh method to clear cache and retry
  const refresh = () => {
    hasProducts.current = false;
    setRetryCount(0);
    setLoading(true);
  };

  return { products, loading, error, refresh };
};
