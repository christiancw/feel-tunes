import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGenre } from '../reducer/genre';

class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentGenre: props.currentGenre,
      sliderValue: props.sliderValue
    }
    this.onSlide = this.onSlide.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSlide(evt){
    this.props.handleSliderChange(evt.target.value, this.state.currentGenre)
  }

  onSelect(){
    this.props.selectGenre(this.state.currentGenre);
  }

  render() {
    return (
      <div id="slidecontainer" onClick={this.onSelect}>
        <input type="range" min="1" max="100" value={this.props.sliderValue} className="slider" id="myRange" onChange={this.onSlide} />
        <label htmlFor="slider">{this.state.currentGenre}</label>
    </div>
  );}
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSliderChange: function(sliderValue, currentGenre){
      const action = setGenre(sliderValue, currentGenre);
      dispatch(action);
    }
  }
}

const mapStateToProps = state => {
  const currentGenre = state.genre.currentGenre;
  return {
    sliderValue: state.genre.genreValues[currentGenre]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
