const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const Sip = db.define(
  'Sip',
  {
    nomor_sip: {
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
    tableName: 'sips',
    modelName: 'Sip',
    timestamps: false
  }
)

Employee.hasMany(Sip, { foreignKey: 'employee_id', sourceKey: 'id' })
Sip.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = Sip
