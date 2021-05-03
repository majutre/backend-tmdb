const express = require('express');

const User = require('../models/user');
const MovieController = require('../controllers/movie')

const router = express.Router();
router.use(express.json());

// router.get('/list', MovieController.findAll);

router.get('/list/:id', MovieController.getByUserId);

router.post('/:id', MovieController.addToMovieList);

module.exports = router;