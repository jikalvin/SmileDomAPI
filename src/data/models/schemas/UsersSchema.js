import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const UsersSchema = new Schema({
	email: {
		type: String,
		required: false,
		unique: true,
		trim: true,
		lowercase: true
	},
	phone: {
		type: String,
		required: false,
		trim: true,
	},
	verificationCode: {
		type: String
	},
	password: {
		type: String,
		// required: true
	},
	image: {
		type: String,
		// required: true
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	isDoctor: {
		type: Boolean,
		required: true,
		default: false
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true
	},
	uuid: {
		type: String,
		required: true,
		unique: true,
		default: randomUUID
	},
	registrationDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	lastLogin: {
		type: Date,
		required: true,
		default: Date.now
	},
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
	],
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Posts',
		},
	],
	duration: {
		type: String,
		enum: ['free', 'monthly', '3 months', 'yearly'],
		default: 'free'
	},
	expiresAt: {
		type: Date,
		default: Date.now
	}
});

/**
 * Hash the password of user before save on database
 */
UsersSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.genSalt((err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			this.password = hash;
			next();
		});
	});
});

export { UsersSchema };
