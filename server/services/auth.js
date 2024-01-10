const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id)
    .then((user) => done(null, user))
    .catch((error) => done(error, null));
});

const strategy = new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    return UserModel.findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (!user || user.password !== password) {
          return done(null, false, 'Invalid credentials 2');
        }
        if (user.password === password) {
          return done(null, user);
        }
      })
      .catch((error) => done(error));
  }
);

passport.use(strategy);

const signup = ({ email, password, request }) => {
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  const newUser = new UserModel({ email, password });

  return UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error('Email in use');
      }
      return newUser.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        request.logIn(user, (error) => {
          if (error) {
            reject(error);
          }
          resolve(user);
        });
      });
    });
};

const login = ({ email, password, request }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (error, user) => {
      if (error || !user) {
        reject('Invalid credentials');
      }
      request.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
};

module.exports = { signup, login };
