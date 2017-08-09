import React from 'react';
import Sidebar from './sidebar/sidebar_container';
import { Route } from 'react-router';
import Chat from './chat/chat';
import io from 'socket.io-client';
const socket = io();

class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.loggedIn){
      this.props.history.push('/');
    }
  }

  render(){
    return (
      <div className="home-container">
        <Sidebar socket={socket} />
        <Route path="/messages/:channelId"
          render={ () => <Chat socket={socket}/>}/>
      </div>
    );
  }
}

export default Home;
