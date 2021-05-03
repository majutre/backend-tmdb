const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('../routes/users');
const movieRoutes = require('../routes/movies');

const app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', true);

mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to DB.');
    })
    .catch(() => {
        console.log('Connection to DB failed.');
    });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Authorization',
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
    );
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);


module.exports = app;