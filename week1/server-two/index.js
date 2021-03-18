"use strict";
const express = require("express");
const app = express();
const port = 3000;
const pug = require('pug');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/catinfo", (req, res) => {
  const cat = { name: "Frank", age: 6, weight: 5 };
  res.json(cat);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

