import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

let app = express();
app.use(express.static('dist'));

(async () => {
  try {
    let db = await MongoClient.connect('mongodb://localhost:27017/lottery');
    let schema = Schema(db);

    app.use('/graphql', GraphQLHTTP({schema, graphiql: true}));
    app.listen(3000, () => console.log('listening on port 3000'));

    let json = await graphql(schema, introspectionQuery);
    fs.writeFile(__dirname + '/data/schema.json', JSON.stringify(json, null, 2), error => {
      if (error) throw error;

      console.log("JSON schema created");
    });
  } catch(error) {
    console.log(error);
  }
})();

