
import React from 'react';
import ProductCard, { ProductType } from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const featuredProducts: ProductType[] = [
  {
    id: 1,
    name: "Core Graphic Tee",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
    category: "t-shirts",
    isFeatured: true
  },
  {
    id: 2,
    name: "Urban Cargo Pants",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
    category: "pants",
    isNew: true,
    isFeatured: true
  },
  {
    id: 3,
    name: "Streetwise Hoodie",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
    category: "hoodies",
    isFeatured: true
  },
  {
    id: 4,
    name: "Authentic Cap",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000",
    category: "accessories",
    isNew: true,
    isFeatured: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-zinc-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-display">Featured Products</h2>
          <Button asChild variant="outline" className="border-black text-black hover:bg-black/5">
            <Link to="/products">View All</Link>
          </Button>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
