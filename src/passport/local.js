import passport from 'passport'
import { Strategy } from 'passport-local'
import { usersDao } from '../daos/index.js';
import { encryptPassword, comparePassword } from '../config/bcrypt.js';

const LocalStrategy = Strategy

passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, 
      },
      async (req, email, password, done) => {
        const user = await usersDao.findByEmail(email);
        if (user) {
          return done(null, false, { message: "User already exists" });
        }
        req.body.password = await encryptPassword(password);
        const newUser = await usersDao.create(req.body);
        return done(null, newUser);
      }
    )
  );
  
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, 
      },
      async (req, email, password, done) => {
        const user = await usersDao.findByEmail(email);
        if (!user) {
          return done(null, false, { message: "User doesn´t exists" });
        }
        const isTruePassword = await comparePassword(password, user.password);
        if (!isTruePassword) {
          return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user);
      }
    )
  );


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await usersDao.getOne(id);
    done(null, user);
  });
