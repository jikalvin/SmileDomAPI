/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllPatients:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			context.di.authValidation.ensureThatUserIsAdministrator(context);

			// const sortCriteria = { isAdmin: 'desc', registrationDate: 'asc' };
			return context.di.model.Patients.find().lean();
		}
	},
	Mutation: {
		updatePatientInfo: async (parent, args, context) => {
			
			context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);
            console.log("user: ",user)
            const patient = await context.di.model.Patients.findOne({uuid: user.uuid});
			
			if (args.fullName) {
				await context.di.model.Patients.findOneAndUpdate( { uuid: user.uuid }, { $set: { fullName: args.fullName } }, { returnOriginal: false } );
			}
			
			if (args.dateOfBirth) {
				await context.di.model.Patients.findOneAndUpdate( { uuid: user.uuid }, { $set: { dateOfBirth: args.dateOfBirth } }, { returnOriginal: false } );
			}
			
			if (args.gender) {
				await context.di.model.Patients.findOneAndUpdate( { uuid: user.uuid }, { $set: { gender: args.gender } }, { returnOriginal: false } );
			}
			if (args.address) {
				await context.di.model.Patients.findOneAndUpdate( { uuid: user.uuid }, { $set: { address: args.address } }, { returnOriginal: false } );
			}
			if (args.phoneNumber) {
				await context.di.model.Patients.findOneAndUpdate( { uuid: user.uuid }, { $set: { phoneNumber: args.phoneNumber } }, { returnOriginal: false } );
			}
			
			return await context.di.model.Patients.findOne({uuid: user.uuid});
		},
	}
};
