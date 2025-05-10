
import React from 'react';
import ProductCard, { ProductType } from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const featuredProducts: ProductType[] = [
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
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-xl md:text-2xl font-display uppercase text-center mb-10">Featured Products</h2>
        
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white uppercase text-sm px-10">
            <Link to="/products">VIEW ALL</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
