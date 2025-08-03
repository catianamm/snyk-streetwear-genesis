// /Users/catiana/Documents/SNYK/snyk-streetwear-genesis/src/lib/woocommerce/index.ts

// Explicitly export members from api.ts, excluding the conflicting fetchProductById
export { fetchFromWooCommerce, createOrder, processPayment } from './api';
// If api.ts has other non-conflicting exports you need, add them to the line above.

export * from './models';
export * from './products'; // This will export fetchProductById from products.ts
export * from './config'; // You can also export config if needed elsewhere