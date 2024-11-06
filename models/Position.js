const { DataTypes } = require('sequelize')
const db = require('.')

const Position = db.define(
  'Position',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'position',
    modelName: 'Position',
    timestamps: false
  }
)

module.exports = Position
