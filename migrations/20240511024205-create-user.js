/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isNumeric: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      resetpasswordtoken: {
        type: Sequelize.STRING
      },
      resetpasswordexpires: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addConstraint('users', {
        fields: ['role_id'],
        type: 'foreign key',
        name: 'users_role_id_fkey',
        references: {
          table: 'roles',
          field: 'id'
        },
        onDelete: 'CASCADE'
      });
    });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('users', 'users_role_id_fkey');
    await queryInterface.dropTable('Users');
  }
};
