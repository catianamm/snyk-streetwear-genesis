
import React, { useEffect, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import CategoriesMenu from '@/components/CategoriesMenu';
import { Loader2, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  
  // Extract unique categories from products
  const categories = ["all", ...Array.from(new Set(products.map(product => product.category)))];
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  useEffect(() => {
    // Random glitch effects for the section title
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <TopBar />
      
      <main className="flex-grow pt-12 bg-white pb-20 ml-20 md:ml-24">
        {/* Category navigation bar - fixed at top */}
        <CategoriesMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        {/* Page header with glitch effect */}
        <div className="container-custom py-12 relative">
          <div className="absolute inset-0 pointer-events-none"></div>
          <div className="absolute inset-0 noise pointer-events-none"></div>
          
          {/* Category filters - desktop view */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 
              className={`text-3xl md:text-4xl font-display uppercase mb-4 md:mb-0 mega-glitch ${glitchActive ? 'glitching' : ''}`}
              data-text="ALL PRODUCTS"
            >
              ALL PRODUCTS
            </h1>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white group">
                    <Filter size={16} className="mr-2 group-hover:text-white" />
                    Filter by Category
                    <ChevronDown size={16} className="ml-2 opacity-70 group-hover:text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                    {categories.map((category) => (
                      <DropdownMenuRadioItem key={category} value={category} className="capitalize">
                        {category === "all" ? "All Products" : category}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile category filters */}
          <div className="md:hidden mb-6">
            <Button 
              variant="outline" 
              className="w-full justify-between border-black text-black" 
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            >
              {selectedCategory === "all" ? "All Products" : selectedCategory} 
              <ChevronDown size={16} className={`ml-2 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
            </Button>
            
            {showCategoryMenu && (
              <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 capitalize
                      ${category === selectedCategory ? 'bg-gray-100' : ''}`}
                  >
                    {category === "all" ? "All Products" : category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12"></div>
          
          {loading && (
            <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
              <p className="text-lg glitch-text">Loading products from WooCommerce...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-lg mb-2 error-text">{error}</p>
              <p className="text-base text-zinc-400">Please try again later</p>
            </div>
          )}
          
          {!loading && !error && (
            <>
              {/* Category results count */}
              <div className="mb-6 text-sm">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {selectedCategory !== "all" && <> in <span className="font-semibold capitalize">{selectedCategory}</span></>}
              </div>
              
              <div className="product-grid">
                {filteredProducts.length > 0 ? 
                  filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`product-card-wrapper ${index % 2 === 0 ? 'even-product' : 'odd-product'}`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  )) : 
                  <div className="col-span-full text-center py-12">
                    <p>No products found in this category.</p>
                  </div>
                }
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default Products;
