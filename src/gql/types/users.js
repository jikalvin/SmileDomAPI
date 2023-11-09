import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type User {
		id: ID!
		email: String
		phone: String
		isAdmin: Boolean
		isActive: Boolean
		isDoctor: Boolean
		uuid: String
		registrationDate: String
		lastLogin: String
	}

	type Query {
		""" Get list of all users registered on database """
		listAllUsers: [User]
	}

	type Mutation {
		""" It allows to update user info """
		updateUserInfo(email: String, isAdmin: Boolean, isActive: Boolean, isDoctor: Boolean): User
	}
`;