import React, { Component } from 'react';
import MoodSelector from './MoodSelector';
import { setMood } from '../reducer/mood'; //<---TODO: add actioncreator to a reducer
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    setMood (selectedMood) {
      dispatch(setMood(selectedMood));
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
    this.props.setMood(this.state.moodValue);
  }

  render () {
    return (
      <MoodSelector
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      moodValue={this.moodValue}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MoodSelectorContainer);
