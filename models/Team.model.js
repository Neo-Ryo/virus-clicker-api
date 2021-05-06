require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Team = sequelize.define('Team', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Team;
