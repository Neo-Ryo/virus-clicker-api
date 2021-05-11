require('dotenv').config();

const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (process.env.NODE_ENV === 'production') {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.USER,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  });
} else {
  module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
  });
}
