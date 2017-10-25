import React from 'react';

export default function ToggleModal(props){
  const toggleModal = props.openModal;
  return (
    <div>
      <button
        onClick={toggleModal}>
        Select Genres
      </button>
    </div>
  )
}
