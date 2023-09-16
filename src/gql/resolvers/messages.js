/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllMessages:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			context.di.authValidation.ensureThatUserIsAdministrator(context);

			// const sortCriteria = { isAdmin: 'desc', registrationDate: 'asc' };
			return context.di.model.Messages.find().lean();
		},
		getUserMessages:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

            const user = await context.di.authValidation.getUser(context);

			const sortCriteria = { suid: user.uuid };
			return context.di.model.Messages.find({sortCriteria}).lean();
		}
	},
	Mutation: {
		createMessage: async (parent, {input}, context) => {
            const {content, ruid} = input;
			
			context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);
            
            await new context.di.model.Messages(
                { 
                    content,
                    ruid,
                    suid: user.uuid,
                }).save();
			
			return await context.di.model.Messages.findOne({suid: user.uuid});
		},
	}
};
