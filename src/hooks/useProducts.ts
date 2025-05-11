
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/woocommerce';
import { ProductType } from '@/components/ProductCard';
import { toast } from "@/components/ui/use-toast";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log('Fetching products in useProducts hook');
        // Fetch products from WooCommerce API
        const productData = await fetchProducts();
        console.log('Products fetched in hook:', productData);
        setProducts(productData);
        
        if (productData.length === 0) {
          toast({
            title: "No products found",
            description: "Using mock data instead",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Products loaded",
            description: `Successfully loaded ${productData.length} products`,
            variant: "default"
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
        setLoading(false);
        
        toast({
          title: "Error loading products",
          description: "Failed to connect to WooCommerce API",
          variant: "destructive"
        });
      }
    };

    getProducts();
  }, []);

  return { products, loading, error };
};
