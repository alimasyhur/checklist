'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('checklists', [{
      object_domain: 'demo_domain',
      object_id: '3',
      description: 'Demo Checklist',
      is_completed: false,
      completed_at: null,
      updated_by: null,
      due: null,
      due_interval: null,
      due_unit: null,
      urgency: 0,
      template_id: 1,
      user_id: 1,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('checklists', null, {});
  }
};
