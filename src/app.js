const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/user');

const app = express();

mongoose
    .connect('mongodb://localhost:27017/moviedb-demo')
    .then(() => {
        console.log('Connected to DB.');
    })
    .catch(() => {
        console.log('Connection to DB failed.');
    });

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Request-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.get('/api/users', (req, res, next) => {
    users = [
        {
            id: '123',
            userName: 'ServerUser',
            userEmail: 'a@a',
            userCpf: '123321'
        },
        {
            id: '1234',
            userName: 'ServerUser 2',
            userEmail: 'b@a',
            userCpf: '123123'
        },
        {
            id: '12345',
            userName: 'ServerUser 3',
            userEmail: 'c@a',
            userCpf: '321321'
        },
    ];
    res.status(200).json(users);
});

app.post('/api/users', (req, res, next) => {
    const user = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userCpf: req.body.userCpf
    });
    user.save();
    
    res.status(201).json({
        message: 'User added successfully.'
    });
})

module.exports = app;