// Import Meteor core and our shared Names collection
import { Meteor } from 'meteor/meteor';
import { Names } from '../imports/api/names';

// Publish the entire Names collection to all connected clients
// Clients must subscribe to 'names' to receive this data
Meteor.publish('names', function () {
  return Names.find(); // Send all documents in the collection
});

// Define server-side methods the client can call remotely
Meteor.methods({
  // 'names.add' inserts a new name document into MongoDB
  // async/await is required in Meteor 3.x — do not use insert()
  async 'names.add'(name) {
    await Names.insertAsync({ name }); // { name } is shorthand for { name: name }
  }
});
