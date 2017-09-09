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

  render (props) {
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
          fetchingMusic={this.props.fetchingMusic}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('HELLOOO')
  return {
    currentMusic: state.music.tracks,
    fetchingMusic: state.music.isFetchingMusic
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodSelectorContainer);
