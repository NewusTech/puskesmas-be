'use strict';

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
   const positions = await queryInterface.sequelize.query(
    `SELECT id, name FROM position`
   )

   const positionRow = positions[0]

   const positionsMapping = {}

   positionRow.forEach(row => {
     positionsMapping[row.name] = row.id
   })

   const subPositionsData = [
      { name: 'Staf Non Medis', posstion_id: positionsMapping['NON MEDIS'] },
      { name: 'Nutrisionist dan Dietifisien', posstion_id: positionsMapping['TENAGA GIZI'] },
      { name: 'Apoteker', posstion_id: positionsMapping['TENAGA KEFARMASIAN'] },
      { name: 'Asisten Apoteker', posstion_id: positionsMapping['TENAGA KEFARMASIAN'] },
      { name: 'Analis Farmasi', posstion_id: positionsMapping['TENAGA KEFARMASIAN'] },
      { name: 'Perawat', posstion_id: positionsMapping['TENAGA KEPERAWATAN'] },
      { name: 'Perawat Gigi', posstion_id: positionsMapping['TENAGA KEPERAWATAN'] },
      { name: 'Perawat Anestesi', posstion_id: positionsMapping['TENAGA KEPERAWATAN'] },
      { name: 'Epidemiolog Kesehatan', posstion_id: positionsMapping['TENAGA KESEHATAN MASYARAKAT'] },
      { name: 'Entomolog Kesehatan', posstion_id: positionsMapping['TENAGA KESEHATAN MASYARAKAT'] },
      { name: 'Sanitarian', posstion_id: positionsMapping['TENAGA KESEHATAN MASYARAKAT'] },
      { name: 'Penyuluh Kesehatan', posstion_id: positionsMapping['TENAGA KESEHATAN MASYARAKAT'] },
      { name: 'Ahli Teknologi Laboratorium Medik', posstion_id: positionsMapping['TENAGA KETEKNISIAN MEDIS'] },
      { name: 'Radiografi', posstion_id: positionsMapping['TENAGA KETEKNISIAN MEDIS'] },
      { name: 'Teknisi Gigi', posstion_id: positionsMapping['TENAGA KETEKNISIAN MEDIS'] },
      { name: 'Teknisi Elektromedis', posstion_id: positionsMapping['TENAGA KETEKNISIAN MEDIS'] },
      { name: 'Refraksionis Optisien', posstion_id: positionsMapping['TENAGA KETEKNISIAN MEDIS'] },
      { name: 'Perekam Medis', posstion_id: positionsMapping['TENAGA KETEKNISIAN MEDIS'] },
      { name: 'Akupunktur Terapis', posstion_id: positionsMapping['TENAGA KETERAMPILAN FISIK'] },
      { name: 'Ortotik Prostetik', posstion_id: positionsMapping['TENAGA KETERAMPILAN FISIK'] },
      { name: 'Ahli Fisika Medik', posstion_id: positionsMapping['TENAGA KETERAMPILAN FISIK'] },
      { name: 'Paramedik Transfusi Darah', posstion_id: positionsMapping['TENAGA KETERAMPILAN FISIK'] },
      { name: 'Fisioterapis', posstion_id: positionsMapping['TENAGA KETERAMPILAN FISIK'] },
      { name: 'Okupasi Terapis', posstion_id: positionsMapping['TENAGA KETERAMPILAN FISIK'] },
      { name: 'Terapis Wicara', posstion_id: positionsMapping['TENAGA KETERAMPILAN FISIK'] },
      { name: 'Dokter Spesialis', posstion_id: positionsMapping['TENAGA MEDIS'] },
      { name: 'Dokter Umum', posstion_id: positionsMapping['TENAGA MEDIS'] },
      { name: 'Dokter Gigi', posstion_id: positionsMapping['TENAGA MEDIS'] }
   ]

    await queryInterface.bulkInsert('sub_position', subPositionsData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sub_position', null, {})
  }
};
