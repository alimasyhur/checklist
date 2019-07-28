'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
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
    created_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    assignee_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    checklist_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    Item.hasOne(models.Checklist);
    Item.belongsTo(models.User);
  };
  return Item;
};
