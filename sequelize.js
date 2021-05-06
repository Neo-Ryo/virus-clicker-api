require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false,
});

module.exports = sequelize;
