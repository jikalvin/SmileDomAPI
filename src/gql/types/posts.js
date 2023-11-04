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
    getPost(id: ID!): Post
    getAllPosts: [Post]
    getLikes(postId: ID!): [Like]
    getComments(postId: ID!): [Comment]
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String!, content: String!): Post
    deletePost(id: ID!): Boolean
    createLike(postId: ID!, userId: ID!): Like
    deleteLike(id: ID!): Boolean
    createComment(postId: ID!, userId: ID!, content: String!): Comment
    deleteComment(id: ID!): Boolean
  }
`;