const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { User } = require("./userModel");

const BlogPost = sequelize.define("BlogPost", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

BlogPost.belongsTo(User, { foreignKey: "authorId", allowNull: false });
User.hasMany(BlogPost, { foreignKey: "userId" });

module.exports = { BlogPost };
