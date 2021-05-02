import { gql } from 'apollo-server-express';
import tireSchema from './tireSchema.js';
import customerSchema from './customerSchema.js';
import internalTransactionsSchema from './internalTransactionsSchema.js';
import customerTransactionsSchema from './customerTransactionsSchema.js';

const userSchema = gql`
  type User {
    _id: ID!,
    username: String!
  }

  type Login {
    user: User!,
    token: String!
  }

  extend type Query {
    login(username: String!, password: String!): Login!
  }
`;

const linkSchema = gql`
  scalar Date

   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

const searchSchema = gql`
  type SearchResult {
    customers: [Customer!]!
    tires: [Tire!]!
  }

  extend type Query {
    search(keyword: String!): SearchResult!
  }
`;

export default [
  linkSchema,
  customerSchema,
  tireSchema,
  internalTransactionsSchema,
  customerTransactionsSchema,
  userSchema,
  searchSchema
];