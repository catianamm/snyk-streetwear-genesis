import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
// Assuming WooCommerceCustomer is defined in your api.ts or a shared types file
// and fetchCustomerById is also in api.ts
import { fetchCustomerById, WooCommerceCustomer } from '@/lib/woocommerce/api'; // Adjust path if needed

// The user object in our context will now be richer, including the token
export interface AuthenticatedUser extends WooCommerceCustomer {
  token: string; // Token is now mandatory for an authenticated user
}

// Define the shape of your AuthContext
interface AuthContextType {
  currentUser: AuthenticatedUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthenticatedUser | null>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSession = () => {
      setLoading(true);
      // Simulate async fetch, replace with actual check if needed
      setTimeout(() => {
        const storedUser = sessionStorage.getItem('snykUser');
        if (storedUser) {
          try {
            const parsedUser: AuthenticatedUser = JSON.parse(storedUser);
            setCurrentUser(parsedUser);
          } catch (e) {
            console.error("Failed to parse stored user from session storage", e);
            sessionStorage.removeItem('snykUser'); // Clear corrupted data
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }, 500); // Keep a small delay to simulate async nature
    };
    fetchUserSession();
  }, []);

  const login = async (email: string, password: string): Promise<AuthenticatedUser | null> => {
    setLoading(true);
    try {
      // Step 1: Authenticate with WordPress (e.g., JWT plugin)
      const authResponse = await fetch('https://cms.snyk.store/wp-json/jwt-auth/v1/token', { // Replace with your actual JWT endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }), // Adjust payload as per your JWT plugin
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json().catch(() => ({ message: `Authentication failed: ${authResponse.statusText}` }));
        // Try to get a more specific message from common JWT plugin error responses
        const specificMessage = errorData.message || errorData.data?.message || `Authentication failed with status: ${authResponse.status}`;
        throw new Error(specificMessage);
      }

      const authData = await authResponse.json();
      // Adjust these based on your JWT plugin's response structure
      // Common JWT plugins might return user ID in `user_id`, `id`, `data.id`, etc.
      // And token in `token`, `data.token`, etc.
      const token = authData.token || authData.data?.token;
      const wooCommerceCustomerId = authData.user_id || authData.id || authData.data?.id || authData.ID; // WordPress often uses uppercase ID

      if (!token || !wooCommerceCustomerId) {
        console.error("Auth data received:", authData);
        throw new Error('Authentication successful, but token or user ID was not provided in the expected format.');
      }

      // Step 2: Fetch detailed customer data from WooCommerce using the ID and token
      // Ensure fetchCustomerById can handle the token for authorization if needed
      const customerDetails = await fetchCustomerById(wooCommerceCustomerId, token);

      if (!customerDetails) {
        throw new Error('User authenticated, but failed to fetch customer details from WooCommerce.');
      }

      // Step 3: Combine token with customer details and set as current user
      const authenticatedUser: AuthenticatedUser = {
        ...customerDetails, // Spread all properties from WooCommerceCustomer
        token: token,      // Add the token
      };

      sessionStorage.setItem('snykUser', JSON.stringify(authenticatedUser));
      setCurrentUser(authenticatedUser);
      return authenticatedUser;

    } catch (error) {
      console.error("Login process failed:", error);
      sessionStorage.removeItem('snykUser');
      setCurrentUser(null);
      // Re-throw the error so the UI (LoginPage) can display it
      // Ensure it's an Error instance for consistent handling in LoginPage
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(String(error || 'An unknown login error occurred.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    sessionStorage.removeItem('snykUser');
    setCurrentUser(null);
    // Simulate async logout if needed, e.g., calling a backend endpoint
    await new Promise(resolve => setTimeout(resolve, 200));
    setLoading(false);
  };

  const authContextValue: AuthContextType = {
    currentUser,
    loading,
    login,
    logout,
  };

  // This is the critical JSX return.
  // Ensure <AuthContext.Provider> is used, and the `value` prop is correctly assigned.
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
