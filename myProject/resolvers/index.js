import queries from './queries.js';
import mutations from './mutations.js';
import date from './date.js';

const resolvers = {
  Date: date,
  Mutation: mutations,
  Query: queries,
};

export default resolvers;