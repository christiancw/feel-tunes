import React, { Component } from 'react';

export default class CurrentMusic extends Component {
  constructor(props){
    super(props)
    this.state = {
      tracks: props.currentMusic,
      fetchingMusic: props.fetchingMusic
    }
  }

  componentWillUpdate() {
      const scrollElement = document.querySelector('.track-response');
      console.log('this element', scrollElement);
      scrollElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end'
      });
  }

  render (props){
    console.log('this is the state', this.state)
    console.log('what are these', this.props)
    const tracks = this.props.currentMusic;
    const fetchingMusic = this.props.fetchingMusic;
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
}
