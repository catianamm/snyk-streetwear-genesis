
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
        cache: 'no-store', // Add cache: 'no-store' to prevent caching issues
      });
      
      if (directResponse.ok) {
        const data = await directResponse.json();
        console.log('Direct API access successful, response status:', directResponse.status);
        console.log('Response data sample:', data.length ? data.slice(0, 2) : data);
        return data;
      }
      console.log('Direct API access failed with status:', directResponse.status);
      const errorText = await directResponse.text();
      console.log('Error response:', errorText.substring(0, 200) + (errorText.length > 200 ? '...' : ''));
    } catch (directError) {
      console.log('Direct API access error:', directError);
    }
    
    // Fallback to proxy with improved reliability
    console.log('Falling back to CORS proxy');
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
    console.log('Using proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Add cache: 'no-store' to prevent caching issues
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Proxy response not OK:', response.status, errorText.substring(0, 200));
      throw new Error(`WooCommerce API Error: ${response.status} - ${errorText.substring(0, 100)}`);
    }
    
    const data = await response.json();
    console.log('WooCommerce API response via proxy successful. Sample:', data.length ? data.slice(0, 2) : data);
    return data;
  } catch (error) {
    console.error('Error fetching from WooCommerce:', error);
    throw error;
  }
};
