var express = require("express");
var careDAO = require("../DAO/careDAO");
var router = express.Router();

router.get("/patient/:id", function(req, res) {
  res.json({ data: true });
});

router.get("/api/pages??", function(req, res) {
  res.json({ data: true });
});

router.post("api/task", function(req, res) {
  res.json({ data: true });
});

router.post("api/bill", function(req, res) {
  res.json({ data: true });
});

router.delete("/api/task/:id", function(req, res) {
  res.json({ data: true });
});

router.delete("/api/bill/:id", function(req, res) {
  res.json({ data: true });
});

router.put("/api/task/:id", function(req, res) {
  res.json({ data: true });
});

router.put("/api/bill/:id", function(req, res) {
  res.json({ data: true });
});

module.exports = router;
