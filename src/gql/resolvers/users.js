/**
 * All resolvers related to users
 * @typedef {Object}
 */
// import { GraphQLUpload } from "graphql-upload";

import { UserInputError } from "apollo-server-express";

export default {
	// Upload: GraphQLUpload,
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllUsers: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			const sortCriteria = { isAdmin: 'desc', registrationDate: 'asc' };
			return context.di.model.Users.find().sort(sortCriteria).lean();
		}
	},
	Mutation: {
		updateUserInfo: async (parent, { email, isAdmin, isActive, isDoctor, image }, context) => {

			context.di.authValidation.ensureThatUserIsLogged(context);

			const user = await context.di.authValidation.getUser(context);

			if (!user) {
				throw new UserInputError('User not found or login not allowed');
			}

			if (isAdmin) {
				await context.di.model.Users.findOneAndUpdate({ uuid: user.uuid }, { $set: { isAdmin: isAdmin } }, { returnOriginal: false });
			}
			if (image) {
				await context.di.model.Users.findOneAndUpdate({ uuid: user.uuid }, { $set: { image: image } }, { returnOriginal: false });
			}
			if (isDoctor) {
				await context.di.model.Users.findOneAndUpdate({ uuid: user.uuid }, { $set: { isDoctor: isDoctor } }, { returnOriginal: false });
			}

			if (email) {
				user.email = email;
			}

			if (isActive) {
				user.isActive = isActive;
			}

			return user;
		},
		makeAdmin: async (parent, { email }, context) => {

			context.di.authValidation.ensureThatUserIsLogged(context);
			const user = await context.di.model.Users.findOne({ email });

			if (!user) {
				throw new UserInputError('User not found or login not allowed');
			}

			return await context.di.model.Users.findOneAndUpdate({ email }, { $set: { isAdmin: true } }, { returnOriginal: false });
		},
		makeDoctor: async (parent, { email }, context) => {

			context.di.authValidation.ensureThatUserIsLogged(context);
			const user = await context.di.model.Users.findOne({ email });

			if (!user) {
				throw new UserInputError('User not found or login not allowed');
			}

			return await context.di.model.Users.findOneAndUpdate({ email }, { $set: { isDoctor: true } }, { returnOriginal: false });
		},
		createSubscriptionPlan: async (parent, { duration, email }, context) => {

			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureThatUserIsAdministrator(context);

			const user = await context.di.model.Users.findOne({ email });

			if (!user) {
				throw new UserInputError('User not found or login not allowed');
			}

			if (duration !== 'free') {
				const currentDate = new Date();
				if (!user.expiresAt || user.expiresAt <= currentDate) {
					const expirationDate = new Date();
					if (duration === 'monthly') {
						// expirationDate.setMonth(expirationDate.getMonth() + 1);
						await context.di.model.Users.findOneAndUpdate({ email }, { $set: { expiresAt: user.expiresAt.setMonth(user.expiresAt.getMonth() + 1), duration: duration } }, { returnOriginal: false });
					} else if (duration === '3 months') {
						// expiresAt.setMonth(expiresAt.getMonth() + 3);
						await context.di.model.Users.findOneAndUpdate({ email }, { $set: { expiresAt: user.expiresAt.setMonth(user.expiresAt.getMonth() + 3), duration: duration } }, { returnOriginal: false });
					} else if (duration === 'yearly') {
						// expiresAt.setFullYear(expiresAt.getFullYear() + 1);
						await context.di.model.Users.findOneAndUpdate({ email }, { $set: { expiresAt: user.expiresAt.setFullYear(user.expiresAt.getFullYear() + 1), duration: duration } }, { returnOriginal: false });
					}
				}
			}

			return await context.di.model.Users.findOne({ email });
		},
	}
};
