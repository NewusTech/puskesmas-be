const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const WorkUnit = db.define(
  'WorkUnit',
  {
    pendidikan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kode_sdmk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pendidikan_tertinggi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kode_sdmk2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instansi_induk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tempat_kerja_sekarang: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unit_kerja: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mulai_kerja: {
      type: DataTypes.DATE,
      allowNull: true
    },
    kelurahan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kabupaten_kota: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'work_unit',
    modelName: 'WorkUnit',
    timestamps: false
  }
)

Employee.hasOne(WorkUnit, { foreignKey: 'employee_id', sourceKey: 'id' })
WorkUnit.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = WorkUnit
