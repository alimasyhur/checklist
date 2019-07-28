'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', [{
      description: 'Demo Item 1',
      is_completed: false,
      completed_at: null,
      updated_by: null,
      due: null,
      due_interval: null,
      due_unit: null,
      urgency: 0,
      assignee_id: 1,
      checklist_id: 1,
      task_id: 1,
      user_id: 1,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Demo Item 2',
      is_completed: false,
      completed_at: null,
      updated_by: null,
      due: null,
      due_interval: null,
      due_unit: null,
      urgency: 0,
      assignee_id: 1,
      checklist_id: 1,
      task_id: 1,
      user_id: 1,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Demo Item 3',
      is_completed: false,
      completed_at: null,
      updated_by: null,
      due: null,
      due_interval: null,
      due_unit: null,
      urgency: 0,
      assignee_id: 1,
      checklist_id: 1,
      task_id: 1,
      user_id: 1,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  }
};
