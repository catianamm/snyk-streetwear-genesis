
import React from 'react';

interface SquareElementsProps {
  className?: string;
}

const SquareElements: React.FC<SquareElementsProps> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}>
      {/* Top left square */}
      <div className="absolute top-4 left-24 w-12 h-12 border border-purple-500/30 rotate-12"></div>
      
      {/* Top right squares */}
      <div className="absolute top-8 right-8 w-16 h-16 border-2 border-dashed border-zinc-700/20"></div>
      <div className="absolute top-24 right-24 w-8 h-8 border border-orange-500/20 -rotate-12"></div>
      
      {/* Bottom left squares */}
      <div className="absolute bottom-12 left-32 w-20 h-20 border border-pink-500/20 rotate-45"></div>
      <div className="absolute bottom-36 left-12 w-6 h-6 bg-purple-500/5"></div>
      
      {/* Bottom right square */}
      <div className="absolute bottom-24 right-12 w-16 h-16 border border-zinc-600/20 -rotate-12"></div>
      
      {/* Center left square */}
      <div className="absolute top-1/3 left-16 md:left-32 w-10 h-10 border border-purple-500/10 rotate-45"></div>
      
      {/* Center right squares */}
      <div className="absolute top-1/2 right-20 w-8 h-8 border-2 border-dashed border-orange-500/10 rotate-12"></div>
      
      {/* Floating squares with animation */}
      <div className="absolute top-1/4 right-1/3 w-4 h-4 border border-zinc-400/20 animate-pulse"></div>
      <div className="absolute top-2/3 left-1/4 w-6 h-6 border border-pink-500/10 animate-pulse delay-300"></div>
    </div>
  );
};

export default SquareElements;
