//var express = require("express");
//var careDAO = require("../DAO/careDAO");
//var router = express.Router();
var path = require("path");
module.exports = function(router, passport) {
  router.get(["/", "/login"], function(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "html", "signin.html"));
  });

  router.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "html", "signup.html"));
  });

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    function(req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  return router;
};
