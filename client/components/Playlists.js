import React from 'react';

export default function Playlists (props) {
  const playlists = props.playlists;
  console.log('PLAYLISTS', playlists);
  console.log('type', Array.isArray(playlists))

  return (
    <div>
      These are playlists.
      { playlists.length > 0 ?
        <ul>
            {playlists.map((playlist) => {
              return (
                <li
                  key={playlist.id}
                  >
                  {playlist.name}
                </li>
              );
            })}
        </ul>
    : null}
    </div>
  );
}
