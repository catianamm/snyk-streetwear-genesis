
import { ProductType } from '@/components/ProductCard';

// Transform WooCommerce product to our ProductType
export const transformProduct = (wcProduct: any): ProductType => {
  console.log('Transforming product:', wcProduct.id, wcProduct.name);
  
  // Extract the primary category from WooCommerce 
  let category = 'uncategorized';
  
  if (wcProduct.categories && wcProduct.categories.length > 0) {
    // Try to get the most specific category (usually the last one)
    category = wcProduct.categories[0].name.toLowerCase();
  }

  return {
    id: wcProduct.id,
    name: wcProduct.name,
    price: wcProduct.price ? parseFloat(wcProduct.price) : 0,
    image: wcProduct.images && wcProduct.images.length > 0 
      ? wcProduct.images[0].src 
      : 'https://via.placeholder.com/300',
    category: category,
    isNew: wcProduct.date_created 
      ? new Date(wcProduct.date_created).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000) 
      : false,
    isFeatured: Boolean(wcProduct.featured),
  };
};

// Mock products for development/fallback
export const getMockProducts = (): ProductType[] => {
  console.log('Using mock product data');
  return [
    {
      id: 1,
      name: "Basic Logo Tee",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
      category: "men/t-shirts",
      isFeatured: true
    },
    {
      id: 2,
      name: "Workwear Cargo Pants",
      price: 95.00,
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
      category: "men/pants",
      isNew: true,
      isFeatured: true
    },
    {
      id: 3,
      name: "Classic Hoodie",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      category: "men/hoodies",
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
      category: "women/t-shirts",
      isNew: true
    },
    {
      id: 6,
      name: "Oversized Sweatshirt",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1565693413579-8a3c9944d3b3?q=80&w=1000",
      category: "women/hoodies",
      isNew: true
    },
    {
      id: 7,
      name: "Relaxed Fit Jeans",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
      category: "women/pants"
    },
    {
      id: 8,
      name: "Urban Beanie",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1576063849362-as-god-intended-it-to-be?q=80&w=1000",
      category: "accessories",
      isNew: true
    }
  ];
};
