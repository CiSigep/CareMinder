var express = require("express");
var careDAO = require("../DAO/careDAO");
var router = express.Router();
//var db = require("../models/index.js");

//Route to find patient by id
router.get("/patient/:id", isLoggedIn, function(req, res) {
  careDAO.getPatientById(req.params.id, function(err, results) {
    if (err) {
      return res.status(500).end();
    } else if (results) {
      return res.json(results);
    } else {
      return res.status(404).end();
    }
  });
});

router.post("/api/task", isLoggedIn, function(req, res) {
  careDAO.createTask(req.body, function(err, results) {
    if (err) {
      return res.status(500).end();
    }
    return res.status(201).json(results);
  });
});

router.post("api/bill", isLoggedIn, function(req, res) {
  careDAO.createBill(req.body, function(err, results) {
    if (err) {
      return res.status(500).end();
    }
    return res.status(201).json(results);
  });
});

router.delete("/api/task/:id", isLoggedIn, function(req, res) {
  careDAO.deleteTaskById(req.params.id, function(err, results) {
    if (err) {
      return res.status(500).end();
    }
    if (results.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404.
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/bill/:id", isLoggedIn, function(req, res) {
  careDAO.deleteBillById(req.params.id, function(err, results) {
    if (err) {
      return res.status(500).end();
    }
    if (results.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404.
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.put("/api/task/:id", isLoggedIn, function(req, res) {
  res.json({ data: true });
});

router.put("/api/bill/:id", function(req, res) {
  res.json({ data: true });
});
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect("/");
}
module.exports = router;
