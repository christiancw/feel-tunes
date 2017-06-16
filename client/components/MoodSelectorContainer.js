import React, { Component } from 'react';
import MoodSelector from './MoodSelector';
import { getMusic } from '../reducer/music';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    newMusic: function (selectedMood) {
      const action = getMusic(selectedMood)
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
    console.log(this.state.moodValue)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('anything', this.state.moodValue);
    // this.props.setMood(this.state.moodValue);
  }

  render (props) {
    console.log('MoodSelectorContainer')
    return (
      <MoodSelector
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        moodValue={this.moodValue}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodSelectorContainer);
