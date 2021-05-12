require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Team = sequelize.define('Team', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Team;
