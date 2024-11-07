const { DataTypes } = require('sequelize')
const db = require('.')
const Employee = require('./Employee')

const EducationBg = db.define(
  'EducationBg',
  {
    jenjang_pendidikan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kode_program_studi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kode_sekolah: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tahun_lulus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1900,
        max: new Date().getFullYear()
      }
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'education_bg',
    modelName: 'EducationBg',
    timestamps: false
  }
)

Employee.hasMany(EducationBg, { foreignKey: 'employee_id', sourceKey: 'id' })
EducationBg.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' })

module.exports = EducationBg
