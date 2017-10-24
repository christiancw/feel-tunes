import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const UserHome = props => {

  const { email } = props;

  return (
    <div>
      <h3>Welcome, { email }</h3>
    </div>
  );
};

const mapState = ({ user }) => ({
  email: user.email
});

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
