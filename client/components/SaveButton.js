import React from 'react';

export default function SaveButton (props) {
  const handleSave = props.handleSave;
  const handlePlayListName = props.handlePlayListName;
  const playListName = props.playListName;

  console.log('savebutton props-->', props)

  return (
    <div className="save-button">
      <form
        onSubmit={handleSave}>
        <input
          className="playlist-name"
          placeholder="Give your playlist a name"
          onChange={handlePlayListName}
          type="text"
          value={playListName}
          />
        <button
          type="submit"
          >
          Save Playlist
        </button>
      </form>
    </div>
  );
}
