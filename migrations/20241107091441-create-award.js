'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('awards', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nama : {
        type: Sequelize.STRING,
        allowNull: true
      },
      tahun: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          min: 1900,
          max: new Date().getFullYear()
        }
      },
      instansi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      employee_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('awards')
  }
};
