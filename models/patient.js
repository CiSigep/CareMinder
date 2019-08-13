module.exports = function(sequelize, DataTypes) {
  // Define a patient table with these properties.
  var Patient = sequelize.define("Patient", {
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
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
