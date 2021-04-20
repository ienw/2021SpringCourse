import { gql } from 'apollo-server-express';
import tireSchema from './tireSchema.js';

const customerSchema = gql`
    type Customer {
      _id: ID!
      name: String!
      carNumber: String!
      phone: String!
      carType: String! 
      tireSize: String! 
      miles: Int! 
      description: String!
   }

   extend type Query {
    customers: [Customer!]!
  }

  extend type Mutation {
    createCustomer(
      name: String!
      carNumber: String!
      phone: String!
      carType: String! 
      tireSize: String!
      miles: Int! 
      description: String!
      ): Customer!
    }
  `;
 
const internalTransactionsSchema = gql`
  type InternalTransaction {
    _id : ID!
    tire: ID!
    quantity: Int!
    price: Int!
    date: Date!
  }

  extend type Query {
    internalTransactions: [InternalTransaction!]!
 }

 extend type Mutation {
   createInternalTransaction(
    tire: ID!
    quantity: Int!
    price: Int!
    date: Date!
     ): InternalTransaction!
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

const schemas = [linkSchema, tireSchema, customerSchema, internalTransactionsSchema]

export default schemas;