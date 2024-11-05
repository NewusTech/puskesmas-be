const { DataTypes } = require('sequelize')
const db = require('.')

const User = db.define(
  'users', // table name
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
    userinfo_id: {
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
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
)

User.associate = (models) => {
  User.hasOne(models.Role, {
    foreignKey: 'role_id'
  })
  User.hasOne(models.UserData, {
    foreignKey: 'User_id'
  })
}

module.exports = User
