const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    id: Number,
    title: String,
    imgPath: String,
});

module.exports = mongoose.model('Movie', movieSchema);