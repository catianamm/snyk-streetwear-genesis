import { useState, useEffect } from 'react'; // Removed React
import Hero from '@/components/Hero';
import NewArrivals from '@/components/NewArrivals';
import MostWanted from '@/components/MostWanted';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';

const Index = () => {
  const [shopNowGlitchActive, setShopNowGlitchActive] = useState(false);
  const [hoverShopNow, setHoverShopNow] = useState(false);

  return (
    <>
      <Helmet>
        <title>Snyk - Authentic Streetwear</title>
        <meta name="description" content="Snyk: Explore uma moda urbana que desafia o convencional. Designs autênticos, para quem ousa ser diferente." />
      </Helmet>
      {/* Aplicando 'main-container-with-noise' para o efeito de ruído de fundo */}
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground main-container-with-noise">
        <Navbar />
        <TopBar />
        {/* HomepageMobileBottomBar is rendered by AppLayout */}
        <main className="flex-grow"> {/* Keep main padding as is for homepage */}
          <section id="home" className="min-h-screen flex flex-col justify-center">
            <Hero />
          </section>

          <section id="most-wanted" className="min-h-screen py-20 md:py-28">
            <MostWanted />
          </section>

          <section id="shop" className="px-10 py-24 md:py-24  bg-black overflow-hidden">
            <div className="ml-14 md:ml-16 flex flex-col items-start ">
              <div className="mb-0 text-primary animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span className="font-mono text-xs md:text-sm tracking-wider">[Snyk_Core//Reimagined]</span>
              </div>

              <Link to="/products" className="group inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div
                  className="flex flex-row items-center gap-3 hover:gap-5 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => { setHoverShopNow(true); setShopNowGlitchActive(true); }}
                  onMouseLeave={() => { setHoverShopNow(false); setShopNowGlitchActive(false); }}
                >
                  <h2
                    className={`text-5xl text-white md:text-7xl lg:text-8xl font-display uppercase leading-none 
                      group-hover:text-primary transition-colors duration-300 
                      ${shopNowGlitchActive ? 'glitching mega-glitch' : ''}`}
                    data-text="SHOP NOW"
                  >
                    <span>shop now</span>
                  </h2>
                  <ArrowRight
                    className={`w-9 h-9 md:w-14 md:h-14 transform transition-all duration-300 ease-out 
                      ${hoverShopNow ? 'translate-x-3 text-primary scale-110' : 'scale-100'}`}
                    aria-hidden="true"
                  />
                </div>
              </Link>
              <p
                className="mt-6 text-muted-foreground max-w-lg text-sm md:text-base font-body leading-relaxed animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                Desafie o status quo. Nossas coleções são para quem não tem medo de reescrever as regras do estilo. Edições limitadas, impacto duradouro.
              </p>
            </div>
          </section>

          <section id="latest" className="min-h-screen py-20 md:py-28"> {/* Keep section padding as is for homepage */}
            <NewArrivals />
          </section>

         
        </main>
        <Footer className="ml-14 md:ml-16" /> {/* Add ml- padding back to the Footer instance on the homepage */}
      </div>
    </>
  );
};

export default Index;