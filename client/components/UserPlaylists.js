import React from 'react';
import { connect } from 'react-redux';
import { getPlaylists } from '../reducer/savedplaylists';

const UserPlaylists = props => {

  const { id } = props;

  return (
    <div>
      <h4>Your Playlists</h4>
      <ul>
        {this.state.userLists.map(playlist => <li>`${playlist.name}`</li>)}
      </ul>
    </div>
  );
};

const mapState = ({ user }) => ({
  email: user.email,
  id: user.id
});

const mapDispatch = dispatch => {
  return {
    findPlaylists: function(userId){
      const action = getPlaylists(userId);
      dispatch(action);
    }
  }
}

export default connect(mapState, mapDispatch)(UserPlaylists);
