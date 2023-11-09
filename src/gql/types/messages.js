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

	type ChatMessage {
		id: ID!
		sender: User!
		receiver: User!
		message: String!
		timestamp: String!
	}

	type Call {
		id: ID!
		caller: User!
		receiver: User!
		callType: String!
		startTime: String!
		endTime: String
	}

	type Query {
		getUser(uuid: String!): User
		getChatMessages(senderId: String!, receiverId: String!): [ChatMessage]
		getCalls(userId: String!): [Call]
		getAllChats: [ChatMessage]
	}

	type Mutation {
		sendMessage(senderId: String!, receiverId: String!, message: String!): ChatMessage
		makeCall(callerId: String!, receiverId: String!, callType: String!): Call
		endCall(callId: String!): Call
	}
`;