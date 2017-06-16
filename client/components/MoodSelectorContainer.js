import React, { Component } from 'react';
import MoodSelector from './MoodSelector';
import CurrentMusic from './CurrentMusic';
import { getMusic, loadMusic } from '../reducer/music';
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
      moodValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      moodValue: value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('anything', this.state.moodValue);
    this.props.newMusic(this.state.moodValue);
  }

  render (props) {
    console.log('MoodSelectorContainer', this.props.currentMusic)
    return (
      <div>
        <MoodSelector
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          moodValue={this.moodValue}
          />
        <CurrentMusic
          currentMusic={this.props.currentMusic}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentMusic: state.music.tracks
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodSelectorContainer);
