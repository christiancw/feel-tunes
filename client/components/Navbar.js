import React from 'react';
import '../index.scss';
import { Link } from 'react-router';

export default function Navbar (props) {
const loggedIn = props.loggedIn;
const handleClick = props.handleClick;
  return (
    <div className="nav">
      <div>
        <button>
          <Link to="/welcome">Home</Link>
        </button>
      </div>
      {
        loggedIn ?
        <button
          onClick={handleClick}>
          Log Out
        </button> :
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
        </div>
      }
    </div>
  );
}
