// Import Meteor, Tracker (reactivity engine), and our shared collection
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Names } from '../imports/api/names';

// Subscribe to the 'names' publication defined in server/main.js
// This tells the server to start sending Names data to this client
Meteor.subscribe('names');

// Wait for the DOM to be ready before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {

  // When the Add button is clicked, call the server method
  document.getElementById('addBtn').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value;
    Meteor.call('names.add', name); // Calls the method on the server
    document.getElementById('nameInput').value = ''; // Clear input
  });

  // Tracker.autorun re-runs this function whenever Names data changes
  // This is how Meteor achieves real-time UI updates
  Tracker.autorun(() => {
    const names = Names.find().fetch(); // Get all names as an array
    // Rebuild the list HTML every time data changes
    document.getElementById('list').innerHTML =
      names.map(n => `<li>${n.name}</li>`).join('');
  });
});
