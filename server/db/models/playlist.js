const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('playlist', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  dateCreated: {
    type: Sequelize.DATE
  },
  tracks: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
});
