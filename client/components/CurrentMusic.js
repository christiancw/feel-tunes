import React, { Component } from 'react';

export default class CurrentMusic extends Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: props.currentMusic,
      fetchingMusic: props.fetchingMusic
    };
  }

  render (){
    const tracks = this.props.currentMusic;
    return (
      <div className="track-response">
        {tracks.length > 0 ?
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
          : null
        }
      </div>
    );
  }
}
