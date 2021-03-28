const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: String,
    age: {
        type: Number,
        min: [0,'time cat?'],
        max: [42, 'record breaker?']
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'robot']
    }
});

module.exports = mongoose.model('Cat', catSchema);