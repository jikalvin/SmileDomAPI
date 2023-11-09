import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
  type User {
    id: ID!
    lastLogin: String
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    image: String!
    createdAt: String!
    updatedAt: String!
    puid: String
  }

  type Like {
    id: ID!
    post: Post!
    user: User!
    createdAt: String!
  }

  type Comment {
    id: ID!
    post: Post!
    user: User!
    content: String!
    createdAt: String!
  }

  type Query {
    getPost(puid: String!): Post
    getAllPosts: [Post]
    getLikes(puid: String!): [Like]
    getComments(postId: ID!): [Comment]
  }

  type Mutation {
    createPost(title: String!, content: String!, image: String!): Post
    updatePost(id: ID!, title: String!, content: String!): Post
    deletePost(id: ID!): Boolean
    createLike(puid: String!): Like
    deleteLike(id: ID!): Boolean
    createComment(puid: ID!, content: String!): Comment
    deleteComment(id: ID!): Boolean
  }
`;