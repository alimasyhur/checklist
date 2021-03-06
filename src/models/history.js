const history = (sequelize, DataTypes) => {
    const History = sequelize.define('history', {
        loggable_type: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A History has to have a loggable_type'
                }
            }
        },
        loggable_id: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A History has to have a loggable_id'
                }
            }
        },
        action: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A History has to have action'
                }
            }
        },
        value: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: {
                    args: false,
                    msg: 'A History has to have action'
                }
            }
        },
        kwuid: {
            type: DataTypes.INTEGER
        }
    });

    History.associate = models => {
        History.belongsTo(models.User);
    };

    return History;
};

export default history;
