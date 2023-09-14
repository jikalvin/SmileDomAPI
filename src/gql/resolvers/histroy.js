/**
 * All resolvers related to history
 * @typedef {Object}
 */
export default {
	Query: {
		listAllHistory:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			context.di.authValidation.ensureThatUserIsAdministrator(context);

			return context.di.model.MedicalHistory.find().lean();
		},
		getPatientHistory:  async (parent, {email}, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			context.di.authValidation.ensureThatUserIsAdministrator(context);

            const user = await context.di.model.Users.findOne({email});

			return await context.di.model.MedicalHistory.findOne({uuid: user.uuid});
		},

	},
	Mutation: {
		createMedicalHistory: async (parent, {input}, context) => {
            const {
                medicalCondition,
                allergies,
                medications,
                surgeries,
                weight,
                height,
                bloodType
            } = input;
			
			context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);

            await new context.di.model.MedicalHistory(
                { 
                    medicalCondition,
                    allergies,
                    medications,
                    surgeries,
                    weight,
                    height,
                    bloodType,
                    uuid: user.uuid,
                }).save();
			
			return await context.di.model.MedicalHistory.findOne({uuid: user.uuid});
		},
	}
};
