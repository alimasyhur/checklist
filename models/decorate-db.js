'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const modelPath = path.join(__dirname, '../models');

module.exports = function (sequelize) {

  const db = {};

  fs
    .readdirSync(modelPath)
    .filter(file => {
      return file.indexOf('.') === -1
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}
