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
        // In the future, this will use real data from WooCommerce
        // For now, we'll use the existing mock data
        
        // This would be: const response = await fetchProducts();
        
        // Using local mock data for now
        const mockProducts: ProductType[] = [
          {
            id: 1,
            name: "Basic Logo Tee",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
            category: "t-shirts",
            isFeatured: true
          },
          // ... other products
        ];
        
        setProducts(mockProducts);
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
