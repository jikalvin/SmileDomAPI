import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const MedicalHistorySchema = new Schema({
	medicalCondition: [{
		type: String,
		required: false,
	}],
	allergies: [{
		type: String,
		required: false,
	}],
	medications: [{
		type: String,
		required: false,
	}],
	surgeries: [{
		type: String,
		required: false,
	}],
	weight: {
		type: String,
		required: false,
	},
	height: {
		type: Number,
		required: false
	},
	bloodType: {
		type: String,
		required: false
	},
	uuid: {
		type: String,
		required: true,
		unique: true,
	},
	huid: {
		type: String,
		required: true,
		unique: true,
		default: randomUUID
	},
});

export { MedicalHistorySchema };
