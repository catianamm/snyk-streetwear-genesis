
// WooCommerce configuration settings

// WooCommerce REST API endpoint
export const API_URL = 'https://cms.snyk.store/wp-json/wc/v3';

// As chaves de API (consumerKey, consumerSecret) e lógicas de autenticação
// do lado do cliente foram removidas, pois a autenticação deve ser
// tratada pelo proxy PHP para maior segurança.
// O CORS_PROXY também foi removido, pois o proxy PHP lida com o CORS.
// A constante API_URL pode ser mantida se for usada para construir
// caminhos de endpoint que são então passados para fetchFromWooCommerce.
// Se não for usada, pode ser removida também.
