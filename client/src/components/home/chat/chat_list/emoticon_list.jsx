import React from 'react';
import EmojiPicker from 'react-emoji-picker';
import EnhanceWithClickOutside from 'react-click-outside';

class EmoticonList extends React.Component {
  constructor(props){
    super(props);
    this.emoticonStyles = {
        position: 'absolute',
        right: '30px',
        bottom: '70px',
        backgroundColor: 'white',
        width: '344px',
        height: '270px',
        padding: '.3em .7em',
        border: '1px solid silver',
        zIndex: '2',
        borderRadius: '5px',
        overflow: 'hidden'
    };
    this.state = {
      emoticon: null,
    };

    this.setEmoticon = this.setEmoticon.bind(this);

  }

  setEmoticon(emoticon) {
    this.setState({emoticon: emoticon});
    this.props.addEmoticon(emoticon);
    this.props.toggleEmoticonDisplay();
  }

  handleClickOutside(e) {
    e.stopPropagation();
    this.props.toggleEmoticonDisplay();
  }

  render() {
    return (
      <form ref="emoticon" className="emoticon-form" id="emoticon-dropdown">
        <EmojiPicker
          style={this.emoticonStyles}
          onSelect={this.setEmoticon}
          query={this.state.emoticon} />
      </form>
    );
  }
}

export default EnhanceWithClickOutside(EmoticonList);
