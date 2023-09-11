/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllUsers:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			context.di.authValidation.ensureThatUserIsAdministrator(context);

			const sortCriteria = { isAdmin: 'desc', registrationDate: 'asc' };
			return context.di.model.Users.find().sort(sortCriteria).lean();
		}
	},
	Mutation: {
		updateUserInfo: async (parent, {email, isAdmin, isActive, isDoctor}, context) => {
			
			context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);
			
			if (isAdmin) {
				await context.di.model.Users.findOneAndUpdate( { uuid: user.uuid }, { $set: { isAdmin: isAdmin } }, { returnOriginal: false } );
			}
			if (isDoctor) {
				await context.di.model.Users.findOneAndUpdate( { uuid: user.uuid }, { $set: { isDoctor: isDoctor } }, { returnOriginal: false } );
			}
			
			if (email) {
			  user.email = email;
			}
			
			if (isActive) {
			  user.isActive = isActive;
			}
			
			return user;
		},
	}
};
