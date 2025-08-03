
import { useState } from 'react'; // Removed React
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from '@/components/ui/button';
import {
  Sheet, // Import Sheet
  SheetContent, // Import SheetContent
  SheetTrigger, // Import SheetTrigger
  SheetHeader, // Import SheetHeader
  SheetTitle, // Import SheetTitle
  SheetFooter, // Import SheetFooter
  SheetClose, // Import SheetClose
} from '@/components/ui/sheet'; // Import SheetClose, Menu, User icons
import { Search, ShoppingCart, Facebook, Instagram, Twitter, X, Trash2, User } from 'lucide-react'; // Added User
import { useCart } from '@/hooks/useCart'; // Import useCart hook

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className = "" }) => {
  const { cartItems, cartCount, cartTotal, removeFromCart } = useCart(); // Destructure all needed values
  const [searchOpen, setSearchOpen] = useState(false);

  return ( // Added className prop here
    <>
      {/* Fixed top bar for search, cart and social icons */}
      <div className="fixed top-0 right-0 z-50 flex items-center space-x-2 p-4">
        
      
        
     
        
        {/* Cart Button (Sheet Trigger) */}
        <Sheet>
          <SheetTrigger asChild={false}> {/* asChild={false} because we are wrapping the content */}
            <Button
              variant="ghost"
              size="sm" // Changed to sm for text button
              // Added/Adjusted classes for consistent effects with social icons
              className="relative text-black group overflow-hidden drop-shadow-md hover:bg-transparent transition-all px-1 py-1 font-thin text-[0.65rem] uppercase tracking-wider" // Added text styles
              asChild={false}
            >
              {/* Wrap button content in a single span for SheetTrigger asChild */}
              <span className="flex items-center justify-center h-full w-full relative">
                <span className="group-hover:animate-button-glitch relative z-10" data-text="Bag">Bag</span> {/* Text label */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-snyk-purple text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center z-20"> {/* Fixed background, text color, size, and added z-index */}
                    {cartCount}
                    </span>
                )}
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm bg-black text-white flex flex-col">
            <SheetHeader className="border-b border-zinc-800 pb-4">
              <SheetTitle className="text-purple-500 text-xl font-display uppercase">Your Cart ({cartCount})</SheetTitle>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto py-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-zinc-400 text-center">Your cart is empty.</p>
              ) : (
                cartItems.map((item: any) => ( // Use 'any' for now, ideally define CartItem type
                  <div key={item.id} className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        {item.selectedSize && <p className="text-xs text-zinc-400">Size: {item.selectedSize}</p>}
                        {item.selectedColor && <p className="text-xs text-zinc-400">Color: {item.selectedColor}</p>}
                        <p className="text-sm font-bold mt-1">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Quantity controls could go here if needed */}
                      <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-red-500" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <SheetFooter className="border-t border-zinc-800 pt-4 flex flex-col gap-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <SheetClose asChild>
                <Link to="/cart"> {/* Link to the full cart page */}
                  <Button className="w-full bg-snyk-purple  text-white uppercase">View Full Cart</Button>
                </Link>
              </SheetClose>
            </SheetFooter> {/* SheetFooter closes */}
          </SheetContent> {/* SheetContent closes */}
        </Sheet> {/* Sheet closes */}
         {/* My Account Icon Link */}
        <Button
          variant="ghost" // Changed to sm for text button
          size="sm"
          asChild
          className="text-black relative group overflow-hidden drop-shadow-lg hover:bg-transparent transition-all px-1 py-1 font-thin text-[0.65rem] uppercase tracking-wider" // Added text styles
        >
     
          <Link to="/user-panel">
             <span className="group-hover:animate-button-glitch relative z-10" data-text="My Account">My Account</span> {/* Text label */}
                     <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
       
          </Link>
        
        </Button>

      </div> {/* This div closes the main top bar div */}
      
      
      {/* Full-screen search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="absolute inset-0 noise opacity-5"></div>
          <div className="absolute inset-0 scanlines"></div>
          
          <div className="container-custom py-4 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="w-8"></div>
              <Link to="/" className="h-12">
                <img 
                  src="http://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png" 
                  alt="Snyk Logo" 
                  className="h-full w-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]"
                />
              </Link>
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X size={20} className="hover:animate-button-glitch" />
              </button>
            </div>
            <div className="w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="SEARCH"
                className="w-full p-2 border-b border-zinc-700 text-lg uppercase focus:outline-none bg-transparent text-white"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
