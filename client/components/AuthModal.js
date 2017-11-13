import React from 'react';
import { Login, Signup } from './Auth';

const  AuthModal = props => {
  const { handleClose, formType } = props;
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
    );
  };

export default AuthModal;
