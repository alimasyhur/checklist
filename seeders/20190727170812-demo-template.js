'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('templates', [{
      name: 'Demo Template',
      checklist: 'checklsit',
      items: 'items',
      user_id: 1,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('templates', null, {});
  }
};
