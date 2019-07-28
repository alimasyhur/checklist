'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      is_completed: {
        type: Sequelize.BOOLEAN
      },
      completed_at: {
        type: Sequelize.STRING
      },
      due: {
        type: Sequelize.STRING
      },
      due_interval: {
        type: Sequelize.INTEGER
      },
      due_unit: {
        type: Sequelize.ENUM('minute','hour','day','week','month')
      },
      urgency: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING
      },
      assignee_id: {
        type: Sequelize.STRING
      },
      checklist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'checklists',
          key: 'id'
        }
      },
      task_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('items');
  }
};
