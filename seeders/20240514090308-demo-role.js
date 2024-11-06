module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Roles = [
      {
        name: 'Admin'
      },
      {
        name: 'Super Admin'
      },
    ];

    await queryInterface.bulkInsert('roles', Roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
