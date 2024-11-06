const { DataTypes } = require('sequelize')
const db = require('.')
const User = require('./User')

const UserData = db.define(
  'UserData',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'user_data',
    timestamps: false
  }
)
User.hasOne(UserData, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})
UserData.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = UserData
