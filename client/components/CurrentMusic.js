import React from 'react';

export default function CurrentMusic (props) {
  const tracks = props.currentMusic;
  // const tracks = currentMusic.tracks;
  console.log('CurrentMusicPROPS', props)

  return (
    <div>
      <h2>Tracks</h2>
      {tracks && tracks.map(track => {
        return (
          <ul key={track.id}>
            <li>{track.name}</li>
          </ul>
        );
      })}
    </div>
  );
}
