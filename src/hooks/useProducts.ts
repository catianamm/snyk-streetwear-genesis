
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { fetchProducts } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef<boolean>(false);
  const mountedRef = useRef<boolean>(true);

  const getProducts = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (fetchingRef.current || !mountedRef.current) {
      return;
    }

    try {
      fetchingRef.current = true;
      setLoading(true);
      setError(null);
      
      // Fetch products from WooCommerce API
      const productData = await fetchProducts();
      
      if (!mountedRef.current) return; // Component unmounted
      
      if (Array.isArray(productData) && productData.length > 0) {
        setProducts(productData);
        console.log('[useProducts] Products set successfully, count:', productData.length);
      } else {
        setProducts([]);
        setError('No products available in your store');
      }
    } catch (err) {
      if (!mountedRef.current) return; // Component unmounted
      
      console.error('[useProducts] Error during product fetch:', err);
      
      let errorMessage = 'Failed to load products';
      if (err instanceof Error) {
        if (err.message.includes('Authentication failed')) {
          errorMessage = 'Invalid WooCommerce API credentials';
        } else if (err.message.includes('not found')) {
          errorMessage = 'Store not found - check your WooCommerce URL';
        } else if (err.message.includes('fetch') || err.name === 'AbortError') {
          errorMessage = 'Cannot connect to store - check internet connection';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setProducts([]);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    getProducts();
    
    return () => {
      mountedRef.current = false;
    };
  }, []); // Remove getProducts from dependencies to prevent re-fetching

  // Force refresh method
  const refresh = useCallback(async () => {
    console.log('[useProducts] Manual refresh triggered');
    await getProducts();
  }, [getProducts]);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({
    products,
    loading,
    error,
    refresh
  }), [products, loading, error, refresh]);
};
