import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql';

let Schema = (db) => {
  let viewer = {};

  let viewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
      megasena: {
        type: new GraphQLList(megasenaType),
        resolve: () => db.collection('megasena').find({}).toArray()
      }
    })
  })

  let megasenaType = new GraphQLObjectType({
    name: 'MegaSena',
    fields: () => ({
      _id: {type: GraphQLString},
      Concurso: {type: GraphQLInt},
      Valor_Acumulado: {type: GraphQLString}
    })
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
    })
  });

  return schema;
}

export default Schema;

