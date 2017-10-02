import React from 'react';

export default function CurrentMusic (props) {
  const tracks = props.currentMusic;
  const handleClearButton = props.handleClearButton;
  const fetchingMusic = props.fetchingMusic;
  const setColumn = num => {
    if (num % 3 === 0){
      return 'col-left';
    }
    if (num % 3 === 1){
      return 'col-middle';
    }
    if (num % 3 === 2){
      return 'col-right';
    }
  };

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
      <ul>
          {tracks && tracks.map((track, index) => {
            return (
              <li
                key={track.id}
                className={setColumn(index)}
                >
                <div>
                  <iframe src={`https://open.spotify.com/embed?uri=spotify%3Atrack%3A${track.id}`} width="300" height="380" frameBorder="0" allowTransparency="true"></iframe>
                </div>
              </li>
            );
          })}
      </ul>
      }
    </div>
  );
}
