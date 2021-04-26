import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tires = mongoose.model('tires', new Schema({
  brand: String,
  model: String,
  stock: Number,
  singlePrice: Number,
  fullPrice: Number,
}));

const customers = mongoose.model('customers', new Schema({
  name: String,
  carNumber: String, 
  phone: String,
  carType: String, 
  tireSize: String, 
  miles: Number, 
  description: String
}));

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
