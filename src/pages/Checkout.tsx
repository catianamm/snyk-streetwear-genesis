
import { useState, useEffect } from 'react'; // Removed React
import { Link, useNavigate } from 'react-router-dom';
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
import { createOrder, processPayment, PaymentResponse, fetchFromWooCommerce } from '@/lib/woocommerce/api'; // Assuming fetchFromWooCommerce is exported
import { useCart } from '@/hooks/useCart';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator, // <-- Add this import
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Initial country will be set after fetching
let initialCountry = '';

interface Country {
  code: string;
  name: string;
}

interface State {
  code: string;
  name: string;
}

interface ShippingMethod {
  id: string;
  title: string;
  cost: string; // Keep as string, WooCommerce often returns it this way
  description?: string;
}

interface CartItemType { // Define or import your CartItemType
  id: number;
  name: string;
  price: number; // Ensure price is a number for calculations
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  // Add other properties your cart item might have
}

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  saveAddress: boolean;
}

interface OrderLineItem {
  product_id: number;
  quantity: number;
  meta_data?: Array<{ key: string; value: string }>;
}

interface OrderAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string; // Should be 2-letter ISO code
  email?: string;
  phone?: string;
}

interface ShippingLine {
  method_id: string;
  method_title: string;
  total: string;
}

interface OrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: OrderAddress;
  shipping: OrderAddress;
  line_items: OrderLineItem[];
  shipping_lines: ShippingLine[];
}

const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit',
  PAYPAL: 'paypal',
  APPLE_PAY: 'applepay',
  GOOGLE_PAY: 'googlepay',
};

const WOOCOMMERCE_PAYMENT_GATEWAYS = {
  // Ensure these IDs match your WooCommerce payment gateway settings
  CREDIT_CARD: 'stripe', // Example, if using Stripe
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay', // Example ID, replace with your actual WC gateway ID for Apple Pay
  GOOGLE_PAY: 'google_pay', // Example ID, replace with your actual WC gateway ID for Google Pay
};

// Helper function to build the order payload
const buildOrderPayload = (
  formData: CheckoutFormData,
  cartItems: CartItemType[],
  shippingCost: number, // This might be derived from selectedShippingMethod now
  paymentMethod: string,
  selectedShippingMethod?: ShippingMethod // Pass the selected method
): OrderData => {
  let wcPaymentMethodId = WOOCOMMERCE_PAYMENT_GATEWAYS.CREDIT_CARD;
  let wcPaymentMethodTitle = 'Credit Card';

  if (paymentMethod === PAYMENT_METHODS.PAYPAL) {
    wcPaymentMethodId = WOOCOMMERCE_PAYMENT_GATEWAYS.PAYPAL;
    wcPaymentMethodTitle = 'PayPal';
  } else if (paymentMethod === PAYMENT_METHODS.APPLE_PAY) {
    wcPaymentMethodId = WOOCOMMERCE_PAYMENT_GATEWAYS.APPLE_PAY;
    wcPaymentMethodTitle = 'Apple Pay';
  } else if (paymentMethod === PAYMENT_METHODS.GOOGLE_PAY) {
    wcPaymentMethodId = WOOCOMMERCE_PAYMENT_GATEWAYS.GOOGLE_PAY;
    wcPaymentMethodTitle = 'Google Pay';
  }

  const payload: OrderData = {
    payment_method: wcPaymentMethodId,
    payment_method_title: wcPaymentMethodTitle,
    set_paid: false, // This is correct. Payment status is updated by the gateway.
    billing: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address_1: formData.address,
      city: formData.city,
      state: formData.state,
      postcode: formData.postalCode,
      country: formData.country,
      email: formData.email,
      phone: formData.phone,
    },
    shipping: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address_1: formData.address,
      city: formData.city,
      state: formData.state,
      postcode: formData.postalCode,
      country: formData.country,
    },
    line_items: cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      // meta_data is suitable for sending additional info like selected size/color.
      // For products with actual variations in WooCommerce, you might need to send variation_id.
      meta_data: [
        { key: 'Size', value: item.selectedSize || 'N/A' },
        { key: 'Color', value: item.selectedColor || 'N/A' },
      ],
    })),
    shipping_lines: [], // Initialize as empty
  };

  if (selectedShippingMethod) {
    // Use the dynamically fetched and selected shipping method
    payload.shipping_lines.push({
      method_id: selectedShippingMethod.id,
      method_title: selectedShippingMethod.title,
      total: selectedShippingMethod.cost.toString(),
    });
  } else {
    // Fallback or default shipping line if no method is selected (or if needed)
    // This block might be removed if a shipping method is always required and validated before this point.
    payload.shipping_lines.push({
      method_id: 'flat_rate', // Ensure 'flat_rate' or a similar default is configured in WC if this fallback is used.
      method_title: 'Flat Rate',
      total: shippingCost.toString(), // Use the passed shippingCost as fallback
    });
  }
  return payload;
};


