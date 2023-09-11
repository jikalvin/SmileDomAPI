import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type Patient {
		fullName: String
		dateOfBirth: String
		gender: String
		uuid: String
		address: String
		phoneNumber: String
	}

	type Query {
		""" Get list of all patients """
		listAllPatients: [Patient]
	}

	type Mutation {
		""" It allows to update user info """
		updatePatientInfo(fullName: String, dateOfBirth: String, gender: String, address: String, phoneNumber: String): Patient
	}
`;