import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import DefaultPageHeader from './components/DefaultPageHeader';

// Import pages
import Index from './pages/Index';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import ComingSoon from './pages/ComingSoon';
import HomepageMobileBottomBar from './components/HomepageMobileBottomBar'; // Import the new component
import PaymentPage from './pages/PaymentPage'; // Import the new PaymentPage
import LoginPage from './pages/LoginPage'; // Import LoginPage
import UserPanel from './pages/UserPanel'; // Make sure this is imported if used in routes

const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
  const isComingSoonPage = location.pathname === '/' || location.pathname === '/coming-soon';

  return (
    <>
      {/* Conditionally render headers/navbars */}
      {isComingSoonPage ? (
        null // Render nothing on the coming soon page
      ) : isHomePage ? (
        <>
          {/* <Navbar /> Desktop only */}
          <TopBar className="lg:flex hidden" /> {/* TopBar desktop only on homepage */}
          <HomepageMobileBottomBar /> {/* Mobile only on homepage */}
        </>
      ) : (
        <DefaultPageHeader /> 
      )}{/* Used for all other pages (desktop and mobile) */}
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/home" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/:orderId" element={<PaymentPage />} /> {/* New route for PaymentPage */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} /> {/* Added LoginPage route */}
        <Route path="/collections" element={<Collections />} />
        <Route path="/collection/:slug" element={<CollectionDetail />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/user-panel" element={<UserPanel />} /> {/* Added UserPanel route */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default AppLayout;
