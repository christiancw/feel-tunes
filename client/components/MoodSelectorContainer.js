import React, { Component } from 'react';
import MoodSelector from './MoodSelector';
import CurrentMusic from './CurrentMusic';
import ClearButton from './ClearButton';
import SaveButton from './SaveButton';
import DialogBox from './DialogBox';
import SlidersModal from './SlidersModal';
import ToggleModal from './ToggleModal';
import { loadMusic, sendTracks, clearTracks } from '../reducer/music';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    newMusic: function (selectedMood, genres) {
      const action = loadMusic(selectedMood, genres);
      dispatch(action);
    },
    saveMusic: function (tracks, user, name) {
      const action = sendTracks(tracks, user, name);
      dispatch(action);
    },
    clearMusic: function () {
      const action = clearTracks();
      dispatch(action);
    }
  };
};

class MoodSelectorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moodValue: '',
      buttonDisabled: true,
      currentUser: this.props.currentUser,
      playListName: '',
      playlistButtondisabled: false,
      playlistNameable: false,
      modalOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClearButton = this.handleClearButton.bind(this);
    this.handlePlayListName = this.handlePlayListName.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    const checkInput = inputString => {
      if (inputString.split(' ').length <= 5 ){
        return true;
      }
      else {
        return false;
      }
    }
    this.setState({
      moodValue: value,
      buttonDisabled: checkInput(value)
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.newMusic(this.state.moodValue, this.props.genreValues);
    this.setState({
      moodValue: '',
      playlistNameable: true
    });
  }

  handleSave(evt) {
    evt.preventDefault();
    this.props.saveMusic(this.props.currentMusic, this.props.currentUser, this.state.playlistName);
    this.setState({
      playlistName: '',
      playlistNameable: false
    });
  }

  handlePlayListName(evt){
    const playListName = text => {
      if (text.length > 0 && text.length < 30){
        return true;
      }
      else {
        return false;
      }
    }
    this.setState({
      playlistName: evt.target.value
    });
  }

  handleClearButton(evt) {
    evt.preventDefault();
    this.props.clearMusic();
  }

  openModal(){
    this.setState({
      modalOpen: true
    });
  }

  closeModal(){
    this.setState({
      modalOpen: false
    });
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="container-fluid music-selector">
          <div className="form-holder container">
            <div className="form-instructions">Write down some feelings, get music to match!</div>
            <MoodSelector
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              moodValue={this.state.moodValue}
              buttonDisabled={this.state.buttonDisabled}
              />
            {this.props.fetchingMusic ?
              <div className="slider-modal-box">
                <div className="loader-modal-content">
                  <div className="loader" />
                </div>
              </div>
             : null
            }
            {this.state.modalOpen ?
              <SlidersModal
                closeModal={this.closeModal}
                />
              : null
            }
            <ToggleModal
              openModal={this.openModal} />
          </div>
          {this.props.currentMusic.length !== 0 ?
            <div className="scroll-down-text">
              Scroll down for playlist
              <div className="arrow-down">
                <a href="#playlists">
                  <i className="fa fa-angle-double-down fa-2x" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            : null
          }
          </div>
        <div className="container bottom">
          {this.props.currentMusic.length !== 0 ?
            <div className="row tracks-console" id="playlists">
              {this.state.playlistNameable ?
                  <SaveButton
                    handleSave={this.handleSave}
                    handlePlayListName={this.handlePlayListName}
                    playlistName={this.state.playlistName}
                    />
                : null
              }
                <ClearButton
                  handleClearButton={this.handleClearButton}
                  />
                <DialogBox
                  tracksAreSaved={this.props.savedMusic}
                  />
            </div>
            : null}
            <CurrentMusic
              currentMusic={this.props.currentMusic}
              fetchingMusic={this.props.fetchingMusic}
              />
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentMusic: state.music.tracks,
    fetchingMusic: state.music.isFetchingMusic,
    currentUser: state.user,
    savedMusic: state.music.tracksAreSaved,
    genreValues: state.genre.genreValues
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodSelectorContainer);
