
// WooCommerce configuration settings

// WooCommerce REST API endpoint
export const API_URL = 'https://cms.snyk.store/wp-json/wc/v3';

// WooCommerce API credentials - using fallback values if env vars not available
const getConsumerKey = () => {
  try {
    return import.meta.env?.VITE_WC_CONSUMER_KEY || 'ck_55c495ad83d72567cdcda9937e1d9e3f5007f591';
  } catch {
    return 'ck_55c495ad83d72567cdcda9937e1d9e3f5007f591';
  }
};

const getConsumerSecret = () => {
  try {
    return import.meta.env?.VITE_WC_CONSUMER_SECRET || 'cs_22d4d9f95d58986873e1c09054cd89b0b346cac6';
  } catch {
    return 'cs_22d4d9f95d58986873e1c09054cd89b0b346cac6';
  }
};

export const consumerKey = getConsumerKey();
export const consumerSecret = getConsumerSecret();

// Updated CORS Proxy that supports authenticated URLs
export const CORS_PROXY = 'https://api.allorigins.win/get?url=';

// Helper function to create URL with auth parameters
export const buildAuthenticatedURL = (endpoint: string) => {
  const url = new URL(`${API_URL}${endpoint}`);
  url.searchParams.append('consumer_key', consumerKey);
  url.searchParams.append('consumer_secret', consumerSecret);
  console.log('[WooCommerce Config] Built authenticated URL for:', endpoint);
  return url.toString();
};

// Helper function to create authentication header (fallback)
export const getAuthHeader = () => {
  const credentials = `${consumerKey}:${consumerSecret}`;
  const encoded = btoa(credentials);
  console.log('[WooCommerce Config] Auth header created for consumer key:', consumerKey.substring(0, 10) + '...');
  return 'Basic ' + encoded;
};
