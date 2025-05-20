
import { ProductType } from '@/components/ProductCard';
import { fetchFromWooCommerce } from './api';
import { transformProduct } from './models';

// Fetch products from WooCommerce
export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    console.log('Fetching products from WooCommerce API');
    
    // Added per_page parameter to get more products and status to ensure we get published products
    const products = await fetchFromWooCommerce('/products?per_page=50&status=publish');
    
    if (!Array.isArray(products)) {
      console.error('Invalid response format from WooCommerce API:', products);
      throw new Error('Invalid response format from WooCommerce API');
    }
    
    console.log(`Found ${products.length} products from API`);
    
    if (products.length === 0) {
      console.warn('No products returned from WooCommerce API');
      return [];
    }
    
    const transformedProducts = products.map(transformProduct);
    console.log('Transformed products:', transformedProducts);
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a single product by ID
export const fetchProductById = async (productId: number): Promise<ProductType | null> => {
  try {
    console.log(`Fetching product ${productId} from WooCommerce API`);
    
    const product = await fetchFromWooCommerce(`/products/${productId}`);
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
    
    const products = await fetchFromWooCommerce(`/products?search=${query}`);
    
    if (!Array.isArray(products)) {
      throw new Error('Invalid response format from WooCommerce API');
    }
    
    return products.map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
