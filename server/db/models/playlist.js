const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('playlist', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  dateCreated: {
    type: Sequelize.DATE
  },
  tracks: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    validate: { min: 1}
  },
}, {
  validate: {
    playlistMinLength() {
      if (this.tracks.length < 1) {
        throw new Error('Playlist contains no songs')
      }
    }
  }
});
