const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const JobHistory = db.define(
  'JobHistory',
  {
    nama_jabatan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit_kerja: {
      type: DataTypes.STRING,
      allowNull: true
    },
    struktural: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eselon: {
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
    tableName: 'job_history',
    modelName: 'JobHistory',
    timestamps: false
  }
)

Employee.hasMany(JobHistory, { foreignKey: 'employee_id', sourceKey: 'id' })
JobHistory.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = JobHistory
