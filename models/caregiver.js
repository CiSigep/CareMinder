module.exports = function(sequelize, Datatypes) {
  // Define a caregiver table with these properties.
  var Caregiver = sequelize.define("Caregiver", {
    firstName: Datatypes.STRING,
    lastName: Datatypes.STRING,
    username: Datatypes.STRING,
    password: Datatypes.STRING,
    email: Datatypes.STRING
  });

  // Associate the caregiver table to have many patients.
  Caregiver.associate = function(models) {
    Caregiver.hasMany(models.Patient);
  };

  return Caregiver;
};
