import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const AuthForm = props => {

  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <div>
        <button>
          <Link to="/welcome">Back</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{ displayName }</button>
        </div>
        { error &&  <div> { error.response.data } </div> }
      </form>
      <a href="/auth/spotify">{ displayName } with Spotify</a>
    </div>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
