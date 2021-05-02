const express = require('express');

const User = require('../models/user');
const Movie = require('../models/movie');
const checkAuth = require('../middleware/check-auth')

const router = express.Router();
router.use(express.json());

router.get('/list', (req, res, next) => {
 //Find all
});

router.get('/list/:id', (req, res, next) => {

    User.findById(req.params.id)
        .then(user => {

            if (user) {
                if (user.moviesId){
                    res.status(200).json(user.moviesId);
                } else {
                    res.status(200).json('Movie list is empty');
                }
            } else {
                res.status(404).json({
                    message: 'User not found.'
                });
            }
        });
});

router.post('/:id', (req, res, next) => {
    const data = {
        movieId: req.body.movieId,
        userId: req.body.userId
    }
    console.log(data);
    User.updateOne(
            { _id: data.userId },
            { $push: {moviesId: data.movieId} } 
        )
        .then((response) => {
            res.status(200).json({
                message: 'Movie added.'
            });
        });  
    
});


module.exports = router;