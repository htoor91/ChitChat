import React from 'react';
import ChatListItem from './chat_list_item';
import NewMessageForm from './new_message_form';
import Detail from './detail';
import { Route } from 'react-router';


class ChatList extends React.Component {
  constructor(props){
    super(props);

    const self = this;

    this.props.socket.on('receive message', (payload) => {
      if(self.props.channel){
        self.props.addMessage(payload.message.message);
        this.scrollToBottom();
      }
    });

    this.props.socket.on('receive notification', (channelId) => {
      if(self.props.channel && self.props.channelId !== channelId){
        self.props.addNotification(channelId);
      }
    });

    this.props.socket.on('receive emoticon', (payload) => {
      if(self.props.channel){
        self.props.addEmoticon(payload.message.updatedMessage);
      }
    });

    this.props.socket.on('receive updated message', (payload) => {
      if(self.props.channel){
        self.props.editMessage(payload.message.updatedMessage);
      }
    });

    this.props.socket.on('receive deleted message', (payload) => {
      if(self.props.channel){
        self.props.removeMessage(payload.message.removedMessage);
      }
    });

    this.props.socket.on('receive channel', (payload) => {
      if(self.props.channel && payload.userIds.includes(self.props.currentUser._id)){
        self.props.addChannel(payload.channel.channel);
      }
    });

    this.props.socket.on('receive new signup', (payload) => {
      self.props.addUserToChannel(self.props.channelId, payload.user);
    });

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillReceiveProps(newProps){
    if(!this.props.channel && newProps.channel){
      this.props.socket.emit('join channel', {channel: newProps.channelId});
      this.props.fetchChannelMessages(newProps.channelId).then(this.scrollToBottom);
    } else if(this.props.channelId !== newProps.channelId){
      this.props.socket.emit('leave channel', {channel: this.props.channelId});
      this.props.socket.emit('join channel', {channel: newProps.channelId});
      newProps.fetchChannelMessages(newProps.channelId).then(this.scrollToBottom);
      newProps.clearNotifications(newProps.channelId);
    }
  }

  scrollToBottom(){
    setTimeout( () => {
      const height = this.refs.chatMessages.scrollHeight;
      this.refs.chatMessages.scrollTop = height;
    }, 0);
  }

  render(){
    if (this.props.channel === undefined || !this.props.currentUser) return <p></p>;

    const messages = this.props.messages.map((message) => {
      return <ChatListItem
            key={message._id}
            message={message}
            deleteMessage={this.props.deleteMessage}
            currentUser={this.props.currentUser}
            updateMessage={this.props.updateMessage}
            createEmoticon={this.props.createEmoticon}
            socket={this.props.socket}
            channelId={this.props.channelId}/>;
        }
      );

    return (
      <section className="all-messages-container">
        <div id="chat-list-and-detail-container">
          <ul ref="chatMessages" className="chat-message-list">
            { messages }
          </ul>
          <Route exact path="/messages/:channelId/details"
            render={() => <Detail channel={this.props.channel}
            channelId={this.props.channelId}
            currentUser={this.props.currentUser}/>}/>
        </div>
        <footer id="new-message-footer">
          <NewMessageForm
            channel={this.props.channel}
            createMessage={this.props.createMessage}
            currentUser={this.props.currentUser}
            scrollToBottom={this.scrollToBottom}
            userId={this.props.currentUser._id}
            channelId={this.props.channel._id}
            socket={this.props.socket}
            fetchGifs={this.props.fetchGifs}
            giphys={this.props.giphys}/>
        </footer>
      </section>
    );
  }

}

export default ChatList;
