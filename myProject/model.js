import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tireSchema = new Schema({
  brand: String,
  model: String,
  stock: Number,
  singlePrice: Number,
  fullPrice: Number,
});

tireSchema.index({'$**': 'text'});

const tires = mongoose.model('tires', tireSchema);

const customerSchema = new Schema({
  name: String,
  carNumber: String, 
  phone: String,
  carType: String, 
  tireSize: String, 
  miles: Number, 
  description: String
});

customerSchema.index({'$**': 'text'});

const customers = mongoose.model('customers', customerSchema);

const internalTransactions = mongoose.model('internalTransactions', new Schema({
  tire: mongoose.ObjectId,
  quantity: Number,
  price: Number,
  date: Date,
}));

const customerTransactions = mongoose.model('customerTransactions', new Schema({
  customer: mongoose.ObjectId,
  tire: mongoose.ObjectId,
  quantity: Number,
  price: Number,
  date: Date,
}));

const users = mongoose.model('users', new Schema({
  username: String,
  password: String, 
}));

const models = {
  users,
  tires,
  customers,
  internalTransactions,
  customerTransactions,
}

export default models;
