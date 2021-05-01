const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const movies = require('./movie')

const userSchema = mongoose.Schema({
    userName: { 
        type: String, 
        required: true 
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userCpf: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },

    //movies
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);