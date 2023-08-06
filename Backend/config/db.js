const Sequelize = require("sequelize");
require('dotenv').config()
const username = process.env.name
const password = process.env.password

const sequelize = new Sequelize('superminddb', username, password, {
  host: 'database-1.cml5tjlvnix4.ap-south-1.rds.amazonaws.com',
  dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});


module.exports = { sequelize };
