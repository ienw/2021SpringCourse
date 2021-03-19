'use strict';
// catRoute
const express = require('express');
const {cat_list_get, cat_get, cat_create_post} = require('../controllers/catController');
const router = express.Router();

const multer = require('multer');
const upload = multer({dest: 'uploads/'});
 

router.get('/', cat_list_get); 
 
router.get('/:id', cat_get);

router.post('/', upload.single('cat'), cat_create_post);

/*
router.get('/', (req, res) => { //this is the root of cat route
    res.send('From this endpoint you can get cats.')
  });
*/


router.post('/', cat_create_post);

router.put('/', (req, res) => { 
    res.send('From this endpoint you can modify cats.')
  });

router.delete('/', (req, res) => { 
    res.send('From this endpoint you can delete cats.')
  });


module.exports = router;