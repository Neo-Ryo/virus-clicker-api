require('dotenv').config();

const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (process.env.DATABASE_URL) {
  module.exports = new Sequelize({
    dialect: 'postgres',
    host: process.env.HOST,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    username: process.env.USER,
    database: process.env.DATABASE_URL,
  });
} else {
  module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
  });
}
