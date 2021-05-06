require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('User', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
