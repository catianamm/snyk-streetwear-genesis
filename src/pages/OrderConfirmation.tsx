
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ShoppingBag, Package, Mail } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || 'WC-12345';
  const total = location.state?.total || '149.99';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-zinc-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-lg border border-zinc-200 p-8 md:p-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display mb-4">Order Confirmed!</h1>
            <p className="text-lg mb-6">Thank you for your purchase.</p>
            
            <div className="bg-zinc-50 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Order Number</p>
                <p className="font-bold">{orderNumber}</p>
              </div>
              <div className="my-4 md:my-0">
                <p className="text-sm text-zinc-500 mb-1">Order Total</p>
                <p className="font-bold">${total}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Order Date</p>
                <p className="font-bold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-snyk-purple mr-3" />
                <p>A confirmation email has been sent to your email address.</p>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-snyk-purple mr-3" />
                <p>You'll receive shipping updates when your order ships.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="border-black hover:bg-black hover:text-white">
                <Link to="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" /> Continue Shopping
                </Link>
              </Button>
              <Button asChild className="bg-snyk-purple hover:bg-purple-700 text-white">
                <Link to="/account/orders">View Order History</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-display mb-4">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg border border-zinc-200">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-snyk-purple">1</span>
                </div>
                <h3 className="font-medium mb-2">Order Processing</h3>
                <p className="text-zinc-600 text-sm">We're preparing your items for shipment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-zinc-200">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-snyk-purple">2</span>
                </div>
                <h3 className="font-medium mb-2">Shipping</h3>
                <p className="text-zinc-600 text-sm">Your order will be shipped within 1-2 business days.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-zinc-200">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-snyk-purple">3</span>
                </div>
                <h3 className="font-medium mb-2">Delivery</h3>
                <p className="text-zinc-600 text-sm">Enjoy your new items! Don't forget to leave a review.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
