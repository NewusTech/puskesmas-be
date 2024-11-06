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

    await queryInterface.createTable('rooms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      kode_poli: {
        type: Sequelize.STRING,
        allowNull: true
      },
      instalasi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nama_poli: {
        type: Sequelize.STRING,
        allowNull: true
      },
      jenis_kunjungan: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mapping_pcare: {
        type: Sequelize.STRING,
        allowNull: true
      },
      default_apotek: {
        type: Sequelize.STRING,
        allowNull: true
      },
      default_alkes: {
        type: Sequelize.STRING,
        allowNull: true
      },
      panggil_apotek: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      panggil_lab: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      notif_skrin_lansia: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      status_ruangan: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      promotif_preventif: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      mcu: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      anamnesa: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      akses_ruangan: {
        type: Sequelize.JSONB,  // Using JSONB for JSON data type
        allowNull: true
      },
      puskesmas_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    })

    await queryInterface.addConstraint('rooms', {
      fields: ['puskesmas_id'],
      type: 'foreign key',
      name: 'room_puskesmas_id_fkey',
      references: {
        table: 'puskesmas',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('ruangan')
  }
};
