import React from 'react';
import '../index.scss';
import { Link } from 'react-router';

export default function Navbar (props) {
const loggedIn = props.loggedIn;
const handleClick = props.handleClick;
const handleLoginButton = props.handleLoginButton;
const handleSignupButton = props.handleSignupButton;
  return (
    <nav className="navbar sticky-top navbar-dark bg-dark" id="main-nav">
      {
        loggedIn ?
        <div>
          <div className="nav-item nav-link">
            <button
              onClick={handleClick}>
              Log Out
            </button>
          </div>
          <div className="nav-item nav-link">
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
