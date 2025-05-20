
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import ComingSoon from "./pages/ComingSoon";
import SquareElements from "./components/SquareElements";

// Create a new QueryClient with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Layout component to add square elements to all pages
const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Don't show squares on index page or coming soon page as they're already added there
  const showSquares = location.pathname !== '/' && location.pathname !== '/coming-soon';
  
  return (
    <>
      {showSquares && <SquareElements />}
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Temporarily use ComingSoon as the main page */}
          <Route path="/" element={<ComingSoon />} />
          <Route path="/home" element={<Index />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/products" element={
            <PageLayout>
              <Products />
            </PageLayout>
          } />
          <Route path="/product/:id" element={
            <PageLayout>
              <ProductDetail />
            </PageLayout>
          } />
          <Route path="/about" element={
            <PageLayout>
              <About />
            </PageLayout>
          } />
          <Route path="/cart" element={
            <PageLayout>
              <Cart />
            </PageLayout>
          } />
          <Route path="/checkout" element={
            <PageLayout>
              <Checkout />
            </PageLayout>
          } />
          <Route path="/collections" element={
            <PageLayout>
              <Collections />
            </PageLayout>
          } />
          <Route path="/collections/:slug" element={
            <PageLayout>
              <CollectionDetail />
            </PageLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={
            <PageLayout>
              <NotFound />
            </PageLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
