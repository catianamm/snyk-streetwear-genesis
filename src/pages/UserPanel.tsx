import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { ShoppingBag, MapPin, LogOut, Settings, LayoutDashboard, Heart, Loader2, Home, User as UserIcon } from 'lucide-react'; // Renamed User to UserIcon to avoid conflict
import { useAuth, AuthenticatedUser } from '@/hooks/useAuth'; // Use AuthenticatedUser
import { updateCustomerDetails, WooCommerceCustomer } from '@/lib/woocommerce/api'; // fetchCustomerById no longer needed here

// Placeholder components for different panel sections
const DashboardSection = ({ customer }: { customer: AuthenticatedUser | null }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
    <p className="text-zinc-300">
      Welcome back, {customer?.first_name || 'Guest'}! Here you can view your recent activity and update your account information.
    </p>
    {/* Add more dashboard elements like recent orders summary, etc. */}
  </div>
);

const OrdersSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
    <p className="text-zinc-300">You have no orders yet.</p>
    {/* Placeholder for order list. In a real app, you'd fetch and display orders here. */}
    <div className="mt-6 border border-zinc-800 rounded-lg p-6 text-center">
      <ShoppingBag className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
      <p className="text-zinc-400 mb-4">No orders found. Ready to find something amazing?</p>
      <Button asChild className="bg-snyk-purple hover:bg-purple-700">
        <Link to="/products">Start Shopping</Link>
      </Button>
    </div>
  </div>
);

const AddressesSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">My Addresses</h2>
    <p className="text-zinc-300">Manage your shipping and billing addresses.</p>
    {/* Placeholder for address management */}
    <div className="mt-6 border border-zinc-800 rounded-lg p-6">
      <p className="text-zinc-400">You have no saved addresses.</p>
      <Button variant="outline" className="mt-4 border-zinc-700 hover:bg-zinc-800 hover:text-white">Add New Address</Button>
    </div>
  </div>
);

const AccountDetailsSection = ({ customer, onUpdate }: { customer: AuthenticatedUser | null, onUpdate: (details: Partial<AuthenticatedUser>) => Promise<void> }) => {
  const [formData, setFormData] = useState({
    firstName: customer?.first_name || '',
    lastName: customer?.last_name || '',
    email: customer?.email || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.first_name || '',
        lastName: customer.last_name || '',
        email: customer.email || '',
      });
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) {
      // Handle case where customer data might not be loaded yet, though unlikely if form is visible
      console.warn("Attempted to submit account details without customer data.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onUpdate({ first_name: formData.firstName, last_name: formData.lastName, email: formData.email });
      // Optionally: show a success message to the user
    } catch (error) {
      console.error("Failed to submit account details update:", error);
      // Optionally: show an error message to the user
    }
    setIsSubmitting(false);
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Account Details</h2>
      <p className="text-zinc-300">Update your personal information and password.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-zinc-400">First Name</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="Your First Name" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-zinc-400">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="Your Last Name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-400">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm" placeholder="you@example.com" />
        </div>
        {/* Password change fields would go here */}
        <Button type="submit" className="bg-snyk-purple hover:bg-purple-700" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

const FavoritesSection = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">My Favorites</h2>
    <p className="text-zinc-300">Here are the items you've saved for later.</p>
    {/* Placeholder for favorites list. In a real app, you'd fetch and display favorited products. */}
    <div className="mt-6 border border-zinc-800 rounded-lg p-6 text-center">
      <Heart className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
      <p className="text-zinc-400 mb-4">You haven't added any items to your favorites yet.</p>
      <Button asChild className="bg-snyk-purple hover:bg-purple-700">
        <Link to="/products">Discover Products</Link>
      </Button>
    </div>
  </div>
);

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'addresses', label: 'My Addresses', icon: MapPin },
  { id: 'account-details', label: 'Account Details', icon: Settings },
  { id: 'favorites', label: 'My Favorites', icon: Heart },
];

