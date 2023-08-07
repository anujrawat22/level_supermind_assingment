const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");



const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM, 
    values: ['user', 'admin','author'], 
    defaultValue: 'user', 
    allowNull: false,
  },
});




module.exports = { User };
