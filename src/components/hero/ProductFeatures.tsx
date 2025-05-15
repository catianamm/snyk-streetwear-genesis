
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProductFeaturesProps {
  scrollIntensity: number;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ scrollIntensity }) => {
  return (
    <div className="container-custom py-12 md:py-16 bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left product feature - Deconstructed with art reference */}
        <div className="relative group">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1974" 
              alt="Summer Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img"
              data-speed="0.03"
              style={{ filter: `grayscale(${100 - scrollIntensity * 100}%)` }}
            />
            {/* Animated RGB overlay on hover with scroll enhancement */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-black/0 to-white/0 
                group-hover:from-black/30 group-hover:to-white/30 transition-all duration-500"
              style={{ 
                background: `linear-gradient(to top right, 
                  rgba(0,0,0,${scrollIntensity * 0.3}), 
                  rgba(139,92,246,${scrollIntensity * 0.2}))`
              }}
            ></div>
            
            {/* Abstract symbolism overlay with scroll color change */}
            <div className="absolute top-0 left-0 w-20 h-20 border border-white mix-blend-difference">
              <div 
                className="w-full h-full opacity-50"
                style={{ 
                  background: scrollIntensity > 0.5 ? 'linear-gradient(45deg, #8B5CF6, #F97316)' : 'white',
                  opacity: 0.5 + (scrollIntensity * 0.3)
                }}
              ></div>
            </div>
            
            
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <h2 
                className="text-lg md:text-xl font-display uppercase mb-2 group-hover:text-white transition-colors"
                style={{ color: scrollIntensity > 0.5 ? '#8B5CF6' : 'white' }}
              >
                SUMMER 2025
              </h2>
              <Button asChild variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black uppercase text-sm px-8 relative overflow-hidden group"
                style={{ 
                  borderColor: scrollIntensity > 0.5 ? '#8B5CF6' : 'white',
                  color: scrollIntensity > 0.5 ? '#8B5CF6' : 'white'
                }}
              >
                <Link to="/collections/summer2025">
                  <span className="relative z-10 group-hover:text-black transition-colors">SHOP NOW</span>
                  <span className="absolute inset-0 bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform"></span>
                </Link>
              </Button>
            </div>
            {/* Typography as art element with scroll color change */}
            <div 
              className="text-xs uppercase opacity-50 rotate-90 origin-bottom-right pb-6"
              style={{ 
                color: scrollIntensity > 0.5 ? '#8B5CF6' : 'white',
                opacity: 0.5 + (scrollIntensity * 0.3)
              }}
            >
              REIMAGINED
            </div>
          </div>
        </div>
        
        {/* Right product feature - Surreal imagery */}
        <div className="relative group overflow-hidden">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="http://cms.snyk.store/wp-content/uploads/2025/05/image1.png" 
              alt="Essentials Collection" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:contrast-125 parallax-img"
              data-speed="0.05"
              style={{ 
                filter: `grayscale(${100 - scrollIntensity * 100}%) contrast(${1 + scrollIntensity * 0.2})`,
                transform: `scale(${1 + scrollIntensity * 0.05})`
              }}
            />
            {/* Glitch effect on hover with scroll enhancement */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                bg-gradient-to-b from-transparent via-white/10 to-black/40"
              style={{ 
                background: `linear-gradient(to bottom, 
                  transparent,
                  rgba(139,92,246,${scrollIntensity * 0.1}), 
                  rgba(0,0,0,${0.4 + scrollIntensity * 0.2}))`,
                opacity: scrollIntensity * 0.5
              }}
            ></div>
            
            {/* Animated border with scroll color change */}
            <div 
              className={`absolute inset-0 border-2 scale-95 opacity-0 
                group-hover:opacity-60 transition-all duration-700 group-hover:scale-90 group-hover:rotate-3`}
              style={{ 
                borderColor: scrollIntensity > 0.5 ? '#8B5CF6' : 'white',
                opacity: scrollIntensity * 0.6,
                transform: `scale(${0.95 - scrollIntensity * 0.05}) rotate(${scrollIntensity * 3}deg)`
              }}
            ></div>
          </div>
          <div 
            className="mt-4 group-hover:translate-x-2 transition-transform duration-300"
            style={{ transform: `translateX(${scrollIntensity * 10}px)` }}
          >
            <h2 
              className="text-lg md:text-xl font-display uppercase mb-2 group-hover:text-white transition-colors"
              style={{ color: scrollIntensity > 0.5 ? '#8B5CF6' : 'white' }}
            >
              ESSENTIALS
            </h2>
            <Button asChild variant="outline" 
              className="border-white text-white hover:bg-white hover:border-white hover:text-black uppercase text-sm px-8 relative overflow-hidden group"
              style={{ 
                borderColor: scrollIntensity > 0.5 ? '#8B5CF6' : 'white',
                color: scrollIntensity > 0.5 ? '#8B5CF6' : 'white'
              }}
            >
              <Link to="/collections/essentials">
                <span className="relative z-10 transition-colors">SHOP NOW</span>
                <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform"></span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
