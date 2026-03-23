import React from 'react';
import { PlayerSlot } from './PlayerSlot';
import { CountdownTimer } from './CountdownTimer';

// Static player data — null means empty slot
const players = ['Player 1', 'Player 2', null, null];

export function App() {
  return (
    // Full screen dark background, centered column layout
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Game Lobby</h1>
      {/* Render the countdown timer component */}
      <CountdownTimer />
      {/* 2-column grid for the 4 player slots */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {/* Map over players array and render a slot for each */}
        {players.map((name, i) => (
          <PlayerSlot key={i} name={name} />
        ))}
      </div>
    </div>
  );
}
