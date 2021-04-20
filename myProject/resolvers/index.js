import models from '../model.js';
import queries from './queries.js';
import date from './date.js';

const tires = models.tires;
const customers = models.customers;
const internalTransactions = models.internalTransactions;

const resolvers = {
  Date: date,
  Mutation: {
    createCustomer: (parent, args, context) => {
      return customers.create(args)
    },
    createTire: (parent, args, context) => {
      return tires.create(args)
    },
    createInternalTransaction: async (parent, args, context) => {
      const tireId = args.tire;
      await tires.updateOne({_id: tireId}, {$inc : { stock: args.quantity }})
      return internalTransactions.create(args)
    },
  },
  Query: queries,
};

export default resolvers;