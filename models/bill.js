module.exports = function(sequelize, DataTypes) {
  // Define a bill table with these properties.
  var Bill = sequelize.define("Bill", {
    payTo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    due: {
      type: DataTypes.DATE,
      allowNull: false
    },
    interval: DataTypes.STRING,
    reason: DataTypes.STRING,
    repeats: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  // Associate the table with the patient.
  Bill.associate = function(models) {
    Bill.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bill;
};
