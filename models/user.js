'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Checklist);
    User.hasMany(models.Item);
    User.hasMany(models.Template);
    User.hasMany(models.History);
  };
  return User;
};
