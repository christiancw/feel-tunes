import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../reducer/user';
import { getLoginForm, getSignupForm, clearForm } from '../reducer/authForm';
import Navbar from './Navbar';
import MoodSelectorContainer from './MoodSelectorContainer';
import AuthModal from './AuthModal';

// Component //

const Main = props => {

  const { children, handleClick, loggedIn, formOpen, formType, handleLoginButton, handleSignupButton, handleClose } = props;

  return (
    <div className="mainClass container-fluid">
        <Navbar
          loggedIn={loggedIn}
          handleClick={handleClick}
          handleLoginButton={handleLoginButton}
          handleSignupButton={handleSignupButton}
          handleClose={handleClose} />
        { children }
        {formOpen ?
        <div>
          <AuthModal
            handleClose={handleClose}
            formType={formType} />
        </div> : null}
        <MoodSelectorContainer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

// Container //

const mapState = ({ user, authForm }) => ({
  loggedIn: !!user.id,
  formOpen: authForm.formOpen,
  formType: authForm.type
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  },
  handleLoginButton () {
    dispatch(getLoginForm());
  },
  handleSignupButton () {
    dispatch(getSignupForm());
  },
  handleClose () {
    dispatch(clearForm());
  }
});

export default connect(mapState, mapDispatch)(Main);
