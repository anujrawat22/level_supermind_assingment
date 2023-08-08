const Sequelize = require("sequelize");
require('dotenv').config()
const username = process.env.name
const password = process.env.password
const database = process.env.database
const host = process.env.host

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql'
});
  

module.exports = { sequelize };
