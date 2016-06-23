import express from 'express';
import {MongoClient} from 'mongodb';
import schema form './data/shema';

let app = express();
app.use(express.static('dist'));

let db;

MongoClient.connect('mongodb://localhost:27017/lottery', (error, database) => {
  if (error) throw error;

  db = database;
  app.listen(3000, () => console.log('listening on port 3000'));
});

app.get('/data/megasena', (request, response) => {
  db.collection('megasena').find({}).toArray((error, links) => {
    if (error) throw error;

    response.json(links);
  });
});

