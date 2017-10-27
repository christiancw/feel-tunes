import React, { Component } from 'react';
import Slider from './Slider';
import { connect } from 'react-redux';
import { setCurrentGenre } from '../reducer/genre';

class SlidersModal extends Component {
  constructor(props){
    super(props)
    this.toggleModal = props.closeModal
  }

  render(props) {
    console.log('props--->', this.props)
    const genres = this.props.genres;
    const onSliderSelect = this.props.onSliderSelect;
    return (
      <div className="slider-modal-box">
        Here is a modal.
        <div className="modal-content">
          <span
            className="close"
            onClick={this.toggleModal}
            >&times;</span>
          {genres.map(genre => {
              console.log('genre--->', genre)
               return <Slider key={genre} currentGenre={genre} selectGenre={onSliderSelect} />
            })}
        </div>
      </div>
    )
  }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onSliderSelect: function(selectedGenre){
        const action = setCurrentGenre(selectedGenre);
        dispatch(action);
      }
    }
  }

  const mapStateToProps = state => {
    return {
      genres: Object.keys(state.genre.genreValues)
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SlidersModal);
