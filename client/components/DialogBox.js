import React from 'react';

export default function DialogBox (props) {
  const tracksAreSaved = props.tracksAreSaved;

  return (
    <div className="dialog-box">
      {tracksAreSaved ?
      <div>
        Playlist Created!
      </div> : null}
    </div>
  );
}
