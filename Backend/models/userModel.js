const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const allowedRoles = ["admin", "user", "author"];

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
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ["user"],
    allowNull: false,
    validate: {
      isValidRole(value) {
        if (value.length === 0) {
          throw new Error("User must have at least one role.");
        }

        value.forEach((role) => {
          if (!allowedRoles.includes(role)) {
            throw new Error(`Invalid role: ${role}.`);
          }
        });
      },
    },
  },
});

module.exports = { User };
