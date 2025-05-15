
import React from 'react';
import { useScrollEffects } from './hero/useScrollEffects';
import HeroBackgroundEffects from './hero/HeroBackgroundEffects';
import HeroContentLeft from './hero/HeroContentLeft';
import HeroImageRight from './hero/HeroImageRight';
import HeroScrollIndicator from './hero/HeroScrollIndicator';
import ProductFeatures from './hero/ProductFeatures';

const Hero = () => {
  const { scrollIntensity, glitchActive, heroRef } = useScrollEffects();

  return (
    <section ref={heroRef} className="relative bg-black text-white overflow-hidden ml-14 md:ml-16">
      <HeroBackgroundEffects scrollIntensity={scrollIntensity} />
      
      {/* Main hero area with split design */}
      <div className="w-full min-h-[90vh] flex flex-col md:flex-row">
        {/* Left side: Bold typography and call to action */}
        <HeroContentLeft 
          scrollIntensity={scrollIntensity} 
          glitchActive={glitchActive} 
        />
        
        {/* Right side: Audacious imagery with glitch effects enhanced with scroll reactivity */}
        <HeroImageRight 
          scrollIntensity={scrollIntensity} 
          glitchActive={glitchActive} 
        />
      </div>
      
      {/* Scroll indicator with enhanced animation on scroll */}
      <HeroScrollIndicator scrollIntensity={scrollIntensity} />
      
      {/* Secondary product features section with enhanced scroll effects */}
      <ProductFeatures scrollIntensity={scrollIntensity} />
    </section>
  );
};

export default Hero;
