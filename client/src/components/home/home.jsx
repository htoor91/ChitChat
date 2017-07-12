import React from 'react';
import Sidebar from './sidebar/sidebar_container';
// import Chat from './chat/chat_container';

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
        <Sidebar />
      </div>
    );
  }
}

export default Home;
