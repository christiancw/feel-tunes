import React from 'react';

export default function SaveButton (props) {
  const handleSave = props.handleSave;
  const handlePlayListName = props.handlePlayListName;
  const playListName = props.playListName;

  console.log('savebutton props-->', props)

  return (
      <form
        onSubmit={handleSave}
        className="save-button col-10">
        <input
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
  );
}
