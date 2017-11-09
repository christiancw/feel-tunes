import React from 'react';

export default function CurrentMusic (props) {
  const tracks = props.currentMusic;
  const fetchingMusic = props.fetchingMusic;

  return (
    <div className="track-response">
      {fetchingMusic ?
      <div className="loader"/>
      :
      <div className="row playlist-box">
          {tracks && tracks.map((track) => {
            return (
              <div
                key={track.id}
                className="col-sm track-box"
                >
                  <iframe src={`https://open.spotify.com/embed?uri=spotify%3Atrack%3A${track.id}`} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
              </div>
            );
          })}
      </div>
      }
    </div>
  );
}
