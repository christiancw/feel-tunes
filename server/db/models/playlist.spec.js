const { expect } = require('chai');
const db = require('../db');
const Playlist = db.model('playlist');

describe('Playlist model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('has a name and a tracks field', function(){
    return Playlist.create({
      name: 'super cool playlist',
      tracks: ['happy birthday', 'something']
  })
    .then(playlist => {
      expect(playlist.name).to.equal('super cool playlist');
      expect(playlist.tracks).to.be.an('array');
    });
  });

  it('requires a playlist to have at least one song', function () {

    const playlist = Playlist.build({
      name: 'Not cool playlist',
      tracks: []
    });

    return playlist.validate()
    .then(function(result) {
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain('Playlist contains no songs');
    });

  });

}); // end describe('Playlist model')
