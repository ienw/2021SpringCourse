'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./route')

app.use(express.urlencoded({extended: false}));

app.use(routes);

db.on('connected', () => {
  app.listen(3000);
});
