import express from 'express';
import path from 'path';

const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen({ port: 3000 }, () => console.log("App running on localhost:3000"));