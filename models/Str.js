const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const Str = db.define(
  'Str',
  {
    nomor_str: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_terbit: {
      type: DataTypes.DATE,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'strs',
    modelName: 'Str',
    timestamps: false
  }
)

Employee.hasMany(Str, { foreignKey: 'employee_id', sourceKey: 'id' })
Str.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = Str
