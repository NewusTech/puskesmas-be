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

    await queryInterface.createTable('education_bg', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      jenjang_pendidikan : {
        type: Sequelize.STRING,
        allowNull: false
      },
      kode_program_studi : {
        type: Sequelize.STRING,
        allowNull: false
      },
      kode_sekolah : {
        type: Sequelize.STRING,
        allowNull: false
      },
      tahun_lulus : {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 1900,
          max: new Date().getFullYear()
        }
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
    await queryInterface.dropTable('education_bg')
  }
};