const UserPanel = () => {
  const { currentUser, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  // customerData will now come directly from currentUser
  // const [customerData, setCustomerData] = useState<WooCommerceCustomer | null>(null);
  // const [customerLoading, setCustomerLoading] = useState(true); // authLoading can be used
  const [updateError, setUpdateError] = useState<string | null>(null); // For update errors
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error (e.g., show a toast message)
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleUpdateAccountDetails = async (details: Partial<AuthenticatedUser>) => {
    if (!currentUser || !currentUser.token) { // Check currentUser directly
      console.error("Cannot update details: missing customer data or authentication token.");
      setUpdateError("Authentication details are missing. Please try logging in again.");
      throw new Error("Missing customer data or token for update.");
    }
    try {
      // The updateCustomerDetails API might need to be adjusted if it expects WooCommerceCustomer without the token
      // Or you can strip the token before sending if your API doesn't expect it in the body.
      // For now, assuming updateCustomerDetails can handle the AuthenticatedUser shape or relevant parts.
      const updatedCustomer = await updateCustomerDetails(currentUser.id, details, currentUser.token);
      // The useAuth hook should ideally update its own currentUser state if the API returns the full updated user.
      // For now, we'll assume the API call was successful.
      // If useAuth doesn't auto-update, you might need a way to refresh it or manually update parts of it.
      alert("Account details updated successfully!"); // Placeholder
      setUpdateError(null);
    } catch (error) {
      console.error("Failed to update account details:", error);
      const message = error instanceof Error ? error.message : "Could not update account details.";
      setUpdateError(message);
      throw error; // Re-throw for the form to handle
    }
  };

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/home'); // Or your login page
    }
    // No separate fetch needed here anymore, currentUser from useAuth has the data
  }, [currentUser, authLoading, navigate]);

  const renderSection = () => {
    if (authLoading && activeSection !== 'orders' && activeSection !== 'addresses' && activeSection !== 'favorites') {
      return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /> <span className="ml-2">Loading...</span></div>;
    }
    // Error display for login/initial load would be handled by the login page or a global error handler

    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection customer={currentUser} />; // Pass currentUser directly
      case 'orders':
        return <OrdersSection />;
      case 'addresses':
        return <AddressesSection />;
      case 'account-details':
        return <AccountDetailsSection customer={currentUser} onUpdate={handleUpdateAccountDetails} />; // Pass currentUser
      case 'favorites':
        return <FavoritesSection />;
      default:
        return <DashboardSection customer={currentUser} />; // Pass currentUser
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar and TopBar will be rendered by App.tsx */}
      {/* <Navbar /> */}
      {/* <TopBar /> */}

      {/* Adjusted padding-top for fixed header, removed ml- padding */}
      <main className="flex-grow pt-24 pb-16"> {/* Added pb-16 */}
        <div className="relative py-16 overflow-hidden">
          <div className="scanlines absolute inset-0 opacity-30 pointer-events-none"></div>
          <div className="noise absolute inset-0 opacity-10 pointer-events-none"></div>

          {/* Breadcrumbs */}
          <div className="container-custom relative z-10 mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Account</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="container-custom relative z-10">
            <h1 className="text-3xl md:text-4xl font-display uppercase mb-8 text-center">
              MY ACCOUNT
            </h1>

            <div className="h-px w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 mb-12 "></div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Navigation */}
              <aside className="w-full md:w-1/4 lg:w-1/5 border-r border-zinc-800 pr-8">
                <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start text-left px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${activeSection === item.id 
                          ? 'bg-zinc-800 text-snyk-purple' 
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                        }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <LogOut className="mr-3 h-5 w-5" />}
                    Logout
                  </Button>
                </nav>
              </aside>

              {/* Main Content Area */
              <section className="w-full md:w-3/4 lg:w-4/5">
                {renderSection()}
              </section>
              
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default UserPanel;

