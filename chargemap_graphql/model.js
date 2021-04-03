import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const connectionsSchema = new Schema({
    ConnectionTypeID: mongoose.ObjectId,
    LevelID: mongoose.ObjectId,
    CurrentTypeID: mongoose.ObjectId,
    Quantity: Number
});

const connectiontypesSchema = new Schema({
    FormalName: String,
    Title: String
})

const currenttypesSchema = new Schema({
    Description: String,
    Title: String
})

const levelsSchema = new Schema({
    Comments: String,
    IsFastChargeCapable: Boolean,
    Title: String
})

const stationsSchema = new Schema({
    Location: new Schema({
        coordinates: [Number],
        type: String
    }),
    Connections: [{type: Schema.ObjectId, ref: 'connections'}],
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String, 
    Postcode: String
})

const usersSchema = new Schema({
    username: String,
    password: String, 
    full_name: String
})

const models = {
    connections: mongoose.model('connections', connectionsSchema),
    connectiontypes: mongoose.model('connectiontypes', connectiontypesSchema),
    currenttypes: mongoose.model('currenttypes', currenttypesSchema),
    levels: mongoose.model('levels', levelsSchema),
    stations: mongoose.model('stations', stationsSchema),
    users: mongoose.model('users', usersSchema)
}

export default models;
