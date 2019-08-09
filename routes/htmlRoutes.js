var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log(db);

    res.json({ data: true });

    /* db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    }); */
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    console.log(db);

    res.json({ data: true });

    /* db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dataExample
    ) {
      res.render("example", {
        example: dataExample
      });
    }); */
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
