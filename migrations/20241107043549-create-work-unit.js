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
    await queryInterface.createTable('work_unit', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      pendidikan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kode_sdmk: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pendidikan_tertinggi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      kode_sdmk2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      instansi_induk: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tempat_kerja_sekarang: {
        type: Sequelize.STRING,
        allowNull: true
      },
      unit_kerja: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mulai_kerja: {
        type: Sequelize.DATE,
        allowNull: true
      },
      kelurahan: {
        type: Sequelize.STRING,
        allowNull: true
      },
      kecamatan: {
        type: Sequelize.STRING,
        allowNull: true
      },
      kabupaten_kota: {
        type: Sequelize.STRING,
        allowNull: true
      },
      provinsi: {
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
    await queryInterface.dropTable('work_unit');
  }
};
