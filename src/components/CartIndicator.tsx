
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartIndicator = () => {
  const { cartCount } = useCart();
  
  return (
    <Button variant="ghost" asChild className="relative p-2">
      <Link to="/cart">
        <ShoppingBag className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-snyk-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartIndicator;
