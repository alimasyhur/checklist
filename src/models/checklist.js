const checklist = (sequelize, DataTypes) => {
  const Checklist = sequelize.define('checklist', {
    object_domain: {
      type: DataTypes.STRING,
      validate: {
                  notEmpty: {
                    args: true,
                    msg: 'A Checklist has to have a object_domain'
                  }
                }
    },
    object_id: {
      type: DataTypes.STRING,
      validate: {
                  notEmpty: {
                    args: true,
                    msg: 'A Checklist has to have a object_id'
                  }
                }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
                  notEmpty: {
                    args: true,
                    msg: 'A Checklist has to have a description'
                  }
                }
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
     },
    completed_at: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.STRING },
    due: { type: DataTypes.STRING },
    due_interval: { type: DataTypes.INTEGER },
    due_unit: { type: DataTypes.STRING },
    urgency: { type: DataTypes.INTEGER },
  });

  Checklist.associate = models => {
    Checklist.hasMany(models.Item, { onDelete: 'CASCADE' });
    Checklist.belongsTo(models.User);
    Checklist.belongsTo(models.Template);
  };

  return Checklist;
};

export default checklist;
