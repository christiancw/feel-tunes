import React from 'react';

export default function CurrentMusic (props) {
  const tracks = props.currentMusic;
  const handleClearButton = props.handleClearButton;
  const fetchingMusic = props.fetchingMusic;

  return (
    <div className="track-response">
      {tracks.length ?
        <div className="tracks-area"/>
        :
        null
      }
      {fetchingMusic ?
      <div className="loader"/>
      :
      null
      }
      <ul>
        {tracks && tracks.map(track => {
          return (
            <li
              key={track.id}>
              <div>
                <iframe src={`https://open.spotify.com/embed?uri=spotify%3Atrack%3A${track.id}`} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
