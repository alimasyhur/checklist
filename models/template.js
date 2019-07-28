'use strict';
module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('Template', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    checklist: DataTypes.STRING,
    items: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Template.associate = function(models) {
    Template.belongsTo(models.User);
  };
  return Template;
};
