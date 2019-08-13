require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
// var cookieParser = require("cookie-parser");
   var bodyParser = require("body-parser");
// var morgan = require("morgan");
var db = require("./models");
//var passport = require("passport");
//var flash = require("connect-flash");
var patientRoutes = require("./controllers/patientController");
// connect to our database
//require("./config/passport.js")(passport);

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//set up our express application
// app.use(morgan("dev")); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
  next();
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes

var loginRoutes = require("./controllers/loginController");
app.use(loginRoutes);
app.use(patientRoutes);
//require("./app/routes.js")(app, passport);

// required for passport
// app.use(
//   session({
//     secret: "some-secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );
// session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
//app.get("/test",function (req,res){
//res.send("hello test")
//})
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
//console.log("The magic happens on port " + port);
