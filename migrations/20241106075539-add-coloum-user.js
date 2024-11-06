'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('users', 
    
    'puskesmas_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addConstraint('users', {
      fields: ['puskesmas_id'],
      type: 'foreign key',
      name: 'users_puskesmas_id_fkey',
      references: {
        table: 'puskesmas',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('users', 'pegawai', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('users', 'nama_pasien', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('users', 'izin_laporan', {
      type: Sequelize.JSONB,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'puskesmas_id');
    await queryInterface.removeColumn('users', 'pegawai');
    await queryInterface.removeColumn('users', 'nama_pasien');
    await queryInterface.removeColumn('users', 'izin_laporan');
  }
};
