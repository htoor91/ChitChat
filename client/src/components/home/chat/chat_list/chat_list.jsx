import React from 'react';
import { withRouter } from 'react-router-dom';


class ChatList extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(newProps){
    if(!this.props.channel && newProps.channel){
      this.props.fetchChannelMessages(newProps.channelId);
    }
  }

  render(){
    return (
      <h1> Chat list</h1>
    );
  }
}

export default withRouter(ChatList);
