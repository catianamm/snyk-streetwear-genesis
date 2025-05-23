
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { fetchProductById } from '@/lib/woocommerce';
import FeaturedProducts from '@/components/FeaturedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Fetch product data when component mounts
  useEffect(() => {
    const getProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log(`Fetching product with ID: ${id}`);
        const productData = await fetchProductById(Number(id));
        console.log('Product data received:', productData);
        
        if (!productData) {
          throw new Error('Product not found');
        }
        
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
        setLoading(false);
      }
    };
    
    getProduct();
  }, [id]);

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

  // Add to cart handler
  const handleAddToCart = () => {
    // In a real implementation, we would add the item to the cart
    // For now, show a toast notification
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    });
  };

  // Initialize checkout with WooCommerce
  const handleCheckout = async () => {
    try {
      // Redirect to checkout page
      navigate('/checkout', { 
        state: { 
          product: {
            ...product,
            quantity,
            selectedSize,
            selectedColor
          }
        }
      });
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Checkout Error",
        description: "There was a problem processing your checkout.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-snyk-purple mb-4" />
            <p>Loading product details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">{error || "Unable to load product details"}</p>
            <Button onClick={() => navigate('/products')}>
              Return to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Extract product attributes
  const availableSizes = product.attributes?.find(attr => attr.name === "Size")?.options || ["S", "M", "L", "XL"];
  const availableColors = product.attributes?.find(attr => attr.name === "Color")?.options || ["Black", "White"];
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [{ src: product.image }];

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
                  src={productImages[activeImage]?.src || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square overflow-hidden rounded cursor-pointer ${
                      activeImage === index ? 'ring-2 ring-snyk-purple' : ''
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image.src || '/placeholder.svg'}
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
              <p className="text-2xl font-bold mb-6">${Number(product.price).toFixed(2)}</p>
              
              <div className="prose prose-sm text-zinc-700 mb-6">
                <div dangerouslySetInnerHTML={{ __html: product.description || "" }} />
              </div>

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Color: {selectedColor || "Select a color"}</h3>
                  <div className="flex space-x-2">
                    {availableColors.map(color => {
                      // Map color names to tailwind classes
                      const colorClass = 
                        color.toLowerCase() === "black" ? "bg-zinc-900" : 
                        color.toLowerCase() === "white" ? "bg-white border border-gray-300" : 
                        color.toLowerCase() === "olive" ? "bg-olive-600" : 
                        color.toLowerCase() === "khaki" ? "bg-amber-300" : "bg-gray-500";
                      
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
              )}

              {/* Size Selection */}
              {availableSizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Size: {selectedSize || "Select a size"}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSizes.map(size => (
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
              )}

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
                disabled={(!availableSizes.length || !selectedSize) || (!availableColors.length || !selectedColor)}
                onClick={handleAddToCart}
              >
                {product.stock_status !== "outofstock" ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              {/* Buy Now Button */}
              <Button
                variant="outline"
                className="w-full mb-6 py-6 text-base bg-black hover:bg-zinc-800 text-white border-black"
                disabled={(!availableSizes.length || !selectedSize) || (!availableColors.length || !selectedColor)}
                onClick={handleCheckout}
              >
                Buy Now
              </Button>
              
              <Button
                variant="outline"
                className="w-full mb-6 py-6 text-base"
              >
                <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
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
                    {product.short_description ? (
                      <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
                    ) : (
                      <p>Product details not available.</p>
                    )}
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
                        <th className="py-2 text-left">Chest (inches)</th>
                        <th className="py-2 text-left">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">S</td>
                        <td className="py-2">36-38</td>
                        <td className="py-2">28</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">M</td>
                        <td className="py-2">39-41</td>
                        <td className="py-2">29</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">L</td>
                        <td className="py-2">42-44</td>
                        <td className="py-2">30</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">XL</td>
                        <td className="py-2">45-47</td>
                        <td className="py-2">31</td>
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
