
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard, { ProductType } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample products data
const allProducts: ProductType[] = [
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

const Products = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [products, setProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState("featured");

  // Filter categories
  const categories = ["t-shirts", "pants", "hoodies", "accessories"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sortedProducts = [...allProducts];

    switch (value) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sortedProducts = allProducts.filter(p => p.isNew).concat(
          allProducts.filter(p => !p.isNew)
        );
        break;
      default: // "featured"
        sortedProducts = allProducts.filter(p => p.isFeatured).concat(
          allProducts.filter(p => !p.isFeatured)
        );
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-zinc-100 py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-5xl font-display">Shop All</h1>
            <p className="text-lg text-zinc-600 mt-2">Express yourself with our latest streetwear</p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => setFilterOpen(!filterOpen)}
              className="md:hidden"
            >
              {filterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
            
            <div className="ml-auto w-full md:w-auto">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop always visible, mobile toggleable */}
            <div className={`${filterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-100">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={category} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={category} className="ml-2 capitalize">{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-snyk-purple hover:bg-purple-700">
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              <div className="product-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-zinc-600">Try adjusting your filters</p>
                </div>
              )}
              
              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
