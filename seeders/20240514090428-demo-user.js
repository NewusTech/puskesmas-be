const { name } = require('ejs');
const passwordHash = require('password-hash');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: 'Test Super Admin',
        email: 'super.test@e-puskes.com',
        password: passwordHash.generate('password'),
        phone: '123456789xxx',
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test Admin',
        email: 'admin.test@e-puskes.com',
        password: passwordHash.generate('password'),
        phone: '123456789xxx',
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test User',
        email: 'user.test@e-puskes.com',
        password: passwordHash.generate('password'),
        phone: '123456789xxx',
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
