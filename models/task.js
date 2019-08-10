module.exports = function(sequelize, DataTypes) {
  // Define a task table with these properties.
  var Task = sequelize.define("Task", {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    repeats: DataTypes.BOOLEAN,
    interval: DataTypes.STRING,
    priority: DataTypes.ENUM("Low", "Medium", "High"),
    notes: DataTypes.STRING,
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  });

  // Associate the table with the patient.
  Task.associate = function(models) {
    Task.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
