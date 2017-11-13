import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylists } from '../reducer/savedplaylists';
import Playlists from './Playlists';

class UserPlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlaylists: this.props.userLists
    }
  }

  componentDidMount(){
    this.props.findPlaylists(this.props.id);
  }

  render (){
    return (
      <div>
        <div className="user-playlists">
          <Playlists
            playlists={this.props.userLists}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    id: state.user.id,
    userLists: state.playlist.userLists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    findPlaylists: function(userId){
      const action = getPlaylists(userId);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
