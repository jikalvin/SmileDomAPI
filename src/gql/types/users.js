import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	scalar Upload
	
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
		image: String
		duration: String!
		expiresAt: String!
	}

	type SubscriptionPlan {
		email: String!
		duration: String!
	}

	type Query {
		""" Get list of all users registered on database """
		listAllUsers: [User]
		subscriptionPlans: [SubscriptionPlan!]!
	}

	type Mutation {
		""" It allows to update user info """
		updateUserInfo(email: String, isAdmin: Boolean, isActive: Boolean, isDoctor: Boolean): User
		makeAdmin(email: String!): User!
		makeDoctor(email: String!): User!
		deleteUser(email: String!): User
		createSubscriptionPlan(duration: String!, email: String!): SubscriptionPlan!
	}
`;