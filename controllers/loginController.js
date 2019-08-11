var express = require("express");
var careDAO = require("../DAO/careDAO");
var router = express.Router();

router.get(["/", "/login"], function(req, res) {
  res.json({ data: true });
});

router.get("/signup", function(req, res) {
  res.json({ data: true });
});

router.post("/login", function(req, res) {
  res.json({ data: true });
});

router.post("/signup", function(req, res) {
  res.json({ data: true });
});
module.exports = router;
