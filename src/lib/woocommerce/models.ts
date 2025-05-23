
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

  // More realistic "new" product logic - only products from last 7 days
  const isNew = wcProduct.date_created 
    ? new Date(wcProduct.date_created).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000) 
    : false;

  return {
    id: wcProduct.id,
    name: wcProduct.name,
    price: wcProduct.price ? parseFloat(wcProduct.price) : 0,
    image: wcProduct.images && wcProduct.images.length > 0 
      ? wcProduct.images[0].src.replace('http://', 'https://') // Fix mixed content
      : 'https://via.placeholder.com/300',
    category: category,
    isNew: isNew,
    isFeatured: Boolean(wcProduct.featured),
  };
};
