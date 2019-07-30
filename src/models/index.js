import Sequelize from "sequelize"

const sequelize = new Sequelize(
  process.env.TEST_DATABASE || process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'mysql'
  },
)

const models = {
  sequelize: sequelize,
  User: sequelize.import('./user'),
  Template: sequelize.import('./template'),
  History: sequelize.import('./history'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize }

export default models;
