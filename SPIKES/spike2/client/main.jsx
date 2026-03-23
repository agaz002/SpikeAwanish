// React core and useState for managing local component state
import React, { useState } from 'react';
// createRoot is the modern React 18 way to mount a component
import { createRoot } from 'react-dom/client';
// useTracker is Meteor's React hook — re-runs when Meteor data changes
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Names } from '../imports/api/names';

function App() {
  // Local state: the name typed in the input box
  const [name, setName] = useState('');

  // useTracker subscribes to Meteor data and re-renders when it changes
  // Any time the Names collection updates, players is recalculated
  const players = useTracker(() => {
    Meteor.subscribe('names'); // Request data from the server
    return Names.find().fetch(); // Return all player docs as an array
  });

  // Call the server method to update this player's status
  const setStatus = (status) => {
    if (!name) return; // Do nothing if no name has been entered
    Meteor.call('names.setStatus', name, status);
  };

  return (
    <div>
      <h1>Player Status Board</h1>
      {/* Controlled input: value comes from state, onChange updates state */}
      <input
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {/* Each button calls setStatus with a different value */}
      <button onClick={() => setStatus('Thinking')}>Thinking</button>
      <button onClick={() => setStatus('Ready')}>Ready</button>
      <ul>
        {/* Render one list item per player. key={p._id} is required by React */}
        {players.map(p => (
          <li key={p._id}>{p.name} --- {p.status}</li>
        ))}
      </ul>
    </div>
  );
}

// Mount the App component into the #app div in main.html
createRoot(document.getElementById('app')).render(<App />);
