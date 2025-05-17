
import React from 'react';

interface SquareElementsProps {
  className?: string;
}

const SquareElements: React.FC<SquareElementsProps> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}>
     
      
         
      
      {/* Bottom right square */}
      <div className="absolute bottom-24 right-12 w-16 h-16 border border-zinc-600/20 -rotate-12"></div>
      
     
      
      {/* Floating squares with animation */}
      <div className="absolute top-1/4 right-1/3 w-4 h-4 border border-zinc-400/20 animate-pulse"></div>
      <div className="absolute top-2/3 left-1/4 w-6 h-6 border border-pink-500/10 animate-pulse delay-300"></div>
    </div>
  );
};

export default SquareElements;
