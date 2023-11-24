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
const ConsultationsSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patients',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: false
    }
  }],
  diagnosis: {
    type: String
  },
  workUps: {
    type: [String]
  },
  treatment: {
    type: [String]
  }
});
export { ConsultationsSchema };