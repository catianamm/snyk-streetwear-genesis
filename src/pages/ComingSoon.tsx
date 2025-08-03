import React, { useState, useEffect } from 'react'; // Import React
import { useNavigate, Navigate, Link } from 'react-router-dom'; // Import Navigate and Link
import NewsletterSignup from '@/components/NewsletterSignup';
import SocialMediaLinks from '@/components/SocialMediaLinks';

// Esta senha é apenas para o acesso de teste.
// Idealmente, viria de uma variável de ambiente, mas lembre-se que ela
// ainda será embutida no build do frontend.
// Remova/altere antes do lançamento público.
const TESTER_ACCESS_PASSWORD = '140912';

const ComingSoon = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  // Estados para o login discreto
  const navigate = useNavigate();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [logoClickCount, setLogoClickCount] = useState(0);

  const testerAccessKey = 'snykTesterAccessGranted';
  const hasTesterAccess = sessionStorage.getItem(testerAccessKey) === 'true';

  // Efeito de glitch ocasional para o visual da página
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Handler para o gatilho secreto (cliques no logo)
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) { // Revela o campo de senha após 5 cliques no logo
      setShowPasswordInput(true);
      setLoginError(''); // Limpa erros anteriores
      setLogoClickCount(0); // Reseta a contagem
    }
  };

  // Handler para o submit do formulário de senha
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TESTER_ACCESS_PASSWORD) {
      sessionStorage.setItem(testerAccessKey, 'true');
      setLoginError('');
      setPassword(''); // Limpa o campo de senha
      setShowPasswordInput(false); // Esconde o campo de senha
      // Adicionamos um pequeno delay para o sessionStorage ser definido antes do navigate
      setTimeout(() => navigate('/home'), 100);
    } else {
      setLoginError('Acesso negado. Tente novamente.');
      setPassword('');
    }
  };

  // Se o acesso de testador já foi concedido, redireciona para /home
  if (hasTesterAccess) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background elements - mantidos do seu código original */}
      <div className="absolute inset-0 noise opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 scanlines pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-64 h-64 border border-zinc-800 rotate-45 translate-x-32 -translate-y-32 opacity-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-48 h-48 border border-zinc-800 rotate-45 -translate-x-20 translate-y-20 opacity-20 pointer-events-none"></div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Logo - agora é o gatilho para o login */}
          <div
            className="mb-8 flex justify-center relative"
            onClick={handleLogoClick} // Adicionado onClick aqui
            style={{ cursor: 'pointer' }} // Muda o cursor para indicar clicável
            title="Pssst..." // Dica sutil
          >
            <div className={`absolute h-full w-full overflow-visible opacity-0 ${glitchActive ? 'opacity-100' : ''} transition-all duration-100`}>
              <img
                src="https://cms.snyk.store/wp-content/uploads/2025/06/logob.png"
                alt="Snyk Logo Glitch"
                className="h-24 w-auto translate-x-[6px] translate-y-[4px] scale-110"
              />
            </div>
            <img
              src="https://cms.snyk.store/wp-content/uploads/2025/06/logob.png"
              alt="Snyk Logo"
              className={`h-24 w-auto transition-transform duration-500 ${glitchActive ? 'skew-x-3 scale-105' : ''}`}
            />
          </div>

          <h1
            className={`text-4xl md:text-5xl font-display uppercase mb-4 mega-glitch ${glitchActive ? 'glitching' : ''}`}
            data-text="COMING SOON"
          >
            COMING SOON
          </h1>

          <p className="text-lg mb-10 text-zinc-300"> {/* Adjusted margin from mb-6 to mb-10 */}
            Our new online store is currently under construction. We're working hard to bring you the best in streetwear.
          </p>

          {/* CountdownTimer component was removed as per previous discussion */}
          <NewsletterSignup />
          <SocialMediaLinks />

          {/* Formulário de Senha Discreto - Condicionalmente Renderizado */}
          {showPasswordInput && (
            <form
              onSubmit={handlePasswordSubmit}
              className="mt-10 p-6 border border-border bg-card w-full max-w-xs mx-auto animate-fade-in rounded-none" // Usando suas variáveis de cor e animação
            >
              <label htmlFor="tester-password" className="block text-sm font-medium text-muted-foreground mb-1 text-left">
                Acesso Restrito:
              </label>
              <input
                type="password"
                id="tester-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full p-2 border border-input rounded-none bg-input text-foreground placeholder-muted-foreground/70 focus:ring-1 focus:ring-ring focus:outline-none text-sm"
                autoFocus
              />
              {loginError && <p className="text-destructive text-xs mt-2 text-left">{loginError}</p>}
              <button
                type="submit"
                className="w-full mt-4 p-2 bg-primary text-primary-foreground rounded-none hover:bg-primary/90 transition-colors text-sm uppercase"
              >
                Desbloquear
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-4 border-t border-zinc-800">
        <div className="container-custom text-center">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} SNYK. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
