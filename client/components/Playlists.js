import React from 'react';
import { Link } from 'react-router';

export default function Playlists (props) {
  const { playlists } = props;

  return (
    <div className="myplaylists container-fluid">
      <nav className="navbar navbar-dark bg-dark">
          <Link to="/app">
            <button>
              Back
            </button>
          </Link>
      </nav>
      <div className="playlists-header">My playlists</div>
      { playlists.length > 0 ?
        <div className="playlist-holder container">
          <div className="row playlist-top">
            <div className="col-sm-4">
              Name
            </div>
            <div className="col-sm-2">
              Date Created
            </div>
            <div className="col-md-6">
              Tracks
            </div>
          </div>
            {playlists.map((playlist, index) => {
              return (
                <div
                  className={`row number-${(index % 2) + 1} justify-content-between`}
                  key={playlist.id}
                  >
                  <div className="col-sm-4">
                    {playlist.name}
                  </div>
                  <div className="col-sm-2">{playlist.updatedAt.slice(5, 10)}</div>
                  <div className="col-md-6">
                    <ul>
                      {playlist.tracks.map((track) => {
                        return (
                          <li key={btoa(track)}>
                            <a href={`https://open.spotify.com/track/${track.slice(14, track.length)}`}>{track}</a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
    : null}
    </div>
  );
}
