const db = require('.')
const { DataTypes } = require('sequelize')

const Role = db.define(
  'Role', // table name
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Roles',
    timestamps: false
  }
)

module.exports = Role
