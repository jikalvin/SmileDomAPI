import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { timeStamp } from 'console';
const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const CallsSchema = new Schema({
  caller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  callType: {
    type: String,
    enum: ['audio', 'video'],
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  }
});
export { CallsSchema };