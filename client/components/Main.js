import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../reducer/user';
import Navbar from './Navbar';

// Component //

const Main = props => {

  const { children, handleClick, loggedIn } = props;

  return (
    <div>
      <div>
        <Navbar
          loggedIn={loggedIn}
          handleClick={handleClick} />
        { children }
      </div>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

// Container //

const mapState = ({ user }) => ({
  loggedIn: !!user.id
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
