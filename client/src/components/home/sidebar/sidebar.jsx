import React from 'react';
import ChannelList from './channel_list/channel_list_container';
import Logout from './logout';
import Footer from './footer';

class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchUserChannels(this.props.user._id);
  }

  // componentWillReceiveProps(newProps){
  //   if (this.props.messageId === undefined &&
  //     newProps.firstChannel !== undefined) {
  //     newProps.history.push(`/messages/${newProps.firstChannel.id}/details`);
  //   }
  // }

  render(){
    const username = this.props.user.username;
    return(
      <div className="sidebar-container">
        <h1>ChitChat</h1>
        <Logout logout={this.props.logout} user={this.props.user}/>
        <h2>{username}</h2>
        <ChannelList />
        <Footer />
      </div>
    );
  }
}

export default Sidebar;
