const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const Family = db.define(
  'Family',
  {
    nama_pasangan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanggal_nikah: {
      type: DataTypes.DATE,
      allowNull: true
    },
    pekerjaan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  },
  {
    tableName: 'families',
    modelName: 'Family',
    timestamps: false
  }
)

Employee.hasOne(Family, { foreignKey: 'employee_id', sourceKey: 'id' })
Family.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })
module.exports = Family
