const db = require('.')
const { DataTypes } = require('sequelize')

const Role = db.define(
  'Roles', // table name
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
)

module.exports = Role
