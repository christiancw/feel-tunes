import React from 'react';

export default function ToggleModal(props){
  const toggleModal = props.openModal;
  return (
    <div className="row toggle-modal">
      <button
        onClick={toggleModal}
        name="genrebutton"
        className="col-md-6"
        >
        Select Genres
      </button>
    </div>
  );
}
