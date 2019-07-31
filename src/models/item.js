const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    description: {
      type: DataTypes.STRING,
      validate: {
                  notEmpty: {
                    args: true,
                    msg: 'An Item has to have a description'
                  }
                }
    },
    is_completed: { type: DataTypes.BOOLEAN },
    completed_at: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.STRING },
    due: { type: DataTypes.STRING },
    due_interval: { type: DataTypes.INTEGER },
    due_unit: { type: DataTypes.STRING },
    urgency: { type: DataTypes.INTEGER },
  });

  Item.associate = models => {
    Item.belongsTo(models.Checklist);
    Item.belongsTo(models.User);
  };

  return Item;
};

export default item;
