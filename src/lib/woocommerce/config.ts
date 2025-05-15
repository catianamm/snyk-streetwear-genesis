
// WooCommerce configuration settings

// WooCommerce REST API endpoint
export const API_URL = 'https://cms.snyk.store/wp-json/wc/v3';

// WooCommerce API credentials
export const consumerKey = import.meta.env.VITE_WC_CONSUMER_KEY || 'ck_55c495ad83d72567cdcda9937e1d9e3f5007f591';
export const consumerSecret = import.meta.env.VITE_WC_CONSUMER_SECRET || 'cs_22d4d9f95d58986873e1c09054cd89b0b346cac6';

// CORS Proxy to avoid CORS issues in development
export const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Helper function to create authentication header
export const getAuthHeader = () => {
  return 'Basic ' + btoa(`${consumerKey}:${consumerSecret}`);
};
