
import { API_URL, buildAuthenticatedURL, CORS_PROXY } from './config';

// Function to handle API requests with URL-based authentication
export const fetchFromWooCommerce = async (endpoint: string, options: RequestInit = {}) => {
  try {
    console.log(`[WooCommerce API] Starting fetch for endpoint: ${endpoint}`);
    
    const authenticatedUrl = buildAuthenticatedURL(endpoint);
    console.log(`[WooCommerce API] Authenticated URL built`);
    
    const requestOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      cache: 'no-store' as RequestCache,
    };
    
    console.log('[WooCommerce API] Request options:', {
      method: options.method || 'GET',
      headers: requestOptions.headers
    });
    
    // Try direct API access first
    try {
      console.log('[WooCommerce API] Attempting direct connection...');
      const directResponse = await fetch(authenticatedUrl, requestOptions);
      
      console.log('[WooCommerce API] Direct response status:', directResponse.status);
      
      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('[WooCommerce API] Direct connection successful, data received:', {
          isArray: Array.isArray(data),
          length: Array.isArray(data) ? data.length : 'not array'
        });
        return data;
      }
      
      const errorText = await directResponse.text();
      console.log('[WooCommerce API] Direct connection failed:', {
        status: directResponse.status,
        statusText: directResponse.statusText,
        error: errorText.substring(0, 200)
      });
      
      if (directResponse.status === 401) {
        throw new Error('Authentication failed. Please check your WooCommerce API credentials.');
      }
      if (directResponse.status === 404) {
        throw new Error('WooCommerce API endpoint not found. Please check your store URL.');
      }
    } catch (directError) {
      console.log('[WooCommerce API] Direct connection error:', directError.message);
      
      // If it's not a network error, re-throw it
      if (!directError.message.includes('fetch') && !directError.name === 'TypeError') {
        throw directError;
      }
    }
    
    // Fallback to proxy without authentication headers
    console.log('[WooCommerce API] Trying CORS proxy fallback...');
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(authenticatedUrl)}`;
    console.log('[WooCommerce API] Proxy URL constructed');
    
    const proxyResponse = await fetch(proxyUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' as RequestCache,
      ...options,
    });

    console.log('[WooCommerce API] Proxy response status:', proxyResponse.status);

    if (!proxyResponse.ok) {
      const errorText = await proxyResponse.text();
      console.error('[WooCommerce API] Proxy response failed:', {
        status: proxyResponse.status,
        error: errorText.substring(0, 200)
      });
      
      throw new Error(`WooCommerce API Error: ${proxyResponse.status} - ${proxyResponse.statusText}`);
    }
    
    const proxyData = await proxyResponse.json();
    
    // Handle allorigins response format
    if (proxyData.contents) {
      const data = JSON.parse(proxyData.contents);
      console.log('[WooCommerce API] Proxy connection successful, data received:', {
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : 'not array'
      });
      return data;
    } else {
      console.log('[WooCommerce API] Proxy connection successful, direct data:', {
        isArray: Array.isArray(proxyData),
        length: Array.isArray(proxyData) ? proxyData.length : 'not array'
      });
      return proxyData;
    }
  } catch (error) {
    console.error('[WooCommerce API] Final error:', {
      name: error.name,
      message: error.message
    });
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
