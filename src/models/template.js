const template = (sequelize, DataTypes) => {
  const Template = sequelize.define('template', {
    name: {
      type: DataTypes.STRING,
      validate: {
                  notEmpty: {
                    args: true,
                    msg: 'A Template has to have a name'
                  }
                }
    },
    checklist: {
      type: DataTypes.STRING,
      validate: {
                  notEmpty: {
                    args: true,
                    msg: 'A Template has to have a checklist'
                  }
                }
    },
    items: {
      type: DataTypes.STRING,
      validate: {
                  notEmpty: {
                    args: true,
                    msg: 'A Template has to have items'
                  }
                }
    },
  });

  Template.associate = models => {
    Template.belongsTo(models.User);
  };

  return Template;
};

export default template;
