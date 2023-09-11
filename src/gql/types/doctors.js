import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type Doctor {
		fullName: String
		specialisation: String
		uuid: String
		address: String
		phoneNumber: String
	}

	input doctorInfo {
		fullName: String
		specialisation: String
		address: String
		phoneNumber: String
	}

	type Query {
		""" Get list of all patients """
		listAllDoctors: [Doctor]
	}

	type Mutation {
		""" It allows to update user info """
		updateDoctorInfo(input: doctorInfo): Patient
	}
`;