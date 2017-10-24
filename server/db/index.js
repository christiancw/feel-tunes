const db = require('./db');

// register models
require('./models');
const Playlist = require('./models/Playlist');
const User = require('./models/User');

Playlist.belongsTo(User);

module.exports = {
  db,
  Playlist,
  User
};
