import { createContext, useState, useEffect } from 'react'; // Removed React
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
  removeFromCart: (itemId: number | string) => void; // Corrected: Use itemId and match usage in components
  updateQuantity: (item: CartItemType, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {}, // Corrected in default context value
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
  
  const removeFromCart = (itemId: number | string) => {
    let removedItemName = "Item"; // Default name for toast
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        removedItemName = itemToRemove.name;
      }
      return prevItems.filter(item => item.id !== itemId);
    });
    
    toast({
      title: "Item removed",
      description: `${removedItemName} was removed from your cart`,
    });
  };
  
  const updateQuantity = (itemToUpdate: CartItemType, newQuantity: number) => {
    // Note: This updateQuantity currently requires the full item, not just ID.
    // Consider if you want to update by ID + options or just ID.
    if (newQuantity < 1) {
      toast({
        variant: "destructive",
        title: "Invalid Quantity",
        description: "Quantity cannot be less than 1.",
      });
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        (cartItem.id === itemToUpdate.id &&
         cartItem.selectedSize === itemToUpdate.selectedSize &&
         cartItem.selectedColor === itemToUpdate.selectedColor)
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
    toast({
      title: "Quantity Updated",
      description: `${itemToUpdate.name}'s quantity updated to ${newQuantity}.`,
    });
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
      addToCart, // Keep addToCart
      removeFromCart, // Provide the renamed function
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};
