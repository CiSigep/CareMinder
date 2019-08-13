module.exports = function(sequelize, DataTypes) {
  // Define a task table with these properties.
  var Task = sequelize.define("Task", {
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    repeats: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    interval: DataTypes.STRING,
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false
    },
    notes: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
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
