require('dotenv').config();
const pg = require('pg');
const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    host: process.env.DATABASE_URL,
    native: true,
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
  });
}
