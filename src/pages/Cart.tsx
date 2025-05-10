
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Minus } from 'lucide-react';

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Core Graphic Tee",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
    quantity: 1,
    size: "M",
    color: "Black",
  },
  {
    id: 2,
    name: "Urban Cargo Pants",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
    quantity: 1,
    size: "L",
    color: "Olive",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shippingCost;

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-display mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-zinc-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild className="bg-snyk-purple hover:bg-purple-700 text-white">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
                  <div className="hidden sm:grid sm:grid-cols-5 bg-zinc-50 p-4">
                    <div className="col-span-2">Product</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Total</div>
                  </div>
                  <Separator />
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:grid sm:grid-cols-5 sm:items-center">
                      <div className="flex items-center col-span-2 mb-4 sm:mb-0">
                        <div className="w-20 h-20 flex-shrink-0 mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-snyk-purple transition-colors">
                            {item.name}
                          </Link>
                          <div className="text-sm text-zinc-500">
                            Size: {item.size} | Color: {item.color}
                          </div>
                          <button 
                            className="text-xs text-red-500 hover:text-red-700 mt-1 sm:hidden flex items-center"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="w-3 h-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="text-center mb-4 sm:mb-0">
                        <div className="sm:hidden text-sm text-zinc-500">Price:</div>
                        ${item.price.toFixed(2)}
                      </div>

                      <div className="text-center mb-4 sm:mb-0">
                        <div className="sm:hidden text-sm text-zinc-500">Quantity:</div>
                        <div className="flex items-center justify-center">
                          <button
                            className="p-1 rounded hover:bg-zinc-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            className="p-1 rounded hover:bg-zinc-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end">
                        <div className="sm:hidden text-sm text-zinc-500">Total:</div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        <button 
                          className="sm:ml-4 text-zinc-500 hover:text-red-500 hidden sm:block"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <Separator className="mt-4 sm:hidden" />
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Promo Code</h3>
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="max-w-xs"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-zinc-200 p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Shipping</span>
                      <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-6 bg-snyk-purple hover:bg-purple-700 text-white">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  
                  <div className="mt-6">
                    <Link 
                      to="/products" 
                      className="text-snyk-purple hover:text-purple-700 flex items-center justify-center transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
                
                <div className="mt-6 p-6 bg-zinc-50 rounded-lg border border-zinc-200">
                  <h3 className="text-lg font-medium mb-4">Need Help?</h3>
                  <p className="text-zinc-600 mb-4">
                    Our customer service team is here to help you with any questions about your order.
                  </p>
                  <Link 
                    to="/contact" 
                    className="text-snyk-purple hover:text-purple-700 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
