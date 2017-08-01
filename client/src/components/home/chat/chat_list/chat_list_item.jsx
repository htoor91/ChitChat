import React from 'react';
import moment from 'moment';

class ChatListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let messageContent = this.props.message.content;
    let time = moment(this.props.message.createdAt).format('h:mm a');

    return(
      <li className="chat-message">
        <div className="message-content-container">
          <img id="message-avi" src={this.props.message.userId.aviUrl }/>
          <div className="message-content">
            <span id="message-author">{this.props.message.userId.username}</span> <span id="message-time">{time}</span>
            <br />
            {messageContent}
          </div>
        </div>
      </li>
    );
  }
}

export default ChatListItem;
