const { DataTypes } = require('sequelize')
const db = require('.')

const Token = db.define(
  'Tokens',
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = Token
