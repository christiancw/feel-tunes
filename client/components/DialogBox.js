import React from 'react';

export default function DialogBox (props) {
  const { tracksAreSaved } = props;

  return (
    <div className="dialog-box">
      {tracksAreSaved ?
      <div className="alert alert-success" role="alert">
        Playlist created and saved.
      </div>
      : null}
    </div>
  );
}
