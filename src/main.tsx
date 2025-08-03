import React from 'react'; // Importa a biblioteca React.
import { createRoot } from 'react-dom/client'; // Importa a função para criar a raiz de renderização no React 18+.
import App from './App.tsx'; // Importa o componente principal da sua aplicação.
import './index.css'; // Importa os estilos globais.
import { HelmetProvider } from 'react-helmet-async'; // Importa o provedor do react-helmet-async.

// Obtém o elemento HTML onde a aplicação React será montada.
const rootElement = document.getElementById("root");

// Verifica se o elemento raiz foi encontrado no DOM.
if (rootElement) {
  // Cria a raiz de renderização do React no elemento especificado.
  createRoot(rootElement).render(
    // React.StrictMode é um wrapper que verifica potenciais problemas na aplicação durante o desenvolvimento.
    <React.StrictMode>
      {/* HelmetProvider disponibiliza o contexto para que o componente Helmet funcione em toda a aplicação. */}
      <HelmetProvider>
        {/* Renderiza o componente principal da sua aplicação. */}
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  // Loga um erro no console se o elemento raiz não for encontrado.
  console.error("Falha ao encontrar o elemento raiz (root). Verifique seu arquivo HTML.");
}
