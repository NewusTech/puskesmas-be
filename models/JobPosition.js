const { DataTypes } = require('sequelize')
const db = require('.')
const SubPosition = require('./SUBPosition')
const Employee = require('./Employee')

const JobPosition = db.define(
  'JobPosition',
  {
    sub_position_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Status_kepegawaian: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tmt_cpns: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tmt_pns: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanggal_mulai_tugas: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tanggal_berakhir_tugas: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jenis_kepegawaian: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gologan_terakhir: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tmt_golongan: {
      type: DataTypes.DATE,
      allowNull: true
    },
    masa_kerja_bulan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    masa_kerja_tahun: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'job_position',
    modelName: 'JobPosition',
    timestamps: false
  }
)

SubPosition.hasMany(JobPosition, { foreignKey: 'sub_position_id', sourceKey: 'id' })
JobPosition.belongsTo(SubPosition, { foreignKey: 'sub_position_id', targetKey: 'id' })

Employee.hasOne(JobPosition, { foreignKey: 'employee_id', sourceKey: 'id' })
JobPosition.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = JobPosition
