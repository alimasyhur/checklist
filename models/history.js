'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    loggable_type: DataTypes.STRING,
    loggable_id: DataTypes.INTEGER,
    action: DataTypes.STRING,
    kwuid: DataTypes.INTEGER,
    value: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  History.associate = function(models) {
    History.belongsTo(models.User);
  };
  return History;
};
