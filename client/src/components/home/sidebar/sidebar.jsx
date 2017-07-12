import React from 'react';
import ChannelList from './channel_list/channel_list_container';
import DirectMessages from './direct_messages/dm_list_container';


class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchUserChannels(this.props.user._id);
  }

  render(){
    const username = this.props.user.username;
    return(
      <div className="sidebar-container">
        <h1>ChitChat</h1>
        <h2>{username}</h2>
        <ChannelList />
      </div>
    );
  }
}

export default Sidebar;
