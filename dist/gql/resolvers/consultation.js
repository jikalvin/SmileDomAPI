import mongoose from 'mongoose';

/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
  Query: {
    getMedicalHistory: async (parent, args, context) => {
      const medicalHistory = await context.di.model.MedicalHistory.findOne({
        patientId: args.patientId
      }).populate('consultations');
      return medicalHistory;
    }
  },
  Mutation: {
    createConsultation: async (parent, args, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const patient = await context.di.model.Users.findOne({
        uuid: args.patientId
      });
      return await new context.di.model.Consultations({
        title: args.title,
        patientId: mongoose.Types.ObjectId(patient.id),
        questions: args.questions
      }).save();
    },
    updateConsultation: async (parent, args, context) => {
      const consultation = await context.di.model.Consultations.findByIdAndUpdate(consultationId, {
        diagnosis: args.diagnosis,
        workUps: args.workUps,
        treatment: args.treatment,
        questions: args.questions
      }, {
        new: true
      });
      return consultation;
    }
  }
};