
import { API_URL, getAuthHeader, CORS_PROXY } from './config';

// Function to handle API requests
export const fetchFromWooCommerce = async (endpoint: string, options = {}) => {
  try {
    console.log(`Fetching from WooCommerce API: ${API_URL}${endpoint}`);
    
    const targetUrl = `${API_URL}${endpoint}`;
    // Try direct API access first, then fallback to proxy
    try {
      console.log('Trying direct API access to:', targetUrl);
      const directResponse = await fetch(targetUrl, {
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
        },
        ...options,
      });
      
      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('Direct API access successful:', data);
        return data;
      }
      console.log('Direct API access failed, trying with proxy...');
    } catch (directError) {
      console.log('Direct API access error, trying with proxy:', directError);
    }
    
    // Fallback to proxy
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
    console.log('Using proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Proxy response not OK:', response.status, errorText);
      throw new Error(`WooCommerce API Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('WooCommerce API response via proxy:', data);
    return data;
  } catch (error) {
    console.error('Error fetching from WooCommerce:', error);
    throw error;
  }
};
