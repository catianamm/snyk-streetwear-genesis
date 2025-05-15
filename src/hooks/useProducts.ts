
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';
import { toast } from "@/components/ui/use-toast";

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
        
        if (productData.length === 0) {
          toast({
            title: "No products found",
            description: "Using mock data instead",
            variant: "destructive"
          });
        } else {
          // Add success toast when products are found
          toast({
            title: "Products loaded",
            description: `Loaded ${productData.length} products from store`,
          });
        }
        
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('[useProducts] Failed to fetch products:', err);
        
        if (retryCount < maxRetries) {
          console.log(`[useProducts] Retrying... Attempt ${retryCount + 1} of ${maxRetries}`);
          setRetryCount(prev => prev + 1);
          // Don't set error or loading state yet, as we're retrying
        } else {
          setError('Failed to load products from WooCommerce');
          setLoading(false);
          
          toast({
            title: "Error loading products",
            description: "Using mock data instead",
            variant: "destructive"
          });
        }
      }
    };

    getProducts();
  }, [retryCount]);

  return { products, loading, error };
};
