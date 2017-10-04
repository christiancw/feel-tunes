import React, { Component } from 'react';
import MoodSelector from './MoodSelector';
import CurrentMusic from './CurrentMusic';
import ClearButton from './ClearButton';
import SaveButton from './SaveButton';
import { loadMusic, sendTracks, clearTracks } from '../reducer/music';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    newMusic: function (selectedMood) {
      const action = loadMusic(selectedMood)
      dispatch(action);
    },
    saveMusic: function (tracks, user) {
      console.log(tracks, user);
      const action = sendTracks(tracks, user)
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
      currentUser: this.props.currentUser
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClearButton = this.handleClearButton.bind(this);
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
    this.props.newMusic(this.state.moodValue);
    this.setState({
      moodValue: ''
    });
  }

  handleSave(evt) {
    evt.preventDefault();
    console.log(this.props)
    this.props.saveMusic(this.props.currentMusic, this.props.currentUser);
  }

  handleClearButton(evt) {
    evt.preventDefault();
    this.props.clearMusic();
  }

  render (props) {
    // console.log('PROPS--->', this.props)
    return (
      <div>
        <MoodSelector
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          moodValue={this.state.moodValue}
          buttonDisabled={this.state.buttonDisabled}
          />
        <SaveButton
          handleSave={this.handleSave}
          />
        <ClearButton
          handleClearButton={this.handleClearButton}
          />
        <CurrentMusic
          currentMusic={this.props.currentMusic}
          fetchingMusic={this.props.fetchingMusic}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentMusic: state.music.tracks,
    fetchingMusic: state.music.isFetchingMusic,
    currentUser: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodSelectorContainer);
