require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;
const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    native: true,
    protocol: 'postgres',
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
