// Import Mongo from Meteor's built-in database package
import { Mongo } from 'meteor/mongo';

// Create a shared collection called 'names' in MongoDB
// This same collection is used by both client and server
export const Names = new Mongo.Collection('names');
