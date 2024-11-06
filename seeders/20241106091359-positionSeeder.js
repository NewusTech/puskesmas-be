'use strict';

const { name } = require('ejs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const ListPosition = [
      { "name": "NON MEDIS" },
      { "name": "TENAGA GIZI" },
      { "name": "TENAGA KEFARMASIAN" },
      { "name": "TENAGA KEPERAWATAN" },
      { "name": "TENAGA KESEHATAN MASYARAKAT" },
      { "name": "TENAGA KETEKNISIAN MEDIS" },
      { "name": "TENAGA KETERAMPILAN FISIK" },
      { "name": "TENAGA MEDIS" }
    ]

    await queryInterface.bulkInsert('position', ListPosition, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('position', null, {});
  }
};
