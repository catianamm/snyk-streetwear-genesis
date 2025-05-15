
import { ProductType } from '@/components/ProductCard';
import { fetchFromWooCommerce } from './api';
import { transformProduct, getMockProducts } from './models';
import { toast } from "@/components/ui/use-toast";

// Fetch products from WooCommerce
export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    console.log('Fetching products from WooCommerce API');
    toast({
      title: "Connecting to Store",
      description: "Fetching products from cms.snyk.store..."
    });
    
    // Added per_page parameter to get more products and status to ensure we get published products
    const products = await fetchFromWooCommerce('/products?per_page=50&status=publish');
    
    if (!Array.isArray(products)) {
      console.error('Invalid response format from WooCommerce API:', products);
      toast({
        title: "API Error",
        description: "Received invalid data format from store",
        variant: "destructive"
      });
      return getMockProducts();
    }
    
    console.log(`Found ${products.length} products from API`);
    
    if (products.length === 0) {
      console.warn('No products returned from WooCommerce API, using mock data');
      toast({
        title: "No products found",
        description: "No products found in your store. Using fallback data.",
        variant: "destructive"
      });
      return getMockProducts();
    }
    
    const transformedProducts = products.map(transformProduct);
    console.log('Transformed products:', transformedProducts);
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    toast({
      title: "Connection error",
      description: "Could not connect to your WooCommerce store",
      variant: "destructive"
    });
    // Fallback to mock data if API request fails
    return getMockProducts();
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
    // Fallback to mock data if API request fails
    const mockProducts = getMockProducts();
    return mockProducts.find(p => p.id === productId) || null;
  }
};

// Search products by query
export const searchProducts = async (query: string): Promise<ProductType[]> => {
  try {
    console.log(`Searching products with query: ${query}`);
    
    const products = await fetchFromWooCommerce(`/products?search=${query}`);
    
    if (!Array.isArray(products)) {
      return getMockProducts().filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return products.map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    // Fallback to mock data if API request fails
    const mockProducts = getMockProducts();
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }
};
