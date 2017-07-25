import React from 'react';

class ChatListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let messageContent = this.props.message.content;

    return(
      <li className="chat-message">
        <div className="message-content-container">
          <img />
          <div className="message-content">
            <span id="message-author">{this.props.message.userId.username}</span> <span id="message-time">{this.props.message.createdAt}</span>
            <br />
            {messageContent}
          </div>
        </div>
      </li>
    );
  }
}

export default ChatListItem;
