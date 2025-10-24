'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Equipment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      serial_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      acquisition_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('available', 'in_use', 'maintenance', 'retired'),
        defaultValue: 'available'
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      responsible_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
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
    await queryInterface.dropTable('Equipment');
  }
};