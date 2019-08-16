var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");
var careDAO = require("../DAO/careDAO");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    careDAO.getCaregiverById(id, function(err, results) {
      done(err, results);
    });
  });
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        careDAO.getCaregiverByUsername(username, function(err, results) {
          if (err) {
            return done(err);
          }
          if (results) {
            return done(
              null,
              false,
              req.flash("signupMessage", "That username is already taken.")
            );
          } else {
            var newUser = req.body;
            newUser.password = bcrypt.hashSync(password, null, null);

            careDAO.createCaregiver(newUser, function(err, results) {
              if (err) {
                return done(err);
              }

              newUser.id = results.id;

              return done(null, newUser);
            });
          }
        });
      }
    )
  );
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, username, password, done) {
        careDAO.getCaregiverByUsername(username, function(err, result) {
          if (err) {
            return done(err);
          }
          if (!result) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Username and password are incorrect.")
            );
          } else {
            if (!bcrypt.compareSync(password, result.password)) {
              return done(
                null,
                false,
                req.flash(
                  "loginMessage",
                  "Username and password are incorrect."
                )
              );
            }

            return done(null, result);
          }
        });
      }
    )
  );
};
