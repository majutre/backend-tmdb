const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('../routes/users');

const app = express();

mongoose
    .connect('mongodb://localhost:27017/moviedb-demo', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connected to DB.');
    })
    .catch(() => {
        console.log('Connection to DB failed.');
    });

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/users', userRoutes);


module.exports = app;