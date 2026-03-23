import { Meteor } from 'meteor/meteor';
import { Names } from '../imports/api/names';

Meteor.publish('names', function () {
  return Names.find();
});

Meteor.methods({
  async 'names.setStatus'(name, status) {
    await Names.upsertAsync({ name }, { $set: { name, status } });
  }
});
