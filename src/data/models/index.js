import mongoose from 'mongoose';

import { 
	DoctorsSchema, 
	PatientsSchema, 
	UsersSchema,
	MedicalHistorySchema
} from './schemas/index.js';

export const models = {
	Users: mongoose.model('users', UsersSchema),
	Patients: mongoose.model('patients', PatientsSchema),
	Doctors: mongoose.model('doctors', DoctorsSchema),
	MedicalHistory: mongoose.model('medicalHistory', MedicalHistorySchema),
};
