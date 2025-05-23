
import { ProductType } from '@/components/ProductCard';
import { fetchFromWooCommerce } from './api';
import { transformProduct } from './models';

// Fetch products from WooCommerce
export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    console.log('Fetching products from WooCommerce API');
    
    // Try to get published products with more parameters
    const products = await fetchFromWooCommerce('/products?per_page=20&status=publish&orderby=date&order=desc');
    
    console.log('Raw API response:', products);
    
    if (!Array.isArray(products)) {
      console.error('Invalid response format from WooCommerce API:', typeof products, products);
      throw new Error('Invalid response format from WooCommerce API');
    }
    
    if (products.length === 0) {
      console.warn('No products returned from WooCommerce API');
      return [];
    }
    
    console.log(`Processing ${products.length} products from API`);
    
    const transformedProducts = products.map((product, index) => {
      console.log(`Transforming product ${index + 1}:`, product.name);
      return transformProduct(product);
    });
    
    console.log('All transformed products:', transformedProducts);
    return transformedProducts;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
};

// Get a single product by ID
export const fetchProductById = async (productId: number): Promise<ProductType | null> => {
  try {
    console.log(`Fetching product ${productId} from WooCommerce API`);
    
    const product = await fetchFromWooCommerce(`/products/${productId}`);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return transformProduct(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Search products by query
export const searchProducts = async (query: string): Promise<ProductType[]> => {
  try {
    console.log(`Searching products with query: ${query}`);
    
    const products = await fetchFromWooCommerce(`/products?search=${encodeURIComponent(query)}&per_page=20&status=publish`);
    
    if (!Array.isArray(products)) {
      throw new Error('Invalid response format from WooCommerce API');
    }
    
    return products.map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
