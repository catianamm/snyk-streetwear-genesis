import React, { createContext, useState, useEffect } from 'react';
import { ProductType } from '@/components/ProductCard';
import { toast } from '@/components/ui/use-toast';

// Extended product type with cart-specific properties
export interface CartItemType extends ProductType {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (product: ProductType, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeItem: (item: CartItemType) => void;
  updateQuantity: (item: CartItemType, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  
  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);
  
  // Update localStorage when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Calculate totals
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cartItems]);
  
  const addToCart = (product: ProductType, quantity: number, selectedSize?: string, selectedColor?: string) => {
    setCartItems(prevItems => {
      // Check if item with same id, size and color already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );
      
      if (existingItemIndex > -1) {
        // If item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Otherwise add new item
        return [...prevItems, {
          ...product,
          quantity,
          selectedSize,
          selectedColor,
        }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    });
  };
  
  const removeItem = (item: CartItemType) => {
    setCartItems(prevItems => prevItems.filter(
      i => !(i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor)
    ));
    
    toast({
      title: "Item removed",
      description: `${item.name} was removed from your cart`,
    });
  };
  
  const updateQuantity = (item: CartItemType, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => prevItems.map(i => {
      if (i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor) {
        return { ...i, quantity };
      }
      return i;
    }));
  };
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};
