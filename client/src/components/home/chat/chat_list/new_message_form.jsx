import React from 'react';
import { withRouter } from 'react-router';
import EmoticonList from './emoticon_list';
import GiphySearch from './giphy_search';
import Giphy from '../../../../util/giphy_util';


class NewMessageForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      channelId: this.props.channelId,
      userId: this.props.userId,
      content: '',
      emoticonListOpen: false,
      giphyOpen: false
    };

    this.updateContent = this.updateContent.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.clearState = this.clearState.bind(this);
    this.toggleEmoticonDisplay = this.toggleEmoticonDisplay.bind(this);
    this.openEmoticonDisplay = this.openEmoticonDisplay.bind(this);
    this.addEmoticon = this.addEmoticon.bind(this);
    this.toggleGiphySearch = this.toggleGiphySearch.bind(this);
    this.addGiphy = this.addGiphy.bind(this);
    this.translateGif = this.translateGif.bind(this);
    this.setGiphyAutocomplete = this.setGiphyAutocomplete.bind(this);
  }

  createMessage(custom=null){
    const msg = this.state;
    if(custom){
      msg.content = custom;
    }
    this.state.channelId = this.props.match.params.channelId;
    this.props.createMessage(msg).then((createdMsg) => {
      this.props.scrollToBottom();
      this.props.socket.emit('broadcast message',
      { message: createdMsg, channel: this.state.channelId });
    });

    this.clearState();
  }

  updateContent(e){
    this.setState({content: e.currentTarget.value});
  }

  translateGif(){
    const searchTerm = this.state.content.split(' ').slice(1).join(' ');

    return new Promise((resolve, reject) => {
      Giphy.translateToGif(searchTerm).then((giphy) => {
        return resolve('giphy:' + giphy.data.images.fixed_height.url + ' ' + searchTerm);
      });
    });
  }

  handleKeyPress(e){
    if (e.key === 'Enter' && this.state.content.length > 0) {
      this.setState({
        userId: this.props.userId,
        channelId: this.props.channelId
      });
      if(this.state.content.startsWith('/giphy ')){
        this.translateGif().then((custom) => {
          this.createMessage(custom);
        });
      } else {
        this.createMessage();
      }
    }
  }

  clearState(){
    this.setState({content: ''});
  }

  toggleEmoticonDisplay(){
    this.setState({ emoticonListOpen: !this.state.emoticonListOpen });
  }

  openEmoticonDisplay(e){
    if(e.target.src === "https://twemoji.maxcdn.com/svg/1f603.svg" ||
    e.target.src === "https://twemoji.maxcdn.com/svg/1f331.svg" ||
    e.target.src === "https://twemoji.maxcdn.com/svg/1f52d.svg" ||
    e.target.src === "https://twemoji.maxcdn.com/svg/1f6b2.svg" ||
    e.target.src === "https://twemoji.maxcdn.com/svg/1f522.svg" ||
    e.target.classList.value === "fa fa-smile-o" ||
    e.target.id === "emoticon-toggle"){
      this.setState({emoticonListOpen: true});
    } else {
      this.setState({ emoticonListOpen: false});
    }

  }

  addEmoticon(emoticon){
    if(this.state.content){
      this.setState({content: this.state.content + " " + emoticon});
    } else {
      this.setState({content: emoticon});
    }
    $(".message-content-input").focus();
  }

  toggleGiphySearch() {
    this.setState({ giphyOpen: !this.state.giphyOpen });
  }

  addGiphy(giphy, searchTerm) {
    const custom = `giphy:${giphy} ${searchTerm}`;
    this.clearState();
    this.createMessage(custom);
    $(".message-content-input").focus();
  }

  setGiphyAutocomplete(){
    this.clearState();
    this.setState({ content: '/giphy '});
    $(".message-content-input").focus();
  }

  render(){
    let emoticonList;
    let giphySearch;
    let placeholder;
    let giphyAutocomplete;
    if(this.state.emoticonListOpen){
      emoticonList = <EmoticonList
        addEmoticon={this.addEmoticon}
        toggleEmoticonDisplay={this.toggleEmoticonDisplay}/>;
    }
    if (this.state.giphyOpen) {
        giphySearch = (
          <GiphySearch
            addGiphy={this.addGiphy}
            toggleGiphySearch={this.toggleGiphySearch}
            fetchGifs={this.props.fetchGifs}
            giphys={this.props.giphys}/>
        );
    }

    if(this.props.channel.private){
      let usernames = this.props.channel.name
      .split(', ')
      .filter(username => username !== this.props.currentUser.username)
      .join(', ');

      placeholder = "Message @" + usernames;
    } else {
      placeholder = "Message #" + this.props.channel.name;
    }

    if(this.state.content && '/giphy'.indexOf(this.state.content) === 0){
      giphyAutocomplete = (
        <div id="giphy-autocomplete" onClick={this.setGiphyAutocomplete}>
          <p><span>/giphy</span> [text]</p>
          <p>Post a random gif to channel</p>
        </div>
      );
    }

    return (
      <div id="new-message-input">
        <div id="new-message-giphy" onClick={this.toggleGiphySearch}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </div>
        {giphyAutocomplete}
        <input
          className="message-content-input"
          onChange={this.updateContent}
          type="text"
          value={this.state.content}
          onKeyPress={this.handleKeyPress}
          placeholder={placeholder}
          autoComplete="off"/>
        <div id="emoticon-toggle" onClick={this.openEmoticonDisplay}>
          {emoticonList}
          <i className="fa fa-smile-o"
            aria-hidden="true"></i>
         </div>
         {giphySearch}
      </div>
    );
  }
}

export default withRouter(NewMessageForm);
