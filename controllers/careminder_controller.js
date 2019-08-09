var express = require("express");
// Import the model to use its db functions for index.js
var careminder = require("../models/index.js");

// Create the router for the app, and export the router at the end of your file.
var router = express.Router();
// Create routes and set up logic where required.
router.get("/", function (req, res) {
    careminder.selectAll(function(data) {
        var hbsObject = {
            careminder: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
// Add new patient to the db.
router.post("/api/careDb", function (req, res) {
    careminder.insertOne([], [req.body., req.body.], function(result) {
        // Send back the ID of the new patient
        res.json({ id: result.insertId });
    });
});

router.put("/api//:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    careminder.updateOne({ req.body. }, condition, function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Delete patient  from db.
router.delete("/api/careminder/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    careminder.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;