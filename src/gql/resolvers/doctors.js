/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllDoctors:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			// context.di.authValidation.ensureThatUserIsAdministrator(context);

			// const sortCriteria = { isAdmin: 'desc', registrationDate: 'asc' };
			return context.di.model.Doctors.find().lean();
		}
	},
	Mutation: {
		updatePatientInfo: async (parent, {input}, context) => {
			const {fullName, specialisation, address, phoneNumber} = input;
			
			context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);
            console.log("user: ",user)
            const doctor = await context.di.model.Doctors.findOne({uuid: user.uuid});
			
			if (fullName) {
				await context.di.model.Doctors.findOneAndUpdate( { uuid: user.uuid }, { $set: { fullName: fullName } }, { returnOriginal: false } );
			}
			
			if (specialisation) {
				await context.di.model.Doctors.findOneAndUpdate( { uuid: user.uuid }, { $set: { specialisation: specialisation } }, { returnOriginal: false } );
			}
			if (address) {
				await context.di.model.Doctors.findOneAndUpdate( { uuid: user.uuid }, { $set: { address: address } }, { returnOriginal: false } );
			}
			if (phoneNumber) {
				await context.di.model.Doctors.findOneAndUpdate( { uuid: user.uuid }, { $set: { phoneNumber: phoneNumber } }, { returnOriginal: false } );
			}
			
			return await context.di.model.Doctors.findOne({uuid: user.uuid});
		},
	}
};