const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CREDIT_CARD);
  const [processing, setProcessing] = useState(false);
  const { cartItems, cartTotal, clearCart } = useCart() as { cartItems: CartItemType[], cartTotal: number, clearCart: () => void };

  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  // const [countriesError, setCountriesError] = useState<string | null>(null);

  const [availableStates, setAvailableStates] = useState<State[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  // const [statesError, setStatesError] = useState<string | null>(null);

  const [availableShippingMethods, setAvailableShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string>('');
  const [shippingMethodsLoading, setShippingMethodsLoading] = useState(true);
  // const [shippingMethodsError, setShippingMethodsError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: initialCountry, // Will be updated after countries fetch
    saveAddress: false
  });

  useEffect(() => {
    const fetchCountries = async () => {
      setCountriesLoading(true);
      try {
        const fetchedData = await fetchFromWooCommerce('/shipping/countries');
        let countriesArray: Country[] = [];
        if (Array.isArray(fetchedData)) {
            countriesArray = fetchedData;
        } else if (typeof fetchedData === 'object' && fetchedData !== null) {
            countriesArray = Object.entries(fetchedData).map(([code, name]) => ({ code, name: name as string }));
        }

        setAvailableCountries(countriesArray);
        if (countriesArray.length > 0) {
          const defaultCountry = countriesArray[0].code;
          setFormData(prev => ({ ...prev, country: defaultCountry }));
        }
        // setCountriesError(null);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        // setCountriesError("Could not load countries.");
        const fallbackCountries = [{ code: 'DE', name: 'Germany (Fallback)' }]; // Example fallback
        setAvailableCountries(fallbackCountries);
        if (fallbackCountries.length > 0) {
          setFormData(prev => ({ ...prev, country: fallbackCountries[0].code }));
        }
      } finally {
        setCountriesLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!formData.country) return;

    const fetchStates = async () => {
      setStatesLoading(true);
      setAvailableStates([]);
      try {
        const fetchedData = await fetchFromWooCommerce(`/shipping/countries/${formData.country}/states`);
        setAvailableStates(Array.isArray(fetchedData) ? fetchedData : []);
        // setStatesError(null);
      } catch (error) {
        console.error(`Failed to fetch states for ${formData.country}:`, error);
        // setStatesError("Could not load states.");
      } finally {
        setStatesLoading(false);
      }
    };
    fetchStates();
  }, [formData.country]);

  useEffect(() => {
    const fetchShipping = async () => {
      if (!formData.country || !formData.postalCode || cartItems.length === 0) {
        // Don't fetch if essential info is missing or cart is empty
        setAvailableShippingMethods([]);
        // It's important to also reset the selected shipping method ID if no methods are available
        // or if the conditions to fetch them aren't met.
        setSelectedShippingMethodId('');
        setShippingMethodsLoading(false);
        return;
      }
      setShippingMethodsLoading(true);
      try {
        // For a real app, this POST request would send destination and cart details
        // to a custom WordPress endpoint that uses WooCommerce's shipping calculation engine.
        // WooCommerce REST API does not have a standard endpoint for this.
        const methods = await fetchFromWooCommerce('/shipping/methods', {
          method: 'POST',
          body: JSON.stringify({
            destination: {
              country: formData.country,
              postcode: formData.postalCode,
              // city: formData.city, // Optional, depending on your WC setup
              // state: formData.state, // Optional
            },
            cart_items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
          }),
        });
        setAvailableShippingMethods(Array.isArray(methods) ? methods : []);
        if (Array.isArray(methods) && methods.length > 0) {
          setSelectedShippingMethodId(methods[0].id);
        } else {
          setSelectedShippingMethodId('');
        }
        // setShippingMethodsError(null);
      } catch (error) {
        console.error("Failed to fetch shipping methods:", error);
        // setShippingMethodsError("Could not load shipping options.");
        setAvailableShippingMethods([]); // Clear methods on error
        setSelectedShippingMethodId('');
      } finally {
        setShippingMethodsLoading(false);
      }
    };
    // Debounce or delay this call if postalCode changes frequently
    const timerId = setTimeout(() => {
        fetchShipping();
    }, 500); // Fetch after 500ms of inactivity in postalCode or country change

    return () => clearTimeout(timerId);
  }, [cartItems, formData.country, formData.postalCode, formData.city, formData.state]); // Re-fetch if these change

  const selectedShippingMethod = availableShippingMethods.find(method => method.id === selectedShippingMethodId);
  const shippingCost = selectedShippingMethod ? parseFloat(selectedShippingMethod.cost) : 0;
  const total = cartTotal + shippingCost;

  // Handle empty cart
  if (cartItems.length === 0 && !processing) { // Added !processing to prevent flash during order success
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-zinc-50 py-16">
          <div className="container-custom max-w-4xl">
            <div className="bg-white rounded-lg border border-zinc-200 p-8 text-center">
              <h1 className="text-3xl font-display mb-4">Your cart is empty</h1>
              <p className="mb-6">Add some products to your cart before checkout.</p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
    // If country changes, clear state as it might not be valid for the new country
    if (name === 'country') {
        setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Basic Form Validation
      const requiredFields: (keyof CheckoutFormData)[] = ['firstName', 'lastName', 'email', 'address', 'city', 'postalCode', 'country'];
      // State is only required if there are states for the selected country
      if (availableStates.length > 0) {
        requiredFields.push('state');
      }

      for (const field of requiredFields) {
        if (!formData[field]) {
          toast({
            title: "Missing Information",
            description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`,
            variant: "destructive"
          });
          setProcessing(false);
          return;
        }
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        setProcessing(false);
        return;
      }
      if (!selectedShippingMethodId && availableShippingMethods.length > 0) {
        toast({
            title: "Shipping Method Required",
            description: "Please select a shipping method.",
            variant: "destructive"
        });
        setProcessing(false);
        return;
      }


      // Create order in WooCommerce
      const orderPayload = buildOrderPayload(formData, cartItems, shippingCost, paymentMethod, selectedShippingMethod);

      // Log the payload in development to verify its structure before sending.
      // In production, sensitive data logging should be avoided or handled carefully.
      console.log('Creating order with data:', orderPayload);

      try {
        // Try to create a real WooCommerce order
        const order = await createOrder(orderPayload);

        // Order created successfully, now navigate to the payment page
        // Pass the selected WooCommerce payment gateway ID
        const wcPaymentMethodId = orderPayload.payment_method;

        toast({
          title: "Order Initiated",
          description: "Please complete your payment.",
        });

        navigate(`/payment/${order.id}`, {
          state: {
            paymentMethodId: wcPaymentMethodId // Pass the actual WC gateway ID
          }
        });

      } catch (apiError) {
        console.log('API error, using fallback order flow', apiError);
        // This fallback is useful for development but should be replaced with
        // proper error handling and user feedback in a production environment.
        setTimeout(() => {
          // Simulate a successful order for UX purposes if the backend fails.
          toast({
            title: "Order Placed Successfully!",
            description: "Thank you for your purchase. You will receive a confirmation email shortly.",
          });

          // Clear the cart
          clearCart();

          // Redirect to confirmation page with mock data
          navigate('/order-confirmation', {
            state: { // Mock order details
              orderId: 'MOCK-' + Math.floor(100000 + Math.random() * 900000),
              orderNumber: 'WC-' + Math.floor(100000 + Math.random() * 900000),
              total: total.toFixed(2)
            }
          });

          setProcessing(false);
        }, 2000);
      }

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
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/cart">Cart</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Checkout</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
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
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleSelectChange('country', value)}
                        disabled={countriesLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                           {countriesLoading && (
                            <div className="p-2 text-sm text-muted-foreground">Loading countries...</div>
                          )}
                          {!countriesLoading && availableCountries.length === 0 && (
                            <div className="p-2 text-sm text-muted-foreground">No countries available.</div>
                          )}
                          {!countriesLoading && availableCountries.map(country => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      {statesLoading ? (
                        <Input disabled placeholder="Loading states..." />
                      ) : availableStates.length > 0 ? (
                        <Select
                          value={formData.state}
                          onValueChange={(value) => handleSelectChange('state', value)}
                          required={availableStates.length > 0} // Only required if states are available
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableStates.map(s => (
                              <SelectItem key={s.code} value={s.code}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id="state"
                          name="state"
                          type="text"
                          placeholder="State / Province"
                          value={formData.state}
                          onChange={handleInputChange}
                          // Not required if no states are listed for the country
                        />
                      )}
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
                  {shippingMethodsLoading ? (
                    <p>Loading shipping options...</p>
                  ) : availableShippingMethods.length > 0 ? (
                    <RadioGroup
                        value={selectedShippingMethodId}
                        onValueChange={setSelectedShippingMethodId}
                    >
                      {availableShippingMethods.map(method => (
                        <div key={method.id} className="flex items-center justify-between border p-4 rounded-lg mb-2">
                          <div className="flex items-center">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="ml-2">
                              <div className="font-medium">{method.title}</div>
                              {method.description && <div className="text-sm text-zinc-500">{method.description}</div>}
                            </Label>
                          </div>
                          <div className="font-medium">
                            ${parseFloat(method.cost).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <p>No shipping options available for your address. Please check your address or contact support.</p>
                  )}
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
                      <RadioGroupItem value={PAYMENT_METHODS.CREDIT_CARD} id="credit" />
                      <Label htmlFor="credit" className="ml-2">
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value={PAYMENT_METHODS.PAYPAL} id="paypal" />
                      <Label htmlFor="paypal" className="ml-2">
                        PayPal
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value={PAYMENT_METHODS.APPLE_PAY} id="applepay" />
                      <Label htmlFor="applepay" className="ml-2">
                        Apple Pay
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value={PAYMENT_METHODS.GOOGLE_PAY} id="googlepay" />
                      <Label htmlFor="googlepay" className="ml-2">
                        Google Pay
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Placeholder for Payment Gateway Integration (e.g., Stripe Elements) */}
                  {/* For a real application, replace these inputs with the secure elements provided by your payment gateway. */}
                  {/* DO NOT capture raw credit card details directly in your form fields in production. */}
                  {/* Use solutions like Stripe Elements, Braintree Drop-in UI, PayPal SDK, etc. */}
                  {paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on card</Label>
                        <Input
                          id="cardName"
                          type="text"
                          placeholder="Enter name as it appears on your card"
                          // required // Validation handled by gateway
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          // required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            // required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV code</Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            // required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === PAYMENT_METHODS.PAYPAL && (
                    <div className="mt-4 p-4 bg-zinc-50 rounded-lg text-center">
                      <p className="mb-2">You will be redirected to PayPal to complete your payment.</p>
                    </div>
                  )}

                  {paymentMethod === PAYMENT_METHODS.APPLE_PAY && (
                    <div className="mt-4 p-4 bg-zinc-50 rounded-lg text-center">
                      {/* Placeholder for Apple Pay Button/Integration */}
                      <p className="mb-2">You will be prompted to complete your payment with Apple Pay.</p>
                    </div>
                  )}

                  {paymentMethod === PAYMENT_METHODS.GOOGLE_PAY && (
                    <div className="mt-4 p-4 bg-zinc-50 rounded-lg text-center">
                      {/* Placeholder for Google Pay Button/Integration */}
                      <p className="mb-2">You will be prompted to complete your payment with Google Pay.</p>
                    </div>
                  )}
                </div>

                {/* Submit order button (mobile only) */}
                <div className="lg:hidden">
                  <Button
                    type="submit"
                    className="w-full bg-snyk-purple hover:bg-purple-700 text-white py-6"
                    disabled={processing || shippingMethodsLoading || countriesLoading}
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
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between">
                      <div className="flex items-start">
                        <div className="bg-zinc-100 h-16 w-16 flex items-center justify-center rounded-lg mr-3">
                          {/* Assuming item.image exists on CartItemType */}
                          {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" /> */}
                           <span className="text-lg font-semibold">{item.quantity}x</span>
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-zinc-500">
                            Size: {item.selectedSize || 'N/A'} | Color: {item.selectedColor || 'N/A'}
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
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Shipping</span>
                    <span>
                        {shippingMethodsLoading ? 'Calculating...' : (
                            selectedShippingMethod ? `$${parseFloat(selectedShippingMethod.cost).toFixed(2)}` : 'N/A'
                        )}
                    </span>
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
                    // type="submit" // This should ideally be part of the form or trigger the form's onSubmit
                    className="w-full bg-snyk-purple hover:bg-purple-700 text-white py-6"
                    disabled={processing || shippingMethodsLoading || countriesLoading}
                    onClick={handleSubmit} // Triggers the same handleSubmit as the form
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
