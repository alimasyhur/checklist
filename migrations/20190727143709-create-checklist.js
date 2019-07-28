'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('checklists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      object_domain: {
        type: Sequelize.STRING
      },
      object_id: {
        type: Sequelize.STRING
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
      updated_by: {
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
      template_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'templates',
          key: 'id'
        }
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
    return queryInterface.dropTable('checklists');
  }
};
