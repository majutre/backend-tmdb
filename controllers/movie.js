
const User = require('../models/user');

// exports.findAll = (req, res, next) => {
//  //Find all
// };

exports.getByUserId = (req, res, next) => {

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

};

exports.addToMovieList = (req, res, next) => {
    const data = {
        movieId: req.body.movieId,
        userId: req.body.userId
    }
   
    User.updateOne(
            { _id: data.userId },
            { $push: {moviesId: data.movieId} } 
        )
        .then((response) => {
            res.status(200).json({
                message: 'Movie added.'
            });
        });  
    
};
