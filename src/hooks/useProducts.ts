
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
        // Fetch products from WooCommerce API
        const productData = await fetchProducts();
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return { products, loading, error };
};
