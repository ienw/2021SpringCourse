'use strict';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import schemas from './schemas.js';
import resolvers from './resolvers.js';
import db from './db.js';
import jwt from 'jsonwebtoken';

const checkAuth = (req, res) => {
   return new Promise((resolve, reject) => {
      
      /* TODO
         first: Make login endpoint that gives token to client (in resolvers)
         1. Look for a token in req object  DONE
         2. Validate that token is valid DONE
         3. Figure out the user from token DONE
         4. return the user DONE
      */
      
      // step 1
      const token = req.headers.token;

      if (!token) {
         resolve(null);
      }

      try {
         // step 2 and 3
         const user = jwt.verify(token, "asd123");
         // step 4
         resolve(user)
      } catch(e) {
         resolve(null)
      }
   });
};

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

