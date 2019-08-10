module.exports = function(sequelize, DataTypes) {
  // Define a bill table with these properties.
  var Bill = sequelize.define("Bill", {
    payTo: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    due: DataTypes.DATE,
    interval: DataTypes.STRING,
    reason: DataTypes.STRING,
    repeats: DataTypes.BOOLEAN,
    paid: DataTypes.BOOLEAN
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
