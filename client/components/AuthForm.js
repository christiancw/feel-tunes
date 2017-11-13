import React from 'react';
import PropTypes from 'prop-types';

const AuthForm = props => {

  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="auth-modal">
      <div className="modal-label">{displayName}</div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="row">
          <div className="col">
            <input name="email" type="text" placeholder="Email" />
          </div>
          <div className="col">
            <input name="password" type="password" placeholder="Password" />
          </div>
        </div>
        <div>
          <button type="submit">{ displayName }</button>
        </div>
        { error &&  <div> { error.response.data } </div> }
      </form>
      <button><a href="/auth/spotify">{ displayName } with Spotify</a></button>
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
