import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGenre } from '../reducer/genre';

//I need a function, passed as a prop to each slider, that sets the value of the currentGenre to
//the selected genre on click

class Slider extends Component {
  constructor(props){
    super(props)
    console.log('slider props-->', this.props)
    this.state = {
      currentGenre: this.props.currentGenre,
      sliderValue: 0
    }
    this.onSlide = this.onSlide.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSlide(evt){
    this.props.handleSliderChange(evt.target.value, this.state.currentGenre)
  }

  onSelect(){
    console.log('CURRENT GENRE--> ', this.state)
    this.props.selectGenre(this.state.currentGenre)
  }

  render(props) {
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

// const mapStateToProps = state => {
//   console.log('mapstate', state)
//   const currentGenre = state.genre.currentGenre;
//   return {
//     currentGenre: currentGenre,
//     sliderValue: state.genre[currentGenre]
//   }
// }

export default connect(null, mapDispatchToProps)(Slider);
