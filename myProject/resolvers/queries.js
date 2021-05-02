import models from '../model.js';
import { login } from '../passport/authController.js';

const tires = models.tires;
const customers = models.customers;
const internalTransactions = models.internalTransactions;
const customerTransactions = models.customerTransactions;

const queries = {
  login: async (parent, args, { req, res }) => {
    try {
      req.body = args
      const result = await login(req, res);
      console.log("login result", result);
      return result;
    } catch (e) {
      console.log(e);
      throw new AuthenticationError("Login failed");
    }
  },
  search: async (parent, args, { req, res }) => {
    const tireResult = await tires.find({ $text: { $search: args.keyword } })
    const customerResult = await customers.find({ $text: { $search: args.keyword } })
    return {
      tires: tireResult,
      customers: customerResult,
    }
  },
  customers: (parent, args, context) => {
    return customers.find({})
  },
  tires: (parent, args, context) => {
    return tires.find({})
  },
  internalTransactions: (parent, args, context) => {
    return internalTransactions.find({})
  },
  customerTransactions: (parent, args, context) => {
    return customerTransactions.find({})
  },
}

export default queries