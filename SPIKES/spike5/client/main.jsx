import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Names } from '../imports/api/names';

function App() {
  const [name, setName] = useState('');
  const players = useTracker(() => {
    Meteor.subscribe('names');
    return Names.find().fetch();
  });
  const setStatus = (status) => {
    if (!name) return;
    Meteor.call('names.setStatus', name, status);
  };
  return (
    <div>
      <h1>Player Status Board</h1>
      <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setStatus('Thinking')}>Thinking</button>
      <button onClick={() => setStatus('Ready')}>Ready</button>
      <ul>
        {players.map(p => (
          <li key={p._id}>{p.name} --- {p.status}</li>
        ))}
      </ul>
    </div>
  );
}
createRoot(document.getElementById('app')).render(<App />);
