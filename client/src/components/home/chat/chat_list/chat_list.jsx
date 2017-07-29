import React from 'react';
import ChatListItem from './chat_list_item';
import NewMessageForm from './new_message_form';
import io from 'socket.io-client';
const socket = io();



class ChatList extends React.Component {
  constructor(props){
    super(props);

    const self = this;

    socket.on('receive message', (payload) => {
      self.props.addMessage(payload.message.message);
    });

    socket.on('receive notification', (channelId) => {
      if(self.props.channelId !== channelId){
        self.props.addNotification(channelId);
      }
    });

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillReceiveProps(newProps){
    if(!this.props.channel && newProps.channel){
      socket.emit('join channel', {channel: newProps.channelId});
      this.props.fetchChannelMessages(newProps.channelId);
    } else if(this.props.channelId !== newProps.channelId){
      socket.emit('leave channel', {channel: this.props.channelId});
      socket.emit('join channel', {channel: newProps.channelId});
      newProps.fetchChannelMessages(newProps.channelId).then(this.scrollToBottom);
      newProps.clearNotifications(newProps.channelId);
    }
  }

  scrollToBottom(){
    setTimeout( () => {
      let height = this.refs.chatMessages.scrollHeight;
      this.refs.chatMessages.scrollTop = height;
    }, 0);
  }

  render(){
    if (this.props.channel === undefined) return <p></p>; // TODO

    const messages = this.props.messages.map((message) => {
      return <ChatListItem
            key={message._id}
            message={message}
            deleteMessage={this.props.deleteMessage}
            currentUser={this.props.currentUser}
            updateMessage={this.props.updateMessage} />;
        }
      );

    return (
      <section className="all-messages-container">
        <div id="chat-list-and-detail-container">
          <ul ref="chatMessages" className="chat-message-list">
            { messages }
          </ul>
        </div>
        <footer id="new-message-footer">
          <NewMessageForm
            channel={this.props.channel}
            createMessage={this.props.createMessage}
            currentUser={this.props.currentUser}
            scrollToBottom={this.scrollToBottom}
            userId={this.props.currentUser._id}
            channelId={this.props.channel._id}
            socket={socket} />
        </footer>
        {this.scrollToBottom()}
      </section>
    );
  }

}

export default ChatList;
