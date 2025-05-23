
import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = useCallback(async () => {
    try {
      console.log('[useProducts] Starting product fetch...');
      setLoading(true);
      setError(null);
      
      // Fetch products from WooCommerce API
      const productData = await fetchProducts();
      
      console.log('[useProducts] Product fetch completed:', {
        received: Array.isArray(productData),
        count: Array.isArray(productData) ? productData.length : 0
      });
      
      if (Array.isArray(productData) && productData.length > 0) {
        setProducts(productData);
        console.log('[useProducts] Products set successfully, count:', productData.length);
      } else {
        console.log('[useProducts] No products returned from API or invalid format');
        setProducts([]);
        setError('No products available in your store');
      }
    } catch (err) {
      console.error('[useProducts] Error during product fetch:', {
        name: err.name,
        message: err.message
      });
      
      let errorMessage = 'Failed to load products';
      if (err instanceof Error) {
        if (err.message.includes('Authentication failed')) {
          errorMessage = 'Invalid WooCommerce API credentials';
        } else if (err.message.includes('not found')) {
          errorMessage = 'Store not found - check your WooCommerce URL';
        } else if (err.message.includes('fetch')) {
          errorMessage = 'Cannot connect to store - check internet connection';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Force refresh method
  const refresh = useCallback(async () => {
    console.log('[useProducts] Manual refresh triggered');
    await getProducts();
  }, [getProducts]);

  return { products, loading, error, refresh };
};
