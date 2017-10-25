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
    console.log('propsonload', this.props)
    console.log('STATE', this.state)
    this.props.findPlaylists(this.props.id)
  }

  render (){
    console.log('propsinrender', this.props)
    return (
      <div className="user-playlists">
        <h4>Your Playlists</h4>
        <Playlists
          playlists={this.props.userLists}
          />
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
