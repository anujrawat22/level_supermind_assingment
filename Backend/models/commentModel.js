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
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(BlogPost, { foreignKey: "blog_post_id" });

module.exports = { Comment };
