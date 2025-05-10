
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative h-[50vh] bg-snyk-darkgray overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-40" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <div className="container-custom relative z-20 h-full flex items-end pb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-display text-white">OUR STORY</h1>
              <p className="text-xl text-zinc-100 mt-4">
                Born from the streets, made for the culture.
              </p>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display mb-6">WHO WE ARE</h2>
                <p className="text-lg mb-6 text-zinc-700">
                  Snyk was founded in 2023 with a clear mission: to create authentic streetwear that empowers young people to express themselves boldly and unapologetically. We're not just another clothing brand – we're a movement that celebrates individuality, creativity, and the unique voice of our generation.
                </p>
                <p className="text-lg mb-6 text-zinc-700">
                  Drawing inspiration from hip-hop culture, urban aesthetics, and the raw energy of youth, we craft pieces that tell stories and make statements. In a world of fast fashion and conformity, we stand for authenticity and self-expression.
                </p>
                <p className="text-lg mb-6 text-zinc-700">
                  Our name "Snyk" represents the swift, unexpected ways that true style can cut through the noise – making an impact that's impossible to ignore.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-snyk-purple rounded-full opacity-30 -z-10"></div>
                <div className="aspect-square overflow-hidden rounded-lg relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1584105184523-61fc4f2d46ff?q=80&w=1000" 
                    alt="Snyk Brand Story" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-snyk-orange rounded-full opacity-20 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-snyk-darkgray text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-8">OUR VALUES</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-snyk-purple/30 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-snyk-purple">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                  <p className="text-zinc-300">
                    We keep it real in everything we do – from our designs to our message.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-snyk-purple/30 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-snyk-purple">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-zinc-300">
                    We're building more than a brand – we're creating a global family of like-minded individuals.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-snyk-purple/30 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-snyk-purple">
                      <path d="M12 2v8"/>
                      <path d="m4.93 10.93 1.41 1.41"/>
                      <path d="M2 18h2"/>
                      <path d="M20 18h2"/>
                      <path d="m19.07 10.93-1.41 1.41"/>
                      <path d="M22 22H2"/>
                      <path d="m8 22 4-10 4 10"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Expression</h3>
                  <p className="text-zinc-300">
                    We believe fashion is the ultimate form of self-expression and personal identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1000" 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg mt-8">
                    <img 
                      src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000" 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=1000" 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg mt-8">
                    <img 
                      src="https://images.unsplash.com/photo-1506634064465-7dab4de896ed?q=80&w=1000" 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-display mb-6">OUR COMMITMENT</h2>
                <p className="text-lg mb-6 text-zinc-700">
                  We're committed to quality and sustainability in everything we do. Each piece is carefully designed and curated to ensure it meets our high standards.
                </p>
                <p className="text-lg mb-6 text-zinc-700">
                  We partner with manufacturers who share our values and vision. While we operate on a dropshipping model, we're selective about our suppliers, ensuring they deliver products that align with our brand identity and quality expectations.
                </p>
                <p className="text-lg mb-8 text-zinc-700">
                  Beyond fashion, we're dedicated to supporting youth initiatives and giving back to the communities that inspire us. A portion of every sale goes to programs that empower young people through arts, education, and entrepreneurship.
                </p>
                <Button asChild className="bg-snyk-purple hover:bg-purple-700 text-white">
                  <a href="mailto:contact@snykbrand.com">Get in Touch</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default About;
