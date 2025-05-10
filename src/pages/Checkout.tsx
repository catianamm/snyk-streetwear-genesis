
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Checkout = () => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  // Sample cart items for order summary
  const cartItems = [
    {
      id: 1,
      name: "Core Graphic Tee",
      price: 39.99,
      quantity: 1,
      size: "M",
      color: "Black",
    },
    {
      id: 2,
      name: "Urban Cargo Pants",
      price: 79.99,
      quantity: 1,
      size: "L",
      color: "Olive",
    },
  ];
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shippingCost;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-zinc-50">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display mb-4 md:mb-0">Checkout</h1>
            <Link to="/cart" className="text-snyk-purple hover:text-purple-700">
              Return to cart
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form sections */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input 
                        id="firstName" 
                        type="text" 
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input 
                        id="lastName" 
                        type="text" 
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street address</Label>
                      <Input 
                        id="address" 
                        type="text" 
                        placeholder="Enter your street address"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        type="text" 
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal code</Label>
                      <Input 
                        id="postalCode" 
                        type="text" 
                        placeholder="Enter postal code"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state" 
                        type="text" 
                        placeholder="Enter state or province"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="usa">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="mexico">Mexico</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <Checkbox id="saveAddress" />
                    <Label htmlFor="saveAddress" className="ml-2">
                      Save this address for future orders
                    </Label>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                  <RadioGroup defaultValue="standard">
                    <div className="flex items-center justify-between border p-4 rounded-lg mb-2">
                      <div className="flex items-center">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="ml-2">
                          <div className="font-medium">Standard Shipping (3-5 business days)</div>
                          <div className="text-sm text-zinc-500">Delivery by USPS</div>
                        </Label>
                      </div>
                      <div className="font-medium">
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border p-4 rounded-lg">
                      <div className="flex items-center">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="ml-2">
                          <div className="font-medium">Express Shipping (2-3 business days)</div>
                          <div className="text-sm text-zinc-500">Delivery by FedEx</div>
                        </Label>
                      </div>
                      <div className="font-medium">$14.99</div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment */}
                <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="ml-2">
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="ml-2">
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'credit' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on card</Label>
                        <Input 
                          id="cardName" 
                          type="text" 
                          placeholder="Enter name as it appears on your card"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input 
                          id="cardNumber" 
                          type="text" 
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input 
                            id="expiry" 
                            type="text" 
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV code</Label>
                          <Input 
                            id="cvv" 
                            type="text" 
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="mt-4 p-4 bg-zinc-50 rounded-lg text-center">
                      <p className="mb-2">You will be redirected to PayPal to complete your payment.</p>
                    </div>
                  )}
                </div>

                {/* Submit order button (mobile only) */}
                <div className="lg:hidden">
                  <Button 
                    type="submit" 
                    className="w-full bg-snyk-purple hover:bg-purple-700 text-white py-6"
                  >
                    Place Order • ${total.toFixed(2)}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-zinc-200 p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex items-start">
                        <div className="bg-zinc-100 h-16 w-16 flex items-center justify-center rounded-lg mr-3">
                          <span className="text-lg font-semibold">{item.quantity}x</span>
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-zinc-500">
                            Size: {item.size} | Color: {item.color}
                          </p>
                        </div>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Tax</span>
                    <span>Calculated at next step</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Submit order button (desktop only) */}
                <div className="hidden lg:block mt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-snyk-purple hover:bg-purple-700 text-white py-6"
                    onClick={handleSubmit}
                  >
                    Place Order
                  </Button>
                </div>
                
                {/* Policies */}
                <div className="mt-6 text-sm text-zinc-500">
                  <p className="mb-2">
                    By placing your order, you agree to our <Link to="/terms" className="text-snyk-purple hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-snyk-purple hover:underline">Privacy Policy</Link>.
                  </p>
                  <p>
                    Need help? <Link to="/contact" className="text-snyk-purple hover:underline">Contact us</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
