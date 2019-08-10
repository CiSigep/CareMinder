var db = require("../models");

function basePromiseCall(callback) {
  return function(results) {
    callback(null, results);
  };
}

function basePromiseErr(callback) {
  return function(err) {
    callback(err);
  };
}

module.exports = {
  // Creates a caregiver
  createCaregiver: function(caregiver, callback) {
    db.Caregiver.create(caregiver)
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Gets a caregiver by their username and password. Includes associated patients.
  getCaregiverByUsernameAndPassword: function(username, password, callback) {
    db.Caregiver.findOne({
      where: {
        username: username,
        password: password
      },
      include: [db.Patient]
    })
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Creates a patient.
  createPatient: function(patient, callback) {
    db.Patient.create(patient)
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Gets a patient by their id. Includes Tasks and Bills.
  getPatientById: function(id, callback) {
    db.Patient.findOne({
      where: {
        id: id
      },
      include: [db.Task, db.Bill]
    })
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Updates a patient selected by their id.
  updatePatient: function(patient, callback) {
    db.Patient.update(patient, {
      where: {
        id: patient.id
      }
    })
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Creates a task for a patient.
  createTask: function(task, callback) {
    db.Task.create(task)
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Updates a patient's task
  updateTask: function(task, callback) {
    db.Task.update(task, {
      where: {
        id: task.id
      }
    })
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Deletes a task selected by its id.
  deleteTaskById: function(taskId, callback) {
    db.Task.destroy({
      where: {
        id: taskId
      }
    })
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Creates a bill for the patient.
  createBill: function(bill, callback) {
    db.Bill.create(bill)
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Updates a bill selected by its id.
  updateBill: function(bill, callback) {
    db.Bill.update(bill, {
      where: {
        id: bill.id
      }
    })
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  },
  // Deletes a bill selected by its id.
  deleteBillById: function(billId, callback) {
    db.Bill.destroy({
      where: {
        id: billId
      }
    })
      .then(basePromiseCall(callback))
      .catch(basePromiseErr(callback));
  }
};
