import { gql } from 'apollo-server-express';


const stationSchema = gql`

  input Bounds {
    lat: Float,
    lng: Float
  }

  extend type Query {
    stations(limit: Int, bottomLeft: Bounds, topright: Bounds): [Station]
  }

  extend type Query {
    station(id: ID!): Station
  }
  
  type Location {
    _id: ID,
    coordinates: [Float],
    type: String, 
  }

  type Station {
    _id: ID
    Title: String,
    Town: String,
    Connections: [Connection],
    Location: Location,
    AddressLine1: String  
    StateOrProvince: String,
    Postcode: String
  }

  type Connection {
    _id: ID,
    ConnectionTypeID: ConnectionType,
    LevelID: Level,
    CurrentTypeID: CurrentType,
    Quantity: Int
  }

  type ConnectionType {
    _id: ID,
    FormalName: String,
    Title: String
  }

  type CurrentType {
    _id: ID,
    Description: String,
    Title: String
  }

  type Level {
    _id: ID,
    Comments: String,
    IsFastChargeCapable: Boolean,
    Title: String
  }

  input ConnectionInput {
    ConnectionTypeID: ConnectionTypeInput,
    LevelID: LevelInput,
    CurrentTypeID: CurrentTypeInput,
    Quantity: Int
  }

  input ConnectionTypeInput {
    FormalName: String,
    Title: String
  }

  input CurrentTypeInput {
    Description: String,
    Title: String
  }

  input LevelInput {
    Comments: String,
    IsFastChargeCapable: Boolean,
    Title: String
  }

  input LocationInput {
    coordinates: [Float],
    type: String
  }

  extend type Mutation {
    addStation(
      Title: String,
      Town: String,
      Connections: [ConnectionInput],
      Location: LocationInput,
      AddressLine1: String  
      StateOrProvince: String,
      Postcode: String
    ): Station
  }

  extend type Mutation {
    modifyStation(
      id: ID,
      Title: String,
      Town: String,
      Location: LocationInput,
      AddressLine1: String  
      StateOrProvince: String,
      Postcode: String
    ): Station
  }

  extend type Mutation {
    removeStation(id: ID): Station
  }
`;

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

export default [
   linkSchema,
   stationSchema,
];
