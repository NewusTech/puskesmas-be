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
    await queryInterface.createTable('children', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
        allowNull: true
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('L', 'P'),
        allowNull: true
      },
      family_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'families',
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
    await queryInterface.dropTable('children')
  }
};
