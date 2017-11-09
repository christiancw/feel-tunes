import React from 'react';

export default function Playlists (props) {
  const playlists = props.playlists;
  console.log('PLAYLISTS', playlists);
  console.log('type', Array.isArray(playlists))

  return (
    <div className="container-fluid">
      My playlists
      { playlists.length > 0 ?
        <div className="container-fluid">
            {playlists.map((playlist) => {
              return (
                <div
                  className="row"
                  key={playlist.id}
                  >
                  <div className="col">
                    {playlist.name}
                  </div>
                  <div className="col">{playlist.updatedAt}</div>
                  <div className="col">{playlist.tracks}</div>
                </div>
              );
            })}
        </div>
    : null}
    </div>
  );
}
