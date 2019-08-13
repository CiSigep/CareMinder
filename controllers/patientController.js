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
  careDAO.getPatientById(req.params.id,function(err,results){
    if(err){
      return res.status(500).end();
      
    }
    else if (results){
      return res.json(results);
    }
 else {
   return res.status(404).end();
 }
  });
  


  /* db.Patient.findAll({where:{id:req.params.id}}).then(function(data){
    console.log(data[0].dataValues);
    res.json(data[0].dataValues);

  }); */
  //res.json({ data: true });
});

router.get("/api/pages??", function(req, res) {
  res.json({  });
});

router.post("/api/task", function(req, res) {
 
careDAO.createTask(req.body, function(err,results){
  if(err){
    return res.status(500).end(); }
  return res.status(201).json(results);
  
});

 
});

router.post("api/bill", function(req, res) {
  careDAO.createBill(req.body, function(err,results){
    if(err){
      return res.status(500).end(); }
    return res.status(201).json(results);
    
  });
});

router.delete("/api/task/:id", function(req, res) {
  careDAO.deleteTaskById(req.params.id,function(err, results){
    if (err) {
      return res.status(500).end(); 
   
    }
    if (results.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404.
      return res.status(404).end();
  } else {
      res.status(200).end();
  }
  })
});

router.delete("/api/bill/:id", function(req, res) {
  careDAO.deleteBillById(req.params.id,function(err, results){
    if (err) {
      return res.status(500).end(); 
   
    }
    if (results.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404.
      return res.status(404).end();
  } else {
      res.status(200).end();
  }
  })
});

router.put("/api/task/:id", function(req, res) {
  res.json({ data: true });
});

router.put("/api/bill/:id", function(req, res) {
  res.json({ data: true });
});

module.exports = router;
