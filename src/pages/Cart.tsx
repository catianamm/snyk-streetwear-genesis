
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, Trash2Icon, ShoppingBag } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/hooks/useCart';

const Cart = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const { cartItems, updateQuantity, removeItem, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Random glitch effects for the section title
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <TopBar />
      
      <main className="flex-grow pt-12 ml-20 md:ml-24">
        <div className="relative py-16 overflow-hidden">
          <div className="scanlines absolute inset-0 opacity-30 pointer-events-none"></div>
          <div className="noise absolute inset-0 opacity-10 pointer-events-none"></div>
          
          <div className="container-custom relative z-10">
            <h1 
              className={`text-3xl md:text-4xl font-display uppercase mb-8 mega-glitch ${glitchActive ? 'glitching' : ''}`}
              data-text="YOUR CART"
            >
              YOUR CART
            </h1>
            
            <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12"></div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl mb-8 text-zinc-300">Your cart is empty</p>
                
                <Button asChild variant="outline" className="border-white hover:bg-white hover:text-black uppercase text-sm px-10 relative overflow-hidden group">
                  <Link to="/products">
                    <span className="relative z-10 group-hover:text-black transition-colors">SHOP NOW</span>
                    <span className="absolute inset-0 bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Cart items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex flex-col md:flex-row justify-between items-center bg-zinc-900 rounded-lg p-4 md:p-6">
                      <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                        <div className="w-20 h-20 bg-zinc-800 rounded-md overflow-hidden mr-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <div className="flex items-center text-sm text-zinc-400 mt-1">
                            {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          </div>
                          <p className="text-snyk-purple mt-1">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                            className="text-zinc-400 hover:text-white p-2"
                          >
                            <MinusIcon size={18} />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                            className="text-zinc-400 hover:text-white p-2"
                          >
                            <PlusIcon size={18} />
                          </button>
                        </div>
                        
                        <div className="ml-8 text-right">
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          <button 
                            onClick={() => removeItem(item)}
                            className="text-zinc-500 hover:text-white mt-1 text-sm flex items-center"
                          >
                            <Trash2Icon size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Summary */}
                <div className="bg-zinc-900 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-zinc-800 mt-4 pt-4 flex justify-between items-center">
                    <span className="text-lg">Total</span>
                    <span className="text-xl font-semibold">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <Button 
                    variant="outline" 
                    className="border-white hover:bg-white hover:text-black"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    className="bg-snyk-purple hover:bg-purple-600"
                    onClick={handleCheckout}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" /> Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer className="ml-20 md:ml-24" />
    </div>
  );
};

export default Cart;
