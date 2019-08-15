var express = require("express");
var careDAO = require("../DAO/careDAO");
var router = express.Router();

router.get("/profile", isLoggedIn, function(req, res) {
  careDAO.getPatientsByCaregiverId(req.user.id, function(err, results) {
    if (err) {
      return res.status(500).end();
    }
    res.render("patient", {
      caregiver: req.user,
      Patients: results.rows
    });
  });
});

router.get("/main/:patientId?", isLoggedIn, function(req, res) {
  careDAO.getPatientsByCaregiverId(req.user.id, function(err, results) {
    if (err) {
      return res.status(500).end();
    }
    var selectedPatient = -1;

    if (req.params.patientId) {
      // Verify that we have this patient
      for (var i = 0; i < results.count; i++) {
        if (req.params.patientId === results.rows[i].id) {
          selectedPatient = results.rows[i].id;
        }
      }
    }

    res.render("calendar", {
      caregiver: req.user,
      Patients: results.rows,
      startingPatient: selectedPatient
    });
  });
});
//Route to find patient by id
router.get("/api/patient/:id", isLoggedIn, function(req, res) {
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

router.post("/api/patients", isLoggedIn, function(req, res) {
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
  careDAO.updateTask(req.params.id, req.body, function(err, results) {
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

router.put("/api/bill/:id", isLoggedIn, function(req, res) {
  careDAO.updateBill(req.params.id, req.body, function(err, results) {
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
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect("/");
}
module.exports = router;
