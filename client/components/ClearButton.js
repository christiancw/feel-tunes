import React from 'react';

export default function ClearButton (props) {
  const handleClearButton = props.handleClearButton;

  return (
    <div className="clear-button">
      <div>
        <form
          onSubmit={handleClearButton}>
          <button
            type="submit"
            >
            Clear Playlist
          </button>
        </form>
      </div>
    </div>
  );
}
