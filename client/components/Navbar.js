import React from 'react';
import '../index.scss';
import { Link } from 'react-router';

export default function Navbar (props) {
console.log('navProps-->', props);
const loggedIn = props.loggedIn;
const handleClick = props.handleClick;
  return (
    <div className="nav">
      {
        loggedIn ?
        <button
          onClick={handleClick}>
          Log Out
        </button> :
        <button>
          <Link to="/login">Log In</Link>
        </button>
      }
    </div>
  );
}
