import React from 'react';

// PlayerSlot accepts a 'name' prop — null means the slot is empty
export function PlayerSlot({ name }) {
  // Convert name to boolean: 'Player 1' = true, null = false
  const filled = !!name;
  return (
    // Tailwind classes change dynamically based on whether slot is filled
    // filled = blue background, empty = grey background
    <div className={`p-4 rounded-lg text-center font-bold ${
      filled ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
    }`}>
      {/* Show the player name if filled, otherwise show 'Empty' */}
      {filled ? name : 'Empty'}
    </div>
  );
}
