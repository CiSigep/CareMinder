var express = require("express");
var careDAO = require("../DAO/careDAO");
var router = express.Router();

router.get("/api/patient/:id", function (req, res) {
    res.json({ data: true });
});

router.get("/", function (req, res) {
    res.json({ data: true });
});

router.get("/api/pages??", function (req, res) {
    res.json({ data: true });
});

router.post("api/task", function (req, res) {
    res.json({ data: true });
});

router.post("api/bill", function (req, res) {
    res.json({ data: true });
});

router.delete("/api/task/:id", function (req, res) {
    res.json({ data: true });
});

router.delete("/api/bill/:id", function (req, res) {
    res.json({data: true});
});

    patient.deleteOne(condition, function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404.
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;