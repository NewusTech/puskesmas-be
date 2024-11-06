const { DataTypes } = require('sequelize')
const db = require('.')

const Token = db.define(
  'Token',
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Tokens',
    timestamps: true
  }
)

module.exports = Token
