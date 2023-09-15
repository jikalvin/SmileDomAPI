import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type Message {
		content: String!
		suid: String!
		ruid: String!
	}

    input messageInfo {
        content: String!
		ruid: String!
    }

	type Query {
		""" Get list of all patients """
		listAllMessages: [Message]
        getUserMessages: [Message]
	}

	type Mutation {
		""" It allows to create message """
		createMessage(input: messageInfo!): Message
	}
`;