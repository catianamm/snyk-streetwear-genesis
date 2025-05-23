import { API_URL, getAuthHeader, CORS_PROXY } from './config';

// Function to handle API requests with improved caching and reliability
export const fetchFromWooCommerce = async (endpoint: string, options = {}) => {
  try {
    console.log(`[WooCommerce API] Fetching: ${API_URL}${endpoint}`);
    
    const targetUrl = `${API_URL}${endpoint}`;
    const requestOptions = {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      ...options,
      cache: 'no-store' as RequestCache,
    };
    
    console.log('[WooCommerce API] Request options:', {
      url: targetUrl,
      headers: { ...requestOptions.headers, Authorization: '[HIDDEN]' },
      method: options.method || 'GET'
    });
    
    // Try direct API access first
    try {
      console.log('[WooCommerce API] Attempting direct connection...');
      const directResponse = await fetch(targetUrl, requestOptions);
      
      console.log('[WooCommerce API] Direct response status:', directResponse.status);
      console.log('[WooCommerce API] Direct response headers:', Object.fromEntries(directResponse.headers.entries()));
      
      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('[WooCommerce API] Direct connection successful, data length:', Array.isArray(data) ? data.length : 'not array');
        return data;
      }
      
      const errorText = await directResponse.text();
      console.log('[WooCommerce API] Direct connection failed:', directResponse.status, errorText.substring(0, 300));
      
      if (directResponse.status === 401) {
        throw new Error('Authentication failed. Please check your WooCommerce API credentials.');
      }
    } catch (directError) {
      console.log('[WooCommerce API] Direct connection error:', directError.message);
    }
    
    // Fallback to proxy
    console.log('[WooCommerce API] Trying CORS proxy fallback...');
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
    console.log('[WooCommerce API] Proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      cache: 'no-store' as RequestCache,
      ...options,
    });

    console.log('[WooCommerce API] Proxy response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[WooCommerce API] Proxy response failed:', response.status, errorText.substring(0, 300));
      
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
    console.log('[WooCommerce API] Proxy connection successful, data length:', Array.isArray(data) ? data.length : 'not array');
    return data;
  } catch (error) {
    console.error('[WooCommerce API] Final error:', error);
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
