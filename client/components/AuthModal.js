import React from 'react';
import { Login, Signup } from './Auth';
// import { connect } from 'react-redux';
// import { setCurrentGenre } from '../reducer/genre';

export default function AuthModal (props) {
  const handleClose = props.handleClose;
  const formType = props.formType;
  return (
      <div className="slider-modal-box">
        <div className="modal-content">
          <span
            className="close"
            onClick={handleClose}
            >&times;</span>
          {(formType === 'Login') ?
            <Login /> :
              <Signup />
          }
        </div>
      </div>
    )}
