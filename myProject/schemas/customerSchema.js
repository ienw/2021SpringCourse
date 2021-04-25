import { gql } from 'apollo-server-express';

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


  export default customerSchema;