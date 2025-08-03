
import { useEffect, useState } from 'react'; // Removed React
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import Footer from '@/components/Footer'; // Keep Footer import
import { Button } from '@/components/ui/button';
import { Check, ShoppingBag, Package, Mail, Loader2, AlertTriangle } from 'lucide-react'; // Import icons
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // <-- Add this import
import { fetchOrderById } from '@/lib/woocommerce/api';

// Define a basic type for the order structure.
// You should expand this based on the actual data you expect from WooCommerce.
interface OrderLineItem {
  id: number;
  name: string;
  quantity: number;
  total: string; // WooCommerce often returns prices as strings
}
interface OrderShipping {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}
interface Order {
  id: number;
  number: string; // Order number might be different from ID
  status: string;
  date_created: string; // ISO date string
  total: string; // WooCommerce often returns prices as strings
  line_items: OrderLineItem[];
  shipping: OrderShipping;
  // Add other fields you need, e.g., billing_address, customer_note, etc.
}

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId } = useParams<{ orderId: string }>(); // Get orderId from URL params
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null); // Use the defined Order type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback data from state (less reliable, primarily for initial navigation)
  const stateOrderNumber = location.state?.orderNumber;
  const stateTotal = location.state?.total;

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      setError(null);
      fetchOrderById(orderId)
        .then(data => {
          if (data) {
            setOrder(data);
          } else {
            setError(`Order #${orderId} not found or could not be loaded.`);
          }
        })
        .catch(err => {
          console.error("Failed to fetch order details:", err);
          setError(err.message || "Failed to load order details. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No order ID provided.");
      setLoading(false);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar and TopBar are now rendered by App.tsx */}
      <main className="flex-grow bg-zinc-50 pt-24 py-16"> {/* Adjusted padding-top */}
        <div className="container-custom max-w-4xl">
          {/* Breadcrumbs */}
          <div className="container-custom max-w-4xl mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Order Confirmation</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="container-custom max-w-4xl">
            <div className="bg-white rounded-lg border border-zinc-200 p-8 md:p-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-display mb-4">Order Confirmed!</h1>
              <p className="text-lg mb-6">Thank you for your purchase.</p>

              {/* Display loading, error, or order details */}
              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-snyk-purple mx-auto mb-4" />
                  <p>Loading order details...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">
                  <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                  <p className="mb-4 text-lg">Could not load order details.</p>
                  <p className="text-sm mb-6">{error}</p>
                  <Button onClick={() => navigate('/account/orders')}>View Order History</Button> {/* Or navigate home */}
                </div>
              ) : order ? (
                <>
                  <div className="bg-zinc-50 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Order Number</p>
                      <p className="font-bold">{order.number || `#${order.id}`}</p> {/* Use actual order number/id */}
                    </div>
                    <div className="my-4 md:my-0">
                      <p className="text-sm text-zinc-500 mb-1">Order Total</p>
                      <p className="font-bold">${parseFloat(order.total || '0').toFixed(2)}</p> {/* Use actual total */}
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Order Date</p>
                      <p className="font-bold">{new Date(order.date_created).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Optional: Display order items */}
                  <div className="mb-8 text-left">
                      <h3 className="text-lg font-semibold mb-4">Items Purchased</h3>
                      <ul className="space-y-3">
                          {order.line_items?.map((item: OrderLineItem) => (
                              <li key={item.id} className="flex justify-between text-sm">
                                  <span>{item.quantity} x {item.name}</span>
                                  <span>${parseFloat(item.total).toFixed(2)}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Optional: Display shipping address */}
                  {order.shipping && (
                   <div className="mb-10 text-left">
                      <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                      <p className="text-sm text-zinc-700">{order.shipping.first_name} {order.shipping.last_name}</p>
                      <p className="text-sm text-zinc-700">{order.shipping.address_1}</p>
                      {order.shipping.address_2 && <p className="text-sm text-zinc-700">{order.shipping.address_2}</p>}
                      <p className="text-sm text-zinc-700">{order.shipping.city}, {order.shipping.state} {order.shipping.postcode}</p>
                      <p className="text-sm text-zinc-700">{order.shipping.country}</p> {/* Consider mapping country code to name if needed */}
                   </div>
                  )}
                </>
              ) : (
              // Fallback if order is null after loading (should ideally not happen if error state is set)
              <div className="bg-zinc-50 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Order Number</p>
                  <p className="font-bold">{stateOrderNumber || 'N/A'}</p>
                </div>
                <div className="my-4 md:my-0">
                  <p className="text-sm text-zinc-500 mb-1">Order Total</p>
                  <p className="font-bold">${stateTotal || '0.00'}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Order Date</p>
                  <p className="font-bold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              )} {/* This closing curly brace was missing */}

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
        </div>
      </main>
      <Footer /> {/* Remove ml- padding here */}
    </div>
  );
};

export default OrderConfirmation;
