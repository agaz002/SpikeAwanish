import React, { useState, useEffect } from 'react';

export function CountdownTimer() {
  // Start at 300 seconds (5 minutes)
  const [seconds, setSeconds] = useState(300);

  // useEffect runs once when the component mounts ([] = no dependencies)
  useEffect(() => {
    // Create a timer that fires every 1000ms (1 second)
    const interval = setInterval(() => {
      // Decrement by 1 each tick, but never go below 0
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    // Cleanup: stop the interval when the component unmounts
    // Prevents memory leaks if the component is removed from the page
    return () => clearInterval(interval);
  }, []);

  // Convert total seconds into MM:SS format
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  // Pick Tailwind colour class based on time remaining
  // Red under 1 min, yellow under 3 min, green otherwise
  const colour =
    seconds <= 60 ? 'text-red-500' :
    seconds <= 180 ? 'text-yellow-500' :
    'text-green-500';

  return (
    // font-mono ensures digits don't shift as numbers change width
    <div className={`text-5xl font-mono font-bold ${colour}`}>
      {mins}:{secs}
    </div>
  );
}
