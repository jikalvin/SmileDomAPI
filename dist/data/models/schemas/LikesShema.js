import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const LikesSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
export { LikesSchema };