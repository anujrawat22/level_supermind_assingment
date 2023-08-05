const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "database_name",
  "database_user",
  "database_password",
  {
    host: "your_mysql_host",
    dialect: "mysql",
  }
);

module.exports = { sequelize };
