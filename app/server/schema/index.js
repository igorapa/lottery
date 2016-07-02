import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} from 'graphql-relay';

let Schema = (db) => {
  let viewer = {};
  let viewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
      megasenaConnection: {
        type: megasenaConnection.connectionType,
        args: connectionArgs,
        resolve: (_, args) => {
          const {first} = args;
          const data = db.collection('megasena').find({}).sort({"_id":-1}).toArray();
          const connection = connectionFromPromisedArray(data, args)
          return connection;
        }
      }
    })
  })

  let megasenaType = new GraphQLObjectType({
    name: 'MegaSena',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id
      },
      Concurso: {type: GraphQLInt},
      Valor_Acumulado: {type: GraphQLString}
    })
  });

  let megasenaConnection = connectionDefinitions({
    name: 'Megasena',
    nodeType: megasenaType
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'MainQuery',
      fields: () => ({
        viewer: {
          type: viewerType,
          resolve: () => viewer
        }
      })
    }),
  });

  return schema;
}

export default Schema;

