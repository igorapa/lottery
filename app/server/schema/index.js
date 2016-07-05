import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from 'graphql';

const Schema = (db) => {
  const PaginationType = new GraphQLObjectType({
    name: 'Pagination',
    fields: () => ({
      pages: {
        type: GraphQLInt,
        resolve: ({ database, itemsPerPage }) => {
          const dbPromiseCount = database.collection('megasena').count();
          return dbPromiseCount.then((data) => Math.ceil(data / itemsPerPage));
        },
      },
      page: {
        type: GraphQLInt,
        resolve: ({ page }) => page,
      },
      itemsPerPage: {
        type: GraphQLInt,
        resolve: ({ itemsPerPage }) => itemsPerPage,
      },
    }),
  });

  const GamesMegasenaType = new GraphQLObjectType({
    name: 'GamesMegasena',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id,
      },
      Concurso: { type: GraphQLInt },
      Valor_Acumulado: { type: GraphQLString },
    }),
  });

  const MegasenaType = new GraphQLObjectType({
    name: 'Megasena',
    fields: () => ({
      pagination: {
        type: PaginationType,
        resolve: (root) => root,
      },
      games: {
        type: new GraphQLList(GamesMegasenaType),
        resolve: ({ database, itemsPerPage, page }) => (
          database.collection('megasena')
                  .find({})
                  .sort({ _id: -1 })
                  .skip((page - 1) * itemsPerPage)
                  .limit(itemsPerPage)
                  .toArray()
                  .then(data => data)
        ),
      },
    }),
  });

  const viewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
      megasena: {
        args: {
          page: { type: new GraphQLNonNull(GraphQLInt) },
          itemsPerPage: { type: new GraphQLNonNull(GraphQLInt) },
        },
        type: MegasenaType,
        resolve: (database, args) => ({ database, ...args }),
      },
    }),
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'MainQuery',
      fields: () => ({
        viewer: {
          type: viewerType,
          resolve: () => db,
        },
      }),
    }),
  });

  return schema;
};

export default Schema;
