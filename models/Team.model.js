const { Sequelize, Datatypes } = require('sequelize');
const sequelize = require('../sequelize');

const Team = sequelize.define('Team', {
  uuid: {
    type: Datatypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Datatypes.STRING,
    allowNull: false,
  },
  logo: {
    type: Datatypes.STRING,
    allowNull: false,
  },
});

module.exports = Team;
