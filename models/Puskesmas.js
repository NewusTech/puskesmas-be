const { DataTypes, Sequelize } = require('sequelize')
const db = require('.')

const Puskesmas = db.define(
  'Puskesmas',
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kota: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kelurahan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'puskesmas',
    modelName: 'Puskesmas',
    timestamps: true
  }
)

module.exports = Puskesmas
