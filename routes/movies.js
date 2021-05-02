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

    User.findOne(req.params.id)
        .populate('movies')
        .exec((err, user) => {
            if (err) {
                console.log(err);
            }
            console.log(movies)

            res.status(201).json(user);
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