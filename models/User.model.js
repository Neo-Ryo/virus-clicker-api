const { Sequelize, Datatypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
  uuid: {
    type: Datatypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  pseudo: {
    type: Datatypes.STRING,
    allowNull: false,
  },
  team: {
    type: Datatypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
