import React from 'react';
import '../index.scss';
import { Link } from 'react-router';

export default function Navbar (props) {

const { loggedIn, handleClick, handleLoginButton, handleSignupButton } = props;

  return (
    <nav className="navbar sticky-top navbar-dark bg-dark" id="main-nav">
      {
        loggedIn ?
        <div>
          <div className="nav-item nav-link buttons-nav">
            <button
              onClick={handleClick}>
              Log Out
            </button>
            <button>
              <Link to="/userplaylists">My Playlists</Link>
            </button>
          </div>
        </div>
        :
        <div  className="nav-item nav-link buttons-nav">
            <button
              onClick={handleLoginButton}>Log In
            </button>
            <button
              onClick={handleSignupButton}>
              Sign Up
            </button>
        </div>
      }
    </nav>
  );
}
