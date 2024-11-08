const { DataTypes, Sequelize } = require('sequelize')
const db = require('.')
const Puskesmas = require('./Puskesmas')

const Employee = db.define(
  'Employee',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_pegawai: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nomor_ihs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nip_nrp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nomor_seri_pegawai: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gelar_depan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gelar_belakang: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kelamin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tempat_lahir: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: true
    },
    agama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_pernikahan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_berlaku_str: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanggal_berlaku_sip: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanggal_berlaku_sik: {
      type: DataTypes.DATE,
      allowNull: true
    },
    puskesmas_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    }
  },
  {
    tableName: 'employees',
    modelName: 'Employee',
    timestamps: true
  }
)

Puskesmas.hasMany(Employee, { foreignKey: 'puskesmas_id', sourceKey: 'id' })
Employee.belongsTo(Puskesmas, { foreignKey: 'puskesmas_id', targetKey: 'id' })

module.exports = Employee
