import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../reducer/user';

const Welcome = props => {

  const { loggedIn } = props;

  return (
    <div className="welcome">
      {loggedIn ?
      <div>
        <button>
          <Link to="/app">Continue as person</Link>
        </button>
      </div> :
      <div>
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
  loggedIn: !!user.id
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Welcome);
