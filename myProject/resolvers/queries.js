import models from '../model.js';
import { login } from '../passport/authController.js';

const tires = models.tires;
const customers = models.customers;
const internalTransactions = models.internalTransactions;

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
  customers: (parent, args, context) => {
    return customers.find({})
  },
  tires: (parent, args, context) => {
    return tires.find({})
  },
  internalTransactions: (parent, args, context) => {
    return internalTransactions.find({})
  },
}

export default queries