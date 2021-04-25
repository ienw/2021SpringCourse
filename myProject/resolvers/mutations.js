import models from '../model.js';
import { AuthenticationError } from 'apollo-server-express';

const tires = models.tires;
const customers = models.customers;
const internalTransactions = models.internalTransactions;

const mutations = {
  createCustomer: (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Requires logged in user")
    }

    return customers.create(args)
  },
  createTire: (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Requires logged in user")
    }
    return tires.create(args)
  },
  createInternalTransaction: async (parent, args, context) => {
    if (!context.user) {
      throw new AuthenticationError("Requires logged in user")
    }
    
    const tireId = args.tire;
    await tires.updateOne({_id: tireId}, {$inc : { stock: args.quantity }})
    return internalTransactions.create(args)
  },
}

export default mutations
