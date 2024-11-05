const { DataTypes } = require('sequelize')
const db = require('.')

const UserData = db.define(
  'user_data', // table name
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

UserData.associate = (models) => {
  UserData.belongsTo(models.User, {
    foreignKey: 'user_id'
  })
}

module.exports = UserData
