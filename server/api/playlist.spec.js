var chai = require('chai')
  , chaiHttp = require('chai-http');
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const models = require('../db');
const db = models.db;
const Playlist = models.Playlist;
const User = models.User;
const utils = require('../utils');
const app = require('../../server');

chai.use(chaiHttp);

chai.request(app)
  .get('/')
