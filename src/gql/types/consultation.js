import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
type Question {
    question: String!
    response: String!
  }
  
  type Consultation {
    id: ID!
    patientId: ID!
    title: String!
    date: String!
    questions: [Question!]!
    diagnosis: String
    workUps: [String]
    treatment: [String]
  }
  
  type MedicalHistory {
    patientId: ID!
    consultations: [Consultation!]!
  }
  
  type Query {
    getMedicalHistory(patientId: ID!): MedicalHistory
  }
  
  type Mutation {
    createConsultation(patientId: ID!, title: String!, questions: [QuestionInput!]!): Consultation
    updateConsultation(consultationId: ID!, diagnosis: String, workUps: [String], treatment: String, questions: [QuestionInput!]!): Consultation
  }
  
  input QuestionInput {
    question: String!
    response: String!
  }  
`;