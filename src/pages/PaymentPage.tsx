import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, CreditCard, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { fetchOrderById, processPayment, PaymentResponse } from '@/lib/woocommerce/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom'; // Added Link for Breadcrumb

// Define a basic type for the order structure.
interface Order {
  id: number;
  number: string;
  status: string;
  total: string;
  payment_method_title: string;
  payment_method: string; // The ID of the payment method (e.g., 'stripe', 'paypal')
  // Add other fields you need, e.g., line_items for summary
}

const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit', // This is your internal constant from Checkout.tsx
  PAYPAL: 'paypal',
  APPLE_PAY: 'applepay',
  GOOGLE_PAY: 'googlepay',
};

const WOOCOMMERCE_PAYMENT_GATEWAYS = {
  CREDIT_CARD: 'stripe', // Matches Checkout.tsx
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
};

const PaymentPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Extract payment method passed from Checkout page state if available
  const selectedPaymentMethodId = location.state?.paymentMethodId || WOOCOMMERCE_PAYMENT_GATEWAYS.CREDIT_CARD; // Default or passed

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
          console.error("Failed to fetch order details for payment:", err);
          setError(err.message || "Failed to load order details for payment.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No order ID provided for payment.");
      setLoading(false);
      navigate('/checkout'); // Redirect if no orderId
    }
  }, [orderId, navigate]);

  const handlePaymentSubmission = async () => {
    if (!order) return;

    setProcessingPayment(true);
    try {
      // In a real scenario, paymentData would include tokens or details from the payment gateway SDK
      const paymentData = {
        payment_method: order.payment_method, // Use the payment method stored with the order
        // Add any other necessary data, e.g., payment_token from Stripe Elements
      };

      const paymentResult: PaymentResponse = await processPayment(order.id, paymentData);

      if (paymentResult.success) {
        toast({
          title: "Payment Successful!",
          description: "Your order has been updated.",
        });
        navigate(paymentResult.redirect_url || `/order-confirmation/${order.id}`, {
          state: { orderId: order.id, orderNumber: order.number, total: order.total }
        });
      } else {
        throw new Error(paymentResult.error || "Payment processing failed.");
      }
    } catch (err) {
      console.error("Payment submission error:", err);
      toast({
        title: "Payment Failed",
        description: err instanceof Error ? err.message : "Could not process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <Loader2 className="h-12 w-12 animate-spin text-snyk-purple mb-4" />
        <p>Loading payment details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Error</h1>
        <p className="text-center mb-6">{error || "Could not load order for payment."}</p>
        <Button onClick={() => navigate('/checkout')}>Return to Checkout</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      {/* Navbar/Header would typically be here, rendered by App.tsx */}
      <main className="flex-grow pt-24 py-16">
        <div className="container-custom max-w-2xl">
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/cart">Cart</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/checkout">Checkout</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Payment</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="bg-white rounded-lg border border-zinc-200 p-8">
            <h1 className="text-3xl font-display mb-6 text-center">Complete Your Payment</h1>
            <div className="bg-zinc-50 p-4 rounded-md mb-6 text-sm">
              <p><strong>Order Number:</strong> {order.number || `#${order.id}`}</p>
              <p><strong>Total Amount:</strong> ${parseFloat(order.total).toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {order.payment_method_title}</p>
            </div>

            {/* Placeholder for Payment Gateway UI */}
            <div className="mb-6 p-6 border border-dashed border-zinc-300 rounded-lg min-h-[200px] flex flex-col items-center justify-center">
              {selectedPaymentMethodId === WOOCOMMERCE_PAYMENT_GATEWAYS.CREDIT_CARD && (
                <p className="text-zinc-500"><CreditCard className="inline-block mr-2 h-5 w-5" /> Secure Credit Card payment form will appear here (e.g., Stripe Elements).</p>
              )}
              {selectedPaymentMethodId === WOOCOMMERCE_PAYMENT_GATEWAYS.PAYPAL && (
                <p className="text-zinc-500">PayPal button/integration will appear here.</p>
              )}
              {(selectedPaymentMethodId === WOOCOMMERCE_PAYMENT_GATEWAYS.APPLE_PAY || selectedPaymentMethodId === WOOCOMMERCE_PAYMENT_GATEWAYS.GOOGLE_PAY) && (
                <p className="text-zinc-500">{order.payment_method_title} button/integration will appear here.</p>
              )}
            </div>

            <Button
              onClick={handlePaymentSubmission}
              className="w-full bg-snyk-purple hover:bg-purple-700 text-white py-3"
              disabled={processingPayment}
            >
              {processingPayment ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                <><Lock className="mr-2 h-4 w-4" /> Pay ${parseFloat(order.total).toFixed(2)} Securely</>
              )}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;