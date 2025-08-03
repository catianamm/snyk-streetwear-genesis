import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'; // Import Menu icon
import { X, Trash2, Menu } from 'lucide-react'; // Removed Search, ShoppingCart, User, Instagram icons as they will be text
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import HorizontalNavLinks from './HorizontalNavLinks'; // Import the new links component

const DefaultPageHeader = () => {
  /* const { cartItems, cartCount, cartTotal, removeFromCart } = useCart(); */
  const { currentUser } = useAuth(); // Get current user state
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Fixed horizontal header bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white text-black   h-18 flex items-center px-4"> {/* Corrected bg/text/border, items-center */}
        <div className="flex items-center justify-between h-full w-full">
          
          {/* Logo */}
          <Link 
            to="/home" 
            className="h-10 md:h-12 flex items-center p-1 relative group transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-2"
          >
            <img
              src="https://cms.snyk.store/wp-content/uploads/2025/06/logop.png" // Replace with your actual logo URL
              alt="Snyk Logo"
              className="h-full w-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-100 "
            />
          </Link>

          {/* Horizontal Navigation Links */}
          <div className="hidden md:flex flex-grow justify-center items-center h-full"> {/* Added items-center */}
             <HorizontalNavLinks />
          </div>

          {/* Right side: Search, Cart, Mobile Menu Trigger */}
           <div className="flex items-center space-x-2 md:space-x-4"> {/* Adjusted main container for right-side elements */}
        
        {/* Search Button */}
        <Button 
          variant="ghost" 
          size="sm" // Using sm for text buttons to keep them compact
          onClick={() => setSearchOpen(true)}
          className="group text-sm uppercase tracking-wider text-black hover:bg-transparent transition-colors px-1 py-1 font-thin text-[0.65rem]"
        >
          <span className="group-hover:animate-button-glitch" data-text="Search">Search</span> {/* Wrap text, add glitch class on hover */}
        </Button>
        
        {/* Cart Button (Sheet Trigger) */}
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm" // Using sm for text buttons
              className="group relative text-sm uppercase tracking-wider text-black hover:bg-transparent transition-colors px-1 py-1 font-thin text-[0.65rem]"
              asChild={false}
            >
              
              <span className="flex items-center relative">
               
                <span className="group-hover:animate-button-glitch" data-text="Bag">
                  Bag
                </span>
                {cartCount > 0 && (
                  <span 
                    className="ml-1 bg-purple-600 text-white text-[10px] rounded-full h-4 w-4 min-w-[1rem] flex items-center justify-center p-0.5" 
                    style={{ lineHeight: '1' }} // Ensure number is centered
                  >
                    {cartCount}
                  </span>
                )}
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
                <Link to="/cart"> 
                  <Button className="w-full bg-snyk-purple  text-white uppercase">View Full Cart</Button>
                </Link>
              </SheetClose>
            </SheetFooter> 
          </SheetContent> 
        </Sheet> {/* Sheet closes */} 
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="text-black relative overflow-hidden group">
      {/* <span className="flex items-center justify-center h-full w-full relative"> */}
        <Menu size={24} /> {/* Simplest form first */}
      {/*  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </span> */}
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-full bg-black text-white p-0">
    {/* Minimal content for testing */}
    <div>Mobile Menu Content</div>
  </SheetContent>
</Sheet>
         {/* My Account Icon Link */}
        {currentUser ? (
          <Button
            variant="ghost"
            size="sm" // Using sm for text buttons
            asChild
            className="group text-sm uppercase tracking-wider text-black hover:bg-transparent transition-colors px-1 py-1 font-thin text-[0.65rem]"
          >
            <Link to="/user-panel">
              <span className="group-hover:animate-button-glitch" data-text="My Account">My Account</span>
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" asChild className="group text-sm uppercase tracking-wider text-black hover:bg-transparent transition-colors px-1 py-1 font-thin text-[0.65rem]">
            <Link to="/login">
              <span className="group-hover:animate-button-glitch" data-text="Login">Login</span>
            </Link>
          </Button>
        )}
        {/* Mobile Menu Trigger - Kept as an icon button for mobile */}
        <div className="md:hidden"> {/* Only show on smaller than md screens */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black relative overflow-hidden group">
                <span className="flex items-center justify-center h-full w-full relative">
                  <Menu size={24} className="group-hover:animate-button-glitch" /> {/* Ensure size is treated as a number */}
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full bg-black text-white p-0">
              <div className="flex flex-col p-6 relative">
                <div className="absolute inset-0 noise opacity-5"></div>
                <div className="absolute inset-0 scanlines"></div>
                <div className="flex justify-end mb-8 relative z-10">
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                      <X size={24} className="hover:animate-button-glitch" />
                    </Button>
                  </SheetClose>
                </div>
                <div className="space-y-6 relative z-10">
                  {/* Mobile Links - can reuse HorizontalNavLinks or list them out */}
                  <Link to="/collections" className="text-3xl font-display uppercase group block">
                    <span className="group-hover:text-orange-400">COLLECTIONS</span>
                  </Link>
                  <Link to="/products" className="text-3xl font-display uppercase group block">
                    <span className="group-hover:text-pink-400">SHOP</span>
                  </Link>
                  <Link to="/user-panel" className="text-3xl font-display uppercase group block">
                    <span className="group-hover:text-purple-400">MY ACCOUNT</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
        </div>
      </header>

      {/* Full-screen search overlay - copied from TopBar */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="absolute inset-0 noise opacity-5"></div>
          <div className="absolute inset-0 scanlines"></div>

          <div className="container-custom py-4 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="w-8"></div> {/* Placeholder for alignment */}
              <Link to="/" className="h-12">
                <img
                  src="https://cms.snyk.store/wp-content/uploads/2025/05/g59-1.png"
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

export default DefaultPageHeader;
