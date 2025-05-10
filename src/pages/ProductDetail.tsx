
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProductType } from '@/components/ProductCard';
import FeaturedProducts from '@/components/FeaturedProducts';

// Sample product data
const product = {
  id: 2,
  name: "Urban Cargo Pants",
  price: 79.99,
  description: "Our Urban Cargo Pants combine street style with practical design. Made from durable cotton twill with a relaxed fit, multiple pockets, and adjustable ankle cuffs. Perfect for those who value both style and functionality in their everyday wear.",
  details: "100% Cotton\nRelaxed fit\nMultiple cargo pockets\nAdjustable ankle cuffs\nHeavy-duty YKK zippers\nMachine washable",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Black", "Olive", "Khaki"],
  images: [
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000",
    "https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=1000",
  ],
  inStock: true,
  category: "pants",
  isNew: true,
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  // Color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // Quantity handlers
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Images */}
            <div>
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square overflow-hidden rounded cursor-pointer ${
                      activeImage === index ? 'ring-2 ring-snyk-purple' : ''
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {product.isNew && (
                <span className="inline-block bg-snyk-purple text-white px-2 py-1 text-xs uppercase tracking-wide mb-2 rounded">
                  New Arrival
                </span>
              )}
              <h1 className="text-2xl md:text-4xl font-display mb-2">{product.name}</h1>
              <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
              <p className="text-zinc-700 mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Color: {selectedColor || "Select a color"}</h3>
                <div className="flex space-x-2">
                  {product.colors.map(color => {
                    // Map color names to tailwind classes
                    const colorClass = 
                      color === "Black" ? "bg-zinc-900" : 
                      color === "Olive" ? "bg-olive-600" : 
                      color === "Khaki" ? "bg-amber-300" : "bg-gray-500";
                    
                    return (
                      <button
                        key={color}
                        className={`h-8 w-8 rounded-full ${colorClass} ${
                          selectedColor === color ? 'ring-2 ring-offset-2 ring-snyk-purple' : ''
                        }`}
                        onClick={() => handleColorSelect(color)}
                        aria-label={`Select ${color} color`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Size: {selectedSize || "Select a size"}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`border border-zinc-300 py-2 rounded hover:border-snyk-purple ${
                        selectedSize === size ? 'bg-snyk-purple text-white border-snyk-purple' : ''
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-zinc-500 mt-2">Size guide</p>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    className="bg-zinc-100 hover:bg-zinc-200 h-10 w-10 flex items-center justify-center rounded-l"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <div className="h-10 w-12 flex items-center justify-center border-t border-b border-zinc-300">
                    {quantity}
                  </div>
                  <button
                    className="bg-zinc-100 hover:bg-zinc-200 h-10 w-10 flex items-center justify-center rounded-r"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                className="w-full bg-snyk-purple hover:bg-purple-700 text-white mb-4 py-6 text-base"
                disabled={!selectedSize || !selectedColor}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              <Button
                variant="outline"
                className="w-full mb-6 py-6 text-base"
              >
                Add to Wishlist
              </Button>

              {/* Product Info Tabs */}
              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="sizing">Sizing</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <div className="whitespace-pre-line text-zinc-700">
                    {product.details}
                  </div>
                </TabsContent>
                <TabsContent value="sizing" className="mt-4">
                  <p className="text-zinc-700">
                    Our products follow standard sizing. For the best fit, refer to the size chart below.
                    If you're between sizes, we recommend sizing up for a more relaxed fit.
                  </p>
                  <table className="w-full mt-4 text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left">Size</th>
                        <th className="py-2 text-left">Waist (inches)</th>
                        <th className="py-2 text-left">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">S</td>
                        <td className="py-2">28-30</td>
                        <td className="py-2">40</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">M</td>
                        <td className="py-2">30-32</td>
                        <td className="py-2">41</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">L</td>
                        <td className="py-2">32-34</td>
                        <td className="py-2">42</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">XL</td>
                        <td className="py-2">34-36</td>
                        <td className="py-2">43</td>
                      </tr>
                    </tbody>
                  </table>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <p className="text-zinc-700">
                    Free shipping on all orders over $50. Standard shipping takes 3-5 business days.
                    Express shipping (2-3 business days) available at checkout for an additional fee.
                  </p>
                  <p className="mt-4 text-zinc-700">
                    We offer free returns within 30 days of purchase. Items must be unworn with the original tags attached.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-100 py-16">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-display mb-8">You May Also Like</h2>
            <FeaturedProducts />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
