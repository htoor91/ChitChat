import React from 'react';
import { withRouter } from 'react-router';


class NewMessageForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      channelId: this.props.channelId,
      userId: this.props.userId,
      content: '',
    };

    this.updateContent = this.updateContent.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  createMessage(){
    const msg = this.state;
    this.state.channelId = this.props.match.params.channelId;
    this.props.createMessage(msg).then(this.props.scrollToBottom);
    this.clearState();
  }

  updateContent(e){
    this.setState({content: e.currentTarget.value});
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.setState({userId: this.props.userId, channelId: this.props.channelId} );
      this.createMessage();
    }
  }

  clearState(){
    this.setState({content: ''});
  }

  render(){
    const placeholder = "Enter message here";

    return (
      <div id="new-message-input">
        <input
          id="message-content-input"
          onChange={this.updateContent}
          type="text"
          value={this.state.content}
          onKeyPress={this.handleKeyPress}
          placeholder={placeholder} />
      </div>
    );
  }
}

export default withRouter(NewMessageForm);
