
// Em src/lib/woocommerce/api.ts (ou onde quer que este arquivo esteja)

// A URL base do seu proxy PHP no WordPress, incluindo a versão da API se aplicável
const SYNK_WOOCOMMERCE_PROXY_BASE_URL = 'https://cms.snyk.store/wp-json/meu-proxy-snyk/v1';
// --- Type Definitions ---
// These should ideally match the structure of data returned by your proxy,
// which in turn should reflect WooCommerce API responses.

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string; // WooCommerce often returns price as string
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: string;
  images: Array<{ id: number; src: string; alt: string }>;
  attributes: Array<{ id: number; name: string; options: string[] }>;
  // Add other product fields as needed
}

export interface WooCommerceOrder {
  id: number;
  number: string; // Order number (e.g., "WC-123")
  status: string; // e.g., 'pending', 'processing', 'completed', 'failed'
  currency: string;
  total: string; // Total amount as a string
  payment_method: string; // Payment gateway ID (e.g., 'stripe', 'paypal')
  payment_method_title: string;
  billing: WooCommerceAddress;
  shipping: WooCommerceAddress;
  line_items: Array<WooCommerceOrderLineItem>;
  // Add other order fields as needed
}

export interface WooCommerceAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string; // State code
  postcode: string;
  country: string; // Country code
  email?: string;
  phone?: string;
}

export interface WooCommerceOrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id?: number;
  quantity: number;
  total: string;
  // Add other line item fields
}

export interface WooCommerceCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  billing: WooCommerceAddress;
  shipping: WooCommerceAddress;
  // Add other customer fields as needed
}

export interface PaymentResponse {
  success: boolean;
  order_id: number;
  redirect_url?: string;
  error?: string;
}

// --- Core API Fetch Function ---

/**
 * Fetches data from WooCommerce via the PHP proxy.
 * @param endpoint The API endpoint (e.g., '/products', '/orders/123').
 * @param options Standard Fetch API options.
 * @returns Promise<T> The JSON response from the API.
 */
