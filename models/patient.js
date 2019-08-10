module.exports = function(sequelize, DataTypes) {
  // Define a patient table with these properties.
  var Patient = sequelize.define("Patient", {
    age: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  });

  // Associate the patient table to belong to the caregiver and have
  // many tasks and bills.
  Patient.associate = function(models) {
    Patient.belongsTo(models.Caregiver, {
      foreignKey: {
        allowNull: false
      }
    });

    Patient.hasMany(models.Task, {
      onDelete: "cascade"
    });
    Patient.hasMany(models.Bill, {
      onDelete: "cascade"
    });
  };

  return Patient;
};
