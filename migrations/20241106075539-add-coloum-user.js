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
