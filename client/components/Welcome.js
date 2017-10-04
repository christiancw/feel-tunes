import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../reducer/user';

const Welcome = props => {

  const { loggedIn, userName } = props;

  return (
    <div className="welcome">
      {loggedIn ?
      <div className="welcome-buttons">
        <button>
          <Link to="/app">Continue as {userName}</Link>
        </button>
      </div> :
      <div className="welcome-buttons">
        <div>
          <button>
            <Link to="/login">Log In</Link>
          </button>
        </div>
        <div>
          <button>
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
        <div>
          <button>
            <Link to="/app">Continue as Guest</Link>
          </button>
        </div>
      </div>
    }
    </div>
  );
}

const mapState = ({ user }) => ({
  loggedIn: !!user.id,
  userName: user.spotifyId || null,
  accessToken: user.accessToken || null,
  refreshToken: user.refreshToken || null
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Welcome);
