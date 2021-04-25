import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';

import models from '../model.js';

export const localStrategy = new LocalStrategy(
  async function(username, password, done) {
    console.log("In local strategy", username, password);
    try {
      const user = await models.users.findOne({ username });
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      console.log("bcrypt comparing", password, user.password);
      const validate = await bcrypt.compare(password, user.password);
      console.log("validation result", validate);
      if(!validate){
        return done(null, false, {message: 'Incorrect password.'})
      }

      const plainUser = user.toObject();
      delete plainUser.password;

      return done(null, plainUser, { message: 'Authentication successfull'})
    } catch (err){
      return done(err);
    }
  }
);

export const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'asd123',
  },
  async (jwtPayload, done) => {
    try{
      const user = await models.users.findById(jwtPayload._id,
        '-password -__v');
      if(user !== null) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch(err) {
      return done(null, false);
    }
  }
)