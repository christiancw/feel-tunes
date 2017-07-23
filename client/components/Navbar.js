import React from 'react';
import '../index.scss';
import { Link } from 'react-router';

export default function Navbar (props) {

  return (
    <div className="nav">
      <button>
        <Link to="/login">Log In</Link>
      </button>
    </div>
  )
}
