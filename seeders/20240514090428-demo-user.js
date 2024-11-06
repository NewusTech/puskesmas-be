
const passwordHash = require('password-hash');
const User = require('../models/User');

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
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test User',
        email: 'user.test@e-puskes.com',
        password: passwordHash.generate('password'),
        phone: '123456789xxx',
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    //use table name 'users' instead of User
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
