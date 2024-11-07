const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const GolonganHistory = db.define(
  'GolonganHistory',
  {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pangkat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    golongan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tmt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'golongan_history',
    modelName: 'GolonganHistory',
    timestamps: false
  }
)

Employee.hasMany(GolonganHistory, { foreignKey: 'employee_id', sourceKey: 'id' })
GolonganHistory.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = GolonganHistory
