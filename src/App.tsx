import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './hooks/useAuth'; // Import AuthProvider
import AppLayout from './AppLayout'; // Import the new AppLayout component

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <CartProvider>
        <Router>
          <AppLayout />
          <Toaster />
          <SonnerToaster position="top-right" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
