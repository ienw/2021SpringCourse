import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import checkAuth from './passport/checkAuth.js';
import db from './db.js'

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({req, res}) => {
        if (req) {
          const user = await checkAuth(req, res);
          // console.log('app', user);
          return {
            req,
            res,
            user,
          };
        }
      },
    });

  
    const app = express();
    server.applyMiddleware({app});

    app.listen({port: 3000}, () =>
        console.log(
            `🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
    );
  } catch (e) {
     console.log('server error: ' + e.message);
  }
})();

