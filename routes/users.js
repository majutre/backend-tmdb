const express = require('express');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth')

const router = express.Router();
router.use(express.json());


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

router.put('/:id', checkAuth, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            console.log(user);
            res.status(200).json({
                message: 'Update successful.'
            });
        });
});

router.post('/signup', (req, res, next) => {
    const user = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userCpf: req.body.userCpf
    });

    user.save()
        .then(newUser => {
            res.status(201).json({
                message: 'User added successfully.',
                newUser: newUser
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

router.post('/login', (req, res, next) => {
    User.findOne({ id: req.body.userEmail })
        .then(user => {
            
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            
            const token = jwt.sign({
                    userId: user._id,
                    email: user.email,
                    cpf: user.cpf
                },
                'secret_token_that_should_be_long', 
                { expiresIn: '1h'}
            );

            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: user._id
            });

        })
        .catch(err => {
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
});


router.delete('/:id', checkAuth, (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then(result => {
    
        res.status(200).json({
            message: 'User deleted.'
        });
    });
});



module.exports = router;