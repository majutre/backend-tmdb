const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]; //'Bearer <token>'
        jwt.verify(token, 'secret_token_that_should_be_long');
        next();
    } catch (error){
        res.status(401).json({ message: 'Auth failed.' })
    }


};