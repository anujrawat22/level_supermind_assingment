const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { User } = require("./userModel");
const { BlogPost } = require("./blogModel");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

Comment.belongsTo(User, { foreignKey: "userId", allowNull: false });
Comment.belongsTo(BlogPost, { foreignKey: "blogpostId", allowNull: false });

module.exports = { Comment };
