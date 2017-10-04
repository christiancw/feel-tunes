import React from 'react';

export default function SaveButton (props) {
  const handleSave = props.handleSave;

  return (
    <div className="save-button">
      <form
        onSubmit={handleSave}>
        <button
          type="submit"
          >
          Save Playlist
        </button>
      </form>
    </div>
  );
}
