module.exports = function(sequelize, DataTypes) {
  // Define a caregiver table with these properties.
  var Caregiver = sequelize.define("Caregiver", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Associate the caregiver table to have many patients.
  Caregiver.associate = function(models) {
    Caregiver.hasMany(models.Patient);
  };

  return Caregiver;
};
