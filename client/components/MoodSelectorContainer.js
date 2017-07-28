import React, { Component } from 'react';
import MoodSelector from './MoodSelector';
import CurrentMusic from './CurrentMusic';
import { loadMusic } from '../reducer/music';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    newMusic: function (selectedMood) {
      const action = loadMusic(selectedMood)
      dispatch(action);
    }
  };
};

class MoodSelectorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moodValue: '',
      buttonDisabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log('anything', this.state.moodValue);
    this.props.newMusic(this.state.moodValue);
    this.setState({
      moodValue: ''
    });
  }

  // handleClearButton(evt) {
  //   this.setState({
  //     moodValue: ''
  //   });
  // }
  handleClearButton(evt){
    console.log('clearstate-->', this.state)
  }

  render (props) {
    console.log('MoodSelectorContainer', this.props.currentMusic)
    console.log('CURSTATE', this.state);
    console.log('moodval', this.moodValue);
    return (
      <div>
        <MoodSelector
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          moodValue={this.state.moodValue}
          buttonDisabled={this.state.buttonDisabled}
          />
        <CurrentMusic
          currentMusic={this.props.currentMusic}
          handleClearButton={this.handleClearButton}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('STATE OF MUSIC', state)
  return {
    currentMusic: state.music.tracks
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodSelectorContainer);
