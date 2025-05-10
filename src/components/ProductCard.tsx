
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

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
    <div className="group relative">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-zinc-100 transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-snyk-purple text-white">
            New
          </Badge>
        )}
        <div className="absolute inset-x-0 bottom-0 flex-col items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
          <Button className="w-full bg-white text-snyk-darkgray hover:bg-snyk-purple hover:text-white transition-colors">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-snyk-purple transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-lg font-semibold text-snyk-darkgray">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
