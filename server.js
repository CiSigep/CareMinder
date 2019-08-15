require("dotenv").config();
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var db = require("./models");
var passport = require("passport");
var flash = require("connect-flash");

require("./config/passport.js")(passport);

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//set up our express application

app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );

  next();
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      section: function(name, options) {
        if (!this._sections) {
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  })
);
app.set("view engine", "handlebars");

// Routes

app.use(
  session({
    secret: "some-secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

var loginRoutes = require("./controllers/loginController")(
  express.Router(),
  passport
);

//var loginRoutes = require("./controllers/loginController");

app.use(loginRoutes);
var patientRoutes = require("./controllers/patientController");
app.use(patientRoutes);
//require("./app/routes.js")(app, passport);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

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
