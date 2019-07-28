'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('histories', [{
      loggable_type: 'templates',
      loggable_id: 1,
      action: 'store',
      kwuid: 1,
      value: "123",
      user_id: 1,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('histories', null, {});
  }
};
