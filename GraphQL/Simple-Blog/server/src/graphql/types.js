import { gql } from "apollo-server-express";

export const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        name: String!
        email: String!
        avatarUrl: String
        createdAt: Date
        updatedAt: Date
    }

    type Post {
        id: ID!
        content: String!
        imageUrl: String
        createdAt: Date
        updatedAt: Date
        user: User!
        userId:  ID!
    }

    type Query {
        posts: [Post!]
        post(id: ID!): Post
    }
`
  