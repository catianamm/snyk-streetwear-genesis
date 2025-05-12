
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
};

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Simple error handling for image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder.svg'; // Fallback to local placeholder
    target.onerror = null; // Prevent infinite error loop
  };

  return (
    <div className="group">
      <div className="w-full overflow-hidden relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-500 hover:brightness-110 hover:saturate-150 group-hover:contrast-125"
            onError={handleImageError}
          />
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-black text-white uppercase text-xs font-normal px-2">
              New
            </Badge>
          )}
        </Link>
      </div>
      <div className="mt-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm uppercase text-black hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
