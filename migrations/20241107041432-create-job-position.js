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
    await queryInterface.createTable('job_position', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      sub_position_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sub_position',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jabatan :{
        type: Sequelize.STRING,
        allowNull: false
      },
      Status_kepegawaian : {
        type: Sequelize.STRING,
        allowNull: false
      },
      tmt_cpns : {
        type: Sequelize.DATE,
        allowNull: true
      },
      tmt_pns : {
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_mulai_tugas : {
        type: Sequelize.DATE,
        allowNull: false
      },
      tanggal_berakhir_tugas : {
        type: Sequelize.DATE,
        allowNull: true
      },
      jenis_kepegawaian : {
        type: Sequelize.STRING,
        allowNull: false
      },
      gologan_terakhir : {
        type: Sequelize.STRING,
        allowNull: true
      },
      tmt_golongan : {
        type: Sequelize.DATE,
        allowNull: true
      },
      masa_kerja_bulan : {
        type : Sequelize.INTEGER,
        allowNull: true
      },
      masa_kerja_tahun : {
        type : Sequelize.INTEGER,
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
    await queryInterface.dropTable('job_position')
  }
};
