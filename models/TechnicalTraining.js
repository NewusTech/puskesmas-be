const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const TechnicalTraining = db.define(
  'TechnicalTraining',
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
    penyelenggara: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'technical_training',
    modelName: 'TechnicalTraining',
    timestamps: false
  }
)

Employee.hasMany(TechnicalTraining, { foreignKey: 'employee_id', sourceKey: 'id' })
TechnicalTraining.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = TechnicalTraining
