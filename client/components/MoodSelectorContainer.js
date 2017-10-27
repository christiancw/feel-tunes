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
      const action = loadMusic(selectedMood, genres)
      dispatch(action);
    },
    saveMusic: function (tracks, user, name) {
      console.log(tracks, user);
      const action = sendTracks(tracks, user, name)
      dispatch(action);
    },
    clearMusic: function () {
      const action = clearTracks()
      dispatch(action);
    }
  }
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
      if (inputString.split(' ').length < 3 ){
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
    console.log('props in save -->', this.props)
    console.log('this is the event--->', evt)
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
    console.log('handling state', this.state.playlistName)
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

  render (props) {
    // console.log('PROPS--->', this.props)
    console.log('state passed plalist', this.state.playlistName);
    return (
      <div>
        <div>
          <MoodSelector
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            moodValue={this.state.moodValue}
            buttonDisabled={this.state.buttonDisabled}
            />
          {this.state.modalOpen ?
            <SlidersModal
              closeModal={this.closeModal}
              />
            : null
          }
          {this.props.currentMusic.length !== 0 ?
            <div>
              {this.state.playlistNameable ?
                <div>
                  <SaveButton
                    handleSave={this.handleSave}
                    handlePlayListName={this.handlePlayListName}
                    playlistName={this.state.playlistName}
                    />
                </div>
                : null
              }
              <div>
                <ClearButton
                  handleClearButton={this.handleClearButton}
                  />
                <DialogBox
                  tracksAreSaved={this.props.savedMusic}
                  />
              </div>
            </div>
            : null}
            <CurrentMusic
              currentMusic={this.props.currentMusic}
              fetchingMusic={this.props.fetchingMusic}
              />
          </div>
          <div>
            <ToggleModal
              openModal={this.openModal}
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
