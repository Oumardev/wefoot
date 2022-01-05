'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      physique: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      technique: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      frappe: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      assiduite: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      fairPlay: {
        type: Sequelize.FLOAT,
        allowNull:false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notes');
  }
};