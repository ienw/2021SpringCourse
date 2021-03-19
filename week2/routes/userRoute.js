'use strict';
// userRoute
const express = require('express');
const {user_list_get, user_get, user_create_post} = require('../controllers/userController');
const router = express.Router();

router.post('/', user_create_post);

router.get('/', user_list_get); 
 
router.get('/:id', user_get);

/*
router.get('/', (req, res) => { //this is the root of user route
    res.send('From this endpoint you can get users.')
  });
*/

router.get('/:id', (req, res) => { 
    res.send('You requested a user whose id is ' + req.params.id);
  });


router.post('/login', user_create_post);

router.put('/', (req, res) => { 
    res.send('From this endpoint you can modify users.')
  });

router.delete('/', (req, res) => { 
    res.send('From this endpoint you can delete users.')
  });


module.exports = router;