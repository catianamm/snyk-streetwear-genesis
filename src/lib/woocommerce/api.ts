
import { API_URL, getAuthHeader, CORS_PROXY } from './config';

// Function to handle API requests with improved caching and reliability
export const fetchFromWooCommerce = async (endpoint: string, options = {}) => {
  try {
    console.log(`Fetching from WooCommerce API: ${API_URL}${endpoint}`);
    
    const targetUrl = `${API_URL}${endpoint}`;
    const requestOptions = {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      ...options,
      cache: 'no-store', // Prevent browser caching
    };
    
    // Try direct API access first with improved error handling
    try {
      console.log('Trying direct API access to:', targetUrl);
      const directResponse = await fetch(targetUrl, requestOptions);
      
      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('Direct API access successful, response status:', directResponse.status);
        return data;
      }
      
      console.log('Direct API access failed with status:', directResponse.status);
      const errorText = await directResponse.text();
      console.log('Error response:', errorText.substring(0, 200) + (errorText.length > 200 ? '...' : ''));
      
      // If the response is 401 Unauthorized, the API keys might be invalid
      if (directResponse.status === 401) {
        throw new Error('Authentication failed. Please check your WooCommerce API credentials.');
      }
    } catch (directError) {
      console.log('Direct API access error:', directError);
    }
    
    // Fallback to proxy with improved error handling
    console.log('Falling back to CORS proxy');
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
    console.log('Using proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Proxy response not OK:', response.status, errorText.substring(0, 200));
      
      // Handle common HTTP errors
      if (response.status === 404) {
        throw new Error(`Resource not found: ${endpoint}`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status === 500) {
        throw new Error('WooCommerce server error. Please try again later.');
      }
      
      throw new Error(`WooCommerce API Error: ${response.status} - ${errorText.substring(0, 100)}`);
    }
    
    const data = await response.json();
    console.log('WooCommerce API response via proxy successful.');
    return data;
  } catch (error) {
    console.error('Error fetching from WooCommerce:', error);
    throw error;
  }
};

// Function to create a WooCommerce order
export const createOrder = async (orderData: any) => {
  try {
    console.log('Creating WooCommerce order with data:', orderData);
    const response = await fetchFromWooCommerce('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    
    console.log('Order created successfully:', response);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Function to process payment for an order
export const processPayment = async (orderId: number, paymentData: any) => {
  try {
    console.log(`Processing payment for order ${orderId}:`, paymentData);
    
    // In a real implementation, you would call the WooCommerce payment processing endpoint
    // For now, we'll just simulate a successful payment
    return {
      success: true,
      order_id: orderId,
      redirect_url: `/order-confirmation/${orderId}`,
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};
