import { API_URL, getAuthHeader, CORS_PROXY } from './config';

// Function to handle API requests with improved caching and reliability
export const fetchFromWooCommerce = async (endpoint: string, options: RequestInit = {}) => {
  try {
    console.log(`[WooCommerce API] Starting fetch for: ${API_URL}${endpoint}`);
    console.log(`[WooCommerce API] API_URL configured as: ${API_URL}`);
    console.log(`[WooCommerce API] CORS_PROXY configured as: ${CORS_PROXY}`);
    
    const targetUrl = `${API_URL}${endpoint}`;
    const requestOptions: RequestInit = {
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
        console.log('[WooCommerce API] Direct connection successful, data received:', {
          isArray: Array.isArray(data),
          length: Array.isArray(data) ? data.length : 'not array',
          keys: typeof data === 'object' ? Object.keys(data) : 'not object'
        });
        return data;
      }
      
      const errorText = await directResponse.text();
      console.log('[WooCommerce API] Direct connection failed:', {
        status: directResponse.status,
        statusText: directResponse.statusText,
        error: errorText.substring(0, 500)
      });
      
      if (directResponse.status === 401) {
        throw new Error('Authentication failed. Please check your WooCommerce API credentials.');
      }
      if (directResponse.status === 404) {
        throw new Error('WooCommerce API endpoint not found. Please check your store URL.');
      }
    } catch (directError) {
      console.log('[WooCommerce API] Direct connection error details:', {
        name: directError.name,
        message: directError.message,
        stack: directError.stack?.substring(0, 300)
      });
      
      // If it's a network error, try the proxy
      if (directError.name === 'TypeError' || directError.message.includes('fetch')) {
        console.log('[WooCommerce API] Network error detected, trying proxy...');
      } else {
        // Re-throw non-network errors
        throw directError;
      }
    }
    
    // Fallback to proxy
    console.log('[WooCommerce API] Trying CORS proxy fallback...');
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
    console.log('[WooCommerce API] Proxy URL:', proxyUrl);
    
    const proxyResponse = await fetch(proxyUrl, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      cache: 'no-store' as RequestCache,
      ...options,
    });

    console.log('[WooCommerce API] Proxy response details:', {
      status: proxyResponse.status,
      statusText: proxyResponse.statusText,
      ok: proxyResponse.ok,
      headers: Object.fromEntries(proxyResponse.headers.entries())
    });

    if (!proxyResponse.ok) {
      const errorText = await proxyResponse.text();
      console.error('[WooCommerce API] Proxy response failed:', {
        status: proxyResponse.status,
        statusText: proxyResponse.statusText,
        error: errorText.substring(0, 500)
      });
      
      if (proxyResponse.status === 404) {
        throw new Error(`WooCommerce API endpoint not found: ${endpoint}. Check if your store is accessible at ${API_URL}`);
      } else if (proxyResponse.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (proxyResponse.status === 500) {
        throw new Error('WooCommerce server error. Please check your store configuration.');
      } else if (proxyResponse.status === 401) {
        throw new Error('Authentication failed. Please check your WooCommerce API credentials.');
      }
      
      throw new Error(`WooCommerce API Error: ${proxyResponse.status} - ${proxyResponse.statusText}`);
    }
    
    const data = await proxyResponse.json();
    console.log('[WooCommerce API] Proxy connection successful, data received:', {
      isArray: Array.isArray(data),
      length: Array.isArray(data) ? data.length : 'not array',
      keys: typeof data === 'object' ? Object.keys(data) : 'not object'
    });
    return data;
  } catch (error) {
    console.error('[WooCommerce API] Final error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
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
