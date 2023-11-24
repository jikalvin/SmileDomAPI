import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const AppointmentsSchema = new Schema({
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "scheduled"
  },
  puid: {
    type: String,
    required: true,
    unique: true
  },
  duid: {
    type: String,
    required: true,
    unique: true
  },
  auid: {
    type: String,
    required: true,
    unique: true,
    default: randomUUID
  }
}, {
  timestamps: true
});
export { AppointmentsSchema };