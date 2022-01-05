'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lieux: {
        type: Sequelize.STRING
      },
      duree: {
        type: Sequelize.STRING
      },
      heure: {
        type: Sequelize.STRING
      },
      mode: {
        type: Sequelize.STRING
      },
      prix: {
        type: Sequelize.STRING
      },
      gerantId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'gerants'
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('reservations');
  }
};