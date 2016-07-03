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
        resolve: (root) => {
          const { itemsPerPage } = root;
          const dbPromiseCount = root.db.collection('megasena').count();
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
        resolve: (root) => {
          const { itemsPerPage, page } = root;
          const test = root.db.collection('megasena')
                              .find({})
                              .sort({ _id: -1 })
                              .skip((page - 1) * itemsPerPage)
                              .limit(itemsPerPage)
                              .toArray();
          return test.then(data => data);
        },
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
        resolve: (a: db, args) => ({ db, ...args }),
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
