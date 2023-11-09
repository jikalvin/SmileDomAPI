import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const PatientsSchema = new Schema({
	fullName: {
		type: String,
		required: false,
		lowercase: true
	},
	gender: {
		type: String,
		required: false,
		lowercase: true
	},
	address: {
		type: String,
		required: false
	},
	phoneNumber: {
		type: String,
		required: false
	},
	dateOfBirth: {
		type: Date,
		required: true,
		default: Date.now
	},
	uuid: {
		type: String,
		required: true,
		unique: true,
	},
	puid: {
		type: String,
		required: true,
		unique: true,
		default: randomUUID
	},
});

export { PatientsSchema };