export const fetchFromWooCommerce = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  // Garante que o endpoint comece com uma barra '/'
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${SYNK_WOOCOMMERCE_PROXY_BASE_URL}${normalizedEndpoint}`;

  console.log(`[SNYK Proxy API] Iniciando fetch para: ${url} com opções:`, options);

  try {
    const response = await fetch(url, {
      method: options.method || 'GET', // Permite outros métodos como POST
      headers: {
        'Content-Type': 'application/json', // Manter para POST/PUT
        ...options.headers, // Permite outros headers se necessário
      },
      
      cache: options.cache || 'no-store', // Good practice for dynamic data, allow override
     signal: AbortSignal.timeout(10000), // Timeout de 10 segundos
      body: options.body, // Para requisições POST/PUT
      ...options, // Spreads other options like credentials if passed
    });

    console.log(`[SNYK Proxy API] Resposta do proxy para ${endpoint}:`, response.status);

    if (!response.ok) {
      let detailedMessage = `API Error (via Proxy): ${response.status} - ${response.statusText}`;
      try {
        const errorData = await response.json();
        // Extract message from common error structures
        if (errorData?.message && typeof errorData.message === 'string') {
          detailedMessage = errorData.message;
        } else if (errorData?.data?.message && typeof errorData.data.message === 'string') { // WP_Error structure
          detailedMessage = errorData.data.message;
       } else if (errorData?.woocommerce_response?.message && typeof errorData.woocommerce_response.message === 'string') { // Custom proxy structure
           detailedMessage = errorData.woocommerce_response.message;
        }
      } catch (e) {
        console.warn(`[SNYK Proxy API] Não foi possível analisar o corpo da resposta de erro como JSON para ${url}`, e);
        // Se não conseguir parsear o JSON do erro, usa o texto do status ou o corpo como texto simples.
        const plainErrorText = await response.text();
        detailedMessage = `API Error (via Proxy): ${response.status} - ${plainErrorText.substring(0, 200) || response.statusText}`;
      }
      console.error(`[SNYK Proxy API] Erro detalhado para ${url}: ${detailedMessage}`);
      throw new Error(detailedMessage);
    }

    // Para métodos como DELETE que podem não retornar corpo, ou retornar status 204 No Content
    if (response.status === 204 || response.headers.get("content-length") === "0") {
        console.log(`[SNYK Proxy API] Resposta bem-sucedida sem conteúdo para ${endpoint}`);
      return null as T; // Or an appropriate success object, e.g., { success: true }
     }

    const data = await response.json();
    console.log(`[SNYK Proxy API] Dados recebidos com sucesso para ${endpoint}:`, data);
    return data as T;

  } catch (error) {
    console.error(`[SNYK Proxy API] Erro final na requisição para ${url}:`, error);
    // Ensure a proper Error object is thrown
    throw error instanceof Error ? error : new Error(String(error) || 'Unknown API error via proxy');
  }
};

// --- API Functions ---

/**
 * Creates a new order in WooCommerce.
 * IMPORTANT: Your PHP proxy must have a POST route for '/orders' that handles order creation.
 * @param orderData The order payload.
 * @returns Promise<WooCommerceOrder> The created order.
 */
export const createOrder = async (orderData: any): Promise<WooCommerceOrder> => {
   try {
    console.log('[SNYK Proxy API] Criando pedido WooCommerce com dados:', orderData);
     // This endpoint needs to exist in your PHP proxy and handle POST requests for order creation
    const createdOrder = await fetchFromWooCommerce<WooCommerceOrder>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    
    console.log('[SNYK Proxy API] Pedido criado com sucesso (resposta do proxy):', createdOrder);
    return createdOrder;
  } catch (error) {
    console.error('[SNYK Proxy API] Erro ao criar pedido:', error);
    throw error;
  }
};

// A função processPayment permanece mockada como antes.
export interface PaymentResponse {
  success: boolean;
  order_id: number;
  redirect_url?: string;
  error?: string;
}

export const processPayment = async (orderId: number, paymentData: any): Promise<PaymentResponse> => {
  try {
    console.log(`Processing payment for order ${orderId}:`, paymentData);
    return await new Promise<PaymentResponse>(resolve => setTimeout(() => resolve({
      success: true,
      order_id: orderId,
      redirect_url: `/order-confirmation/${orderId}`, // Ensure this matches your route
    }), 1000));
        // EXAMPLE of how it might look with a real proxy call:
    // const response = await fetchFromWooCommerce<PaymentResponse>(`/orders/${orderId}/process-payment`, {
    //   method: 'POST',
    //   body: JSON.stringify(paymentData),
    // });
    // return response;

  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      order_id: orderId,
      error: error instanceof Error ? error.message : 'Unknown payment error'
    };
  }
};

/**
 * Fetches a single product by its ID via the proxy.
 * Your PHP proxy must have a GET route like '/products/:id'.
 * @param productId The ID of the product.
 * @returns Promise<WooCommerceProduct> The product data.
 */
export const fetchProductById = async (productId: number): Promise<WooCommerceProduct> => {
   if (!productId) {
    console.error('[SNYK Proxy API] fetchProductById: Product ID is required.');
    throw new Error('Product ID is required.');
  }
  try {
    console.log(`[SNYK Proxy API] Fetching product by ID: ${productId}`);
    const product = await fetchFromWooCommerce<WooCommerceProduct>(`/products/${productId}`);
    console.log(`[SNYK Proxy API] Product data for ID ${productId}:`, product);
    return product;
  } catch (error) {
    console.error(`[SNYK Proxy API] Error fetching product by ID ${productId}:`, error);
   throw error;
  }
};

/**
 * Fetches a single order by its ID via the proxy.
 * Your PHP proxy must have a GET route like '/orders/:id'.
 * @param orderId The ID of the order.
 * @returns Promise<WooCommerceOrder> The order data.
 */
export const fetchOrderById = async (orderId: string | number): Promise<WooCommerceOrder> => {
  if (!orderId) {
    console.error('[SNYK Proxy API] fetchOrderById: Order ID is required.');
    throw new Error('Order ID is required.');
  }
  try {
    console.log(`[SNYK Proxy API] Fetching order by ID: ${orderId}`);
     const order = await fetchFromWooCommerce<WooCommerceOrder>(`/orders/${orderId}`);
    console.log(`[SNYK Proxy API] Order data for ID ${orderId}:`, order);
    return order;
  } catch (error) {
    console.error(`[SNYK Proxy API] Error fetching order by ID ${orderId}:`, error);
   throw error;
  }
};

/**
 * Fetches a customer's details by their ID via the proxy.
 * Your PHP proxy must have a GET route like '/customers/:id' and handle authentication.
 * @param customerId The ID of the customer.
 * @param token Optional authentication token if your proxy requires it directly.
 *              If auth is handled by WordPress session cookies via the proxy, this might not be needed.
 * @returns Promise<WooCommerceCustomer> The customer data.
 */
export const fetchCustomerById = async (customerId: number, token?: string): Promise<WooCommerceCustomer> => {
  if (!customerId) {
    throw new Error('Customer ID is required to fetch customer details.');
  }
  const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
  // Your proxy at /customers/:id needs to handle this request and ensure the user is authorized.
  return fetchFromWooCommerce<WooCommerceCustomer>(`/customers/${customerId}`, { headers });
};

/**
 * Updates a customer's details via the proxy.
 * Your PHP proxy must have a PUT route like '/customers/:id' and handle authentication.
 * @param customerId The ID of the customer to update.
 * @param details The customer details to update.
 * @param token Authentication token.
 * @returns Promise<WooCommerceCustomer> The updated customer data.
 */
export const updateCustomerDetails = async (
  customerId: number,
  details: Partial<WooCommerceCustomer>,
  token: string // Assuming token is required for updates
): Promise<WooCommerceCustomer> => {
  if (!token) throw new Error('Authentication token is required to update customer details.');
  // Your proxy at /customers/:id needs to handle this PUT request.
  return fetchFromWooCommerce<WooCommerceCustomer>(`/customers/${customerId}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(details),
  });
};

// Add other API functions as needed, e.g., for fetching products, categories, etc.
// Example:
// export const fetchProducts = async (params?: Record<string, string | number>): Promise<WooCommerceProduct[]> => {
//   const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
//   return fetchFromWooCommerce<WooCommerceProduct[]>(`/products${queryString}`);
// };
