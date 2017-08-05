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
      self.props.addMessage(payload.message.message);
    });

    this.props.socket.on('receive notification', (channelId) => {
      if(self.props.channelId !== channelId){
        self.props.addNotification(channelId);
      }
    });

    this.props.socket.on('receive emoticon', (payload) => {
      self.props.addEmoticon(payload.message.updatedMessage);
    });

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillReceiveProps(newProps){
    if(!this.props.channel && newProps.channel){
      this.props.socket.emit('join channel', {channel: newProps.channelId});
      this.props.fetchChannelMessages(newProps.channelId);
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
    if (this.props.channel === undefined) return <p></p>; // TODO

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
            render={() => <Detail channel={this.props.channel} channelId={this.props.channelId}/>}/>
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
        {this.scrollToBottom()}
      </section>
    );
  }

}

export default ChatList;
