'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('employees',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nama: {
          type: Sequelize.STRING,
          allowNull: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        alamat: {
          type: Sequelize.STRING,
          allowNull: true
        },
        id_pegawai: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nik: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nomor_ihs: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nip_nrp: {
          type: Sequelize.STRING,
          allowNull: true
        },
        nomor_seri_pegawai: {
          type: Sequelize.STRING,
          allowNull: true
        },
        gelar_depan: {
          type: Sequelize.STRING,
        allowNull: true
        },
        gelar_belakang: {
          type: Sequelize.STRING,
          allowNull: true
        },
        kelamin: {
          type: Sequelize.STRING,
          allowNull: true
        },
        tempat_lahir: {
          type: Sequelize.STRING,
          allowNull: true
        },
        tanggal_lahir: {
          type: Sequelize.DATE,
          allowNull: true
        },
        agama: {
          type: Sequelize.STRING,
          allowNull: true
        },
        status_pernikahan: {
          type: Sequelize.STRING,
          allowNull: true
        },
        tanggal_berlaku_str: {
          type: Sequelize.DATE,
          allowNull: true
        },
        tanggal_berlaku_sip: {
          type: Sequelize.DATE,
          allowNull: true
        },
        tanggal_berlaku_sik: {
          type: Sequelize.DATE,
          allowNull: true
        },
        puskesmas_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'puskesmas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW')
        }
      })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('employees')
  }
};
