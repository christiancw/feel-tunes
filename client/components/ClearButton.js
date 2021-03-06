import React from 'react';

export default function ClearButton (props) {
  const { handleClearButton } = props;
  return (
    <div className="col clear-button">
        <form
          onSubmit={handleClearButton}>
          <button
            type="submit">
            Clear Playlist
          </button>
        </form>
    </div>
  );
}
