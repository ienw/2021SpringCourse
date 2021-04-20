import { gql } from 'apollo-server-express';

const tireSchema = gql`
type Tire {
  _id: ID!
  brand: String!
  model: String!
  stock: Int!
  singlePrice: Int!
  fullPrice: Int!
}

extend type Query {
  tires: [Tire!]!
}

extend type Mutation {
  createTire(
    brand: String!
    model: String!
    stock: Int!
    singlePrice: Int!
    fullPrice: Int!
  ): Tire!
}
`;

export default tireSchema;
