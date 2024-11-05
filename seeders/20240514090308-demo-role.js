module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Roles = [
      {
        name: 'Super Admin'
      },
      {
        name: 'Admin'
      },
      {
        name: 'User'
      }
    ];

    await queryInterface.bulkInsert('Roles', Roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
