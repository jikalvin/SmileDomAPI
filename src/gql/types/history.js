import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type MedicalHistory {
		medicalCondition: [String]
		allergies: [String]
		uuid: String
		medications: [String]
		surgeries: [String]
		weight: String
        height: String
        bloodType: String
	}

	input medicalHistoryInfo {
		medicalCondition: [String]
		allergies: [String]
		medications: [String]
		surgeries: [String]
		weight: String
        height: String
        bloodType: String
	}

	type Query {
		""" Get patients history """
		listAllHistory: [MedicalHistory]
		getPatientHistory(email: String!): MedicalHistory
	}

	type Mutation {
		""" It allows to create history info """
		createMedicalHistory(input: medicalHistoryInfo): MedicalHistory
	}
`;