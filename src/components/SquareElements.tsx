
import React from 'react';

interface SquareElementsProps {
  className?: string;
}

const SquareElements: React.FC<SquareElementsProps> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}>
     
         
      
    </div>
  );
};

export default SquareElements;
