'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checklist = sequelize.define('Checklist', {
    object_domain: {
      type: DataTypes.STRING,
      allowNull: false
    },
    object_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    completed_at: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    due: {
      type: DataTypes.STRING,
      allowNull: true
    },
    due_interval: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    due_unit: {
      type: DataTypes.ENUM('minute','hour','day','week','month'),
      allowNull: true
    },
    urgency: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    template_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Checklist.associate = function(models) {
    Checklist.hasMany(models.Item);
    Checklist.belongsTo(models.User);
  };
  return Checklist;
};
