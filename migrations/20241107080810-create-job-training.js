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
    await queryInterface.createTable('job_training', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nama_pelatihan : {
        type: Sequelize.STRING,
        allowNull: false
      },
      kode_pelatihan : {
        type: Sequelize.STRING,
        allowNull: false
      },
      tempat_pelatihan : {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggal_pelatihan : {
        type: Sequelize.DATE,
        allowNull: false
      },
      lama_pelatihan : {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_jpl: {
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
  }
};
