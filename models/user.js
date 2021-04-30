const mongoose = require('mongoose');
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
    //movies
});

module.exports = mongoose.model('User', userSchema);