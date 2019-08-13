var express = require("express");
var careDAO = require("../DAO/careDAO");
var router = express.Router();
var db = require("../models/index.js");

//Route to find patient by id 
router.get("/patient/:id", function(req, res) {
  // var dummyPatient = {
  //   age: 55,
  //   firstName: "Rob",
  //   lastName: "Terry",
  //   gender: "Male",
  //   address: "155 2nd St ",
  //   phoneNumber: "401-3331"
  // }
  db.Patient.findAll({where:{id:req.params.id}}).then(function(data){
    console.log(data[0].dataValues);
    res.json(data[0].dataValues);

  });
  //res.json({ data: true });
});

router.get("/api/pages??", function(req, res) {
  res.json({  });
});

router.post("/api/task", function(req, res) {
 console.log(req.body);
 //db.task.findAll({where:{id:req.params.task}}).then(function(data){
  res.json(req.body);
 
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
