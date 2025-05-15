
import { ProductType } from '@/components/ProductCard';

// WooCommerce REST API endpoint
const API_URL = 'https://cms.snyk.store/wp-json/wc/v3';

// WooCommerce API credentials
const consumerKey = import.meta.env.VITE_WC_CONSUMER_KEY || 'ck_55c495ad83d72567cdcda9937e1d9e3f5007f591';
const consumerSecret = import.meta.env.VITE_WC_CONSUMER_SECRET || 'cs_22d4d9f95d58986873e1c09054cd89b0b346cac6';

// CORS Proxy to avoid CORS issues in development
const CORS_PROXY = 'https://corsproxy.io/?';

// Helper function to create authentication header
const getAuthHeader = () => {
  return 'Basic ' + btoa(`${consumerKey}:${consumerSecret}`);
};

// Function to handle API requests
const fetchFromWooCommerce = async (endpoint: string, options = {}) => {
  try {
    console.log(`Fetching from WooCommerce API: ${API_URL}${endpoint}`);
    
    const targetUrl = `${API_URL}${endpoint}`;
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
    
    console.log('Using proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK:', response.status, errorText);
      throw new Error(`WooCommerce API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('WooCommerce API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching from WooCommerce:', error);
    throw error;
  }
};

// Transform WooCommerce product to our ProductType
const transformProduct = (wcProduct: any): ProductType => {
  return {
    id: wcProduct.id,
    name: wcProduct.name,
    price: wcProduct.price ? parseFloat(wcProduct.price) : 0,
    image: wcProduct.images && wcProduct.images.length > 0 
      ? wcProduct.images[0].src 
      : 'https://via.placeholder.com/300',
    category: wcProduct.categories && wcProduct.categories.length > 0 
      ? wcProduct.categories[0].name.toLowerCase() 
      : 'uncategorized',
    isNew: wcProduct.date_created 
      ? new Date(wcProduct.date_created).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000) 
      : false,
    isFeatured: Boolean(wcProduct.featured),
  };
};

// Fetch products from WooCommerce
export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    console.log('Fetching products from WooCommerce API');
    
    // Added per_page parameter to get more products and status to ensure we get published products
    const products = await fetchFromWooCommerce('/products?per_page=20&status=publish');
    
    if (!Array.isArray(products)) {
      console.error('Invalid response format from WooCommerce API:', products);
      return getMockProducts();
    }
    
    console.log(`Found ${products.length} products from API`);
    
    if (products.length === 0) {
      console.warn('No products returned from WooCommerce API, using mock data');
      return getMockProducts();
    }
    
    return products.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
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

// Mock products for development/fallback
const getMockProducts = (): ProductType[] => {
  console.log('Using mock product data');
  return [
    {
      id: 1,
      name: "Basic Logo Tee",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
      category: "t-shirts",
      isFeatured: true
    },
    {
      id: 2,
      name: "Workwear Cargo Pants",
      price: 95.00,
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
      category: "pants",
      isNew: true,
      isFeatured: true
    },
    {
      id: 3,
      name: "Classic Hoodie",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      category: "hoodies",
      isFeatured: true
    },
    {
      id: 4,
      name: "Stock Cap",
      price: 40.00,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000",
      category: "accessories",
      isNew: true,
      isFeatured: true
    },
    {
      id: 5,
      name: "Statement Tee",
      price: 42.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000",
      category: "t-shirts"
    },
    {
      id: 6,
      name: "Oversized Sweatshirt",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1565693413579-8a3c9944d3b3?q=80&w=1000",
      category: "hoodies",
      isNew: true
    },
    {
      id: 7,
      name: "Relaxed Fit Jeans",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
      category: "pants"
    },
    {
      id: 8,
      name: "Urban Beanie",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1576063849362-as-god-intended-it-to-be?q=80&w=1000",
      category: "accessories"
    }
  ];
};

// Future functions to implement:
// - createOrder
// - getCustomerData
// - processPayment
// - etc.
