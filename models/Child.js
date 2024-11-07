const { DataTypes } = require('sequelize')
const db = require('.')
const Family = require('./Family')

const Child = db.define(
  'Child',
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jenis_kelamin: {
      type: DataTypes.ENUM('L', 'P'),
      allowNull: true
    },
    family_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'children',
    modelName: 'Child',
    timestamps: false
  }
)

Family.hasMany(Child, { foreignKey: 'family_id', sourceKey: 'id' })
Child.belongsTo(Family, { foreignKey: 'family_id', targetKey: 'id' })

module.exports = Child
