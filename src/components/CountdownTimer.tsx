
import React, { useState, useEffect } from 'react';

// Countdown timer calculation with fixed launch date
const calculateTimeLeft = () => {
  // Set fixed launch date to June 15th, 2025
  const launchDate = new Date('2025-06-15T00:00:00');
  
  const difference = launchDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  };
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format date in a readable format
  const formatLaunchDate = () => {
    const launchDate = new Date('2025-06-15T00:00:00');
    return launchDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="text-center">
      {/* Launch Date */}
      <p className="text-xl mb-6 font-semibold text-pink-500">
        Launching on {formatLaunchDate()}
      </p>
      
      {/* Countdown Timer */}
      <div className="grid grid-cols-4 gap-3 mb-10">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 p-3">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs uppercase text-zinc-500">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
