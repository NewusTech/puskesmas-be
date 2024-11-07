const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const Award = db.define(
  'Award',
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 1900,
        max: new Date().getFullYear()
      }
    },
    instansi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'awards',
    modelName: 'Award',
    timestamps: false
  }
)

Employee.hasMany(Award, { foreignKey: 'employee_id', sourceKey: 'id' })
Award.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = Award
