const express = require('express');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
router.use(express.json());


router.get('', UserController.findAll);

router.get('/:id', UserController.findById);

router.put('/:id', UserController.update);

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.delete('/:id', checkAuth, UserController.deleteById);


module.exports = router;