const { DataTypes } = require('sequelize')
const db = require('.')
const Position = require('./Position')

const SubPosition = db.define(
  'SubPosition',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    posstion_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'sub_position',
    modelName: 'SubPosition',
    timestamps: false
  }
)

Position.hasMany(SubPosition, {
  foreignKey: 'position_id',
  sourceKey: 'id'
})

SubPosition.belongsTo(Position, {
  foreignKey: 'position_id',
  sourceKey: 'id'
})

module.exports = SubPosition
