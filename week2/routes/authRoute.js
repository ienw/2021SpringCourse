'use strict';
// autjRoute
const express = require('express');
const {login} = require('../controllers/authController');
const {user_create_post} = require('../controllers/userController');
const router = express.Router();

router.post('/', user_create_post);

router.post('/login', login);



module.exports = router;