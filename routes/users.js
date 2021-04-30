const express = require('express');

const User = require('../models/user');

const router = express.Router();
router.use(express.json());

router.use((req, res, next) => {
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

router.get('', (req, res, next) => {
    User.find()
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {

            if (user) {
                console.log(user);
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: 'User not found.'
                });
            }
        });
});

router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            console.log(user);
            res.status(200).json({
                message: 'Update successful.'
            });
        });
});

router.post('', (req, res, next) => {
    const user = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userCpf: req.body.userCpf
    });
    user.save().then(newUser => {
        res.status(201).json({
            message: 'User added successfully.',
            userId: newUser._id
        });
    });

});

router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'User deleted.'
        });
    });
});

module.exports = router;