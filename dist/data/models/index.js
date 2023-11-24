import mongoose, { mongo } from 'mongoose';
import { DoctorsSchema, PatientsSchema, UsersSchema, MedicalHistorySchema, MessagesSchema, PostsSchema, CommentsSchema, LikesSchema, CallsSchema, ConsultationsSchema } from './schemas/index.js';
export const models = {
  Users: mongoose.model('users', UsersSchema),
  Patients: mongoose.model('patients', PatientsSchema),
  Doctors: mongoose.model('doctors', DoctorsSchema),
  MedicalHistory: mongoose.model('medicalHistory', MedicalHistorySchema),
  Messages: mongoose.model('messages', MessagesSchema),
  Posts: mongoose.model('posts', PostsSchema),
  Comments: mongoose.model('comments', CommentsSchema),
  Likes: mongoose.model('likes', LikesSchema),
  Calls: mongoose.model('calls', CallsSchema),
  Consultations: mongoose.model('consultations', ConsultationsSchema)
};