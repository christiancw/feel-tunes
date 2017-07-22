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
                {track.name}
                <img src={track.album.images[0].url} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
