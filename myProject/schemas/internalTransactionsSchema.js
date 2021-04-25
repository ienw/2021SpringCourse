import { gql } from 'apollo-server-express';


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


 export default internalTransactionsSchema;