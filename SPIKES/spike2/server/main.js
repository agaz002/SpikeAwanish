import { Meteor } from 'meteor/meteor';
import { Names } from '../imports/api/names';

// Publish all player records to connected clients
Meteor.publish('names', function () {
  return Names.find();
});

Meteor.methods({
  // upsertAsync = update if exists, insert if not
  // Finds a document where name matches, then sets name + status
  // This prevents duplicate entries for the same player
  async 'names.setStatus'(name, status) {
    await Names.upsertAsync({ name }, { $set: { name, status } });
  }
});
