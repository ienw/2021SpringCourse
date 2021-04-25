import jwt from 'jsonwebtoken';
import passport from 'passport';

import { localStrategy, jwtStrategy } from './strategies.js';

passport.use(localStrategy);
passport.use(jwtStrategy);

export const login = (req, res) => {
  console.log('rq', req.body);
  return new Promise((resolve, rej) => {
    passport.authenticate('local', {session: false}, async (err, user, info) => {
      try{
        console.log('controller info', info);
        if(err || !user) {
          rej(new Error(info.message));
        }
        return req.login(user, {session: false}, async (err) => {
          if (err) {
            rej(new Error(err));
          }
  
          const token = jwt.sign(user, process.env.DB_URL);
          resolve({user, token});
        });
      }
      catch (e) {
        rej(new Error(e))
      }
    })(req , res);
  });
};