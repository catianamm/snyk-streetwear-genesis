
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
  return (
    <div className="group">
      <div className="w-full overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
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
          <h3 className="text-sm uppercase hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
