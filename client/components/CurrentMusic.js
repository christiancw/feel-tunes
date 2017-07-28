import React from 'react';

export default function CurrentMusic (props) {
  const tracks = props.currentMusic;
  console.log('CurrentMusicPROPS', props)

  return (
    <div>
      {tracks.length ?
        <div className="something">
          Here's the music
        </div> :
        <div className="something">
          This is where tracks will appear
        </div>
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
