import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { createOrder, processPayment } from '@/lib/woocommerce/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [processing, setProcessing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'usa',
    saveAddress: false
  });
  
  // Get cart items from location state if available
  const productFromState = location.state?.product;
  
  // Sample cart items for order summary (use product from state if available)
  const [cartItems, setCartItems] = useState(productFromState ? [
    {
      id: productFromState.id,
      name: productFromState.name,
      price: productFromState.price,
      quantity: productFromState.quantity || 1,
      size: productFromState.selectedSize || 'M',
      color: productFromState.selectedColor || 'Default',
    }
  ] : [
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
  ]);
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shippingCost;

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setProcessing(true);
      
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        setProcessing(false);
        return;
      }
      
      // Create order in WooCommerce
      const orderData = {
        payment_method: paymentMethod === 'credit' ? 'stripe' : 'paypal',
        payment_method_title: paymentMethod === 'credit' ? 'Credit Card' : 'PayPal',
        set_paid: false,
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postalCode,
          country: formData.country === 'usa' ? 'US' : formData.country.toUpperCase(),
          email: formData.email,
          phone: formData.phone
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postalCode,
          country: formData.country === 'usa' ? 'US' : formData.country.toUpperCase()
        },
        line_items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          meta_data: [
            { key: 'Size', value: item.size },
            { key: 'Color', value: item.color }
          ]
        })),
        shipping_lines: [
          {
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: shippingCost.toString()
          }
        ]
      };
      
      // In a real implementation, we would create an order in WooCommerce
      // For the demo, we'll simulate it with a delay
      console.log('Creating order with data:', orderData);
      
      // Simulate creating order
      setTimeout(() => {
        // Simulate successful payment processing
        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. You will receive a confirmation email shortly.",
        });
        
        // Redirect to a confirmation page
        navigate('/order-confirmation', { 
          state: { 
            orderNumber: 'WC-' + Math.floor(100000 + Math.random() * 900000),
            total: total.toFixed(2)
          } 
        });
        
        setProcessing(false);
      }, 2000);
      
      /* In a real implementation, uncomment this code:
      const order = await createOrder(orderData);
      
      // Process payment
      const paymentData = {
        order_id: order.id,
        payment_method: paymentMethod
      };
      
      const paymentResult = await processPayment(order.id, paymentData);
      
      if (paymentResult.success) {
        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. You will receive a confirmation email shortly.",
        });
        
        // Redirect to order confirmation page
        navigate(paymentResult.redirect_url);
      } else {
        throw new Error('Payment failed');
      }
      */
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Failed",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive"
      });
      setProcessing(false);
    }
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
                        name="email"
                        type="email" 
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
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
                        name="firstName"
                        type="text" 
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        type="text" 
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street address</Label>
                      <Input 
                        id="address"
                        name="address"
                        type="text" 
                        placeholder="Enter your street address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city"
                        name="city"
                        type="text" 
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal code</Label>
                      <Input 
                        id="postalCode"
                        name="postalCode"
                        type="text" 
                        placeholder="Enter postal code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state"
                        name="state"
                        type="text" 
                        placeholder="Enter state or province"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={formData.country}
                        onValueChange={(value) => handleSelectChange('country', value)}
                      >
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
                    <Checkbox 
                      id="saveAddress" 
                      checked={formData.saveAddress}
                      onCheckedChange={(checked) => handleCheckboxChange('saveAddress', checked === true)}
                    />
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
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Place Order • ${total.toFixed(2)}</>
                    )}
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
                      <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
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
                    disabled={processing}
                    onClick={handleSubmit}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
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
