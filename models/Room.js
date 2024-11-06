const { DataTypes, Sequelize } = require('sequelize')
const db = require('.')
const Puskesmas = require('./Puskesmas')

const Room = db.define(
  'Room',
  {
    kode_poli: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instalasi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nama_poli: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jenis_kunjungan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mapping_pcare: {
      type: DataTypes.STRING,
      allowNull: true
    },
    default_apotek: {
      type: DataTypes.STRING,
      allowNull: true
    },
    default_alkes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    panggil_apotek: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    panggil_lab: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    notif_skrin_lansia: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    status_ruangan: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    promotif_preventif: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mcu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    anamnesa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    akses_ruangan: {
      type: DataTypes.JSONB, // Using JSONB for JSON data type
      allowNull: true
    },
    puskesmas_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    }
  },
  {
    tableName: 'rooms',
    modelName: 'Room',
    timestamps: true
  }
)

Puskesmas.hasMany(Room, {
  foreignKey: 'puskesmas_id',
  sourceKey: 'id'
})

Room.belongsTo(Puskesmas, {
  foreignKey: 'puskesmas_id',
  targetKey: 'id'
})

module.exports = Room
