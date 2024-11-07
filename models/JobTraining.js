const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const JobTraining = db.define(
  'JobTraining',
  {
    nama_pelatihan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kode_pelatihan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tempat_pelatihan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggal_pelatihan: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lama_pelatihan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_jpl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'job_training',
    modelName: 'JobTraining',
    timestamps: false
  }
)

Employee.hasMany(JobTraining, { foreignKey: 'employee_id', sourceKey: 'id' })
JobTraining.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = JobTraining
