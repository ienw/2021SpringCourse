import { gql } from 'apollo-server-express';


const customerTransactionsSchema = gql`
  type customerTransaction {
    _id: ID!,
    customer: ID!,
    tire: ID!,
    quantity: Int!,
    price: Int!,
    date: Date!,
  }

  extend type Query {
    customerTransactions: [customerTransaction!]!
 }

 extend type Mutation {
   createCustomerTransaction(
    customer: ID!,
    tire: ID!
    quantity: Int!
    price: Int!
    date: Date!
     ): customerTransaction!
   }
 `;


 export default customerTransactionsSchema;