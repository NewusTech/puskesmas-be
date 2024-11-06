const { DataTypes } = require('sequelize')
const db = require('.')
const Role = require('../models/Role')

const User = db.define(
  'users',

  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resetpasswordtoken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetpasswordexpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {

    tableName: 'users',
    timestamps: true
  }
)
Role.hasMany(User, {
  foreignKey: 'role_id',
  sourceKey: 'id'
})
User.belongsTo(Role, {
  foreignKey: 'role_id',
  sourceKey: 'id'
})

module.exports = User
