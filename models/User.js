const { DataTypes } = require('sequelize')
const db = require('.')
const Role = require('../models/Role')
const Puskesmas = require('./Puskesmas')

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
    puskesmas_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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

Puskesmas.hasMany(User, {
  foreignKey: 'puskesmas_id',
  sourceKey: 'id'
})

User.belongsTo(Puskesmas, {
  foreignKey: 'puskesmas_id',
  sourceKey: 'id'
})

module.exports = User
