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
    moviesId: [{
        //type: mongoose.Schema.Types.ObjectId, ref: 'Movie'
        type: Number
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);