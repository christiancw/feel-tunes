import React, { Component } from 'react';

export default function SlidersModal (props) {
  const toggleModal = props.closeModal;
  return (
    <div className="slider-modal-box">
        Here is a modal.
        <div className="modal-content">
          <span className="close"
            onClick={toggleModal}
            >&times;</span>
          Bla bla bla
        </div>
      </div>
    )
  }
