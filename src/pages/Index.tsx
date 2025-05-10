
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <path d="M20.38 3.46 16 2a4 4 0 0 1 1 8v1a8 8 0 0 1 4.24 14h.76a1 1 0 0 0 1-1V8a7 7 0 0 0-2.62-5.54Z" />
                    <path d="M15 12V8a4 4 0 0 0-4-4 4 4 0 0 0-4 4v12a1 1 0 0 0 1 1h3" />
                    <path d="m13 19 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
                <p className="text-zinc-600">Carefully selected materials for comfort and durability.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
                <p className="text-zinc-600">Your transactions are always safe and secure with us.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Express Yourself</h3>
                <p className="text-zinc-600">Unique designs that help you stand out from the crowd.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="m4.93 4.93 2.83 2.83" />
                    <path d="m16.24 16.24 2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="m4.93 19.07 2.83-2.83" />
                    <path d="m16.24 7.76 2.83-2.83" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Fast Shipping</h3>
                <p className="text-zinc-600">Quick delivery options available worldwide.</p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        <section className="py-16 bg-zinc-100 text-black overflow-hidden relative">
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-6xl font-display mb-6">NEW DROP COMING SOON</h2>
              <p className="text-xl md:text-2xl mb-8 text-zinc-700">
                Limited edition. Unlimited style. Mark your calendar.
              </p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <span className="text-5xl font-display text-black">00</span>
                  <p className="text-sm text-zinc-500">Days</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-display text-black">00</span>
                  <p className="text-sm text-zinc-500">Hours</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-display text-black">00</span>
                  <p className="text-sm text-zinc-500">Minutes</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-display text-black">00</span>
                  <p className="text-sm text-zinc-500">Seconds</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
