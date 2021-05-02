const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    movieId: Number,
    // userId: String,
    //isFavorite: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);