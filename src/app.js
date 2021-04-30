const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('../routes/users');

const app = express();

mongoose
    .connect('mongodb://localhost:27017/moviedb-demo')
    .then(() => {
        console.log('Connected to DB.');
    })
    .catch(() => {
        console.log('Connection to DB failed.');
    });

app.use('/api/users', userRoutes);


module.exports = app;