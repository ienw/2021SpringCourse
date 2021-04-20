const queries = {
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