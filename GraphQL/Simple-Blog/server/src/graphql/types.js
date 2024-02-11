import { gql } from "apollo-server-express";

export const typeDefs = gql`
    scalar Date

    # Types 
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

    # Queries
    type Query {
        posts: [Post!]
        post(id: ID!): Post
    }

    # Mutations
    type Mutation {
        login(Input: LoginInput!): AuthResponse
        register(Input: RegisterInput!): AuthResponse
        createPost(Input: CreatePostInput!): Response
        editPost(Input: EditPostInput!): Response
    }

    # Inputs
    input LoginInput {
        email: String!
        password: String!
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
    }

    input CreatePostInput {
        content: String!
        imageUrl: String
    }

    input EditPostInput {
        postId: ID!
        content: String!
        imageUrl: String
    }

    #Responses
    type AuthResponse {
        status: Boolean!
        message: String!
        token: String!
    }

    type Response {
        status: Boolean!
        message: String!
    }
`
  