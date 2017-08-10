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

  componentWillReceiveProps(newProps){
    if (this.props.messageId === ':messageId' &&
      newProps.firstChannel !== undefined) {
        newProps.history.push(`/messages/${newProps.firstChannel._id}/details`);
    } else if(!newProps.user){
      this.props.logout();
    }
  }

  render(){
    let username;
    if(this.props.user){
      username = this.props.user.username;
    }
    return(
      <div id="sidebar-container">
        <div id="sidebar-header">
          <h1>ChitChat</h1>
          <Logout logout={this.props.logout} user={this.props.user}/>
          <i id='fa-online-status' className='fa fa-circle' aria-hidden='true'>
          </i>
          <h2>{username}</h2>
        </div>
        <ChannelList socket={this.props.socket}/>
        <Footer />
      </div>
    );
  }
}

export default Sidebar;
