import React from 'react';
import ChannelListItem from '../list_item/list_item';

class ChannelList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const publicListItems = this.props.publicChannels.map((channel) =>
      <ChannelListItem
        key={channel._id}
        channel={channel} />
    );
    const privateListItems = this.props.privateChannels.map((channel) =>
      <ChannelListItem
        key={channel._id}
        channel={channel} />
    );


    return (
      <div className="all-channels">
        <h2 className="public-channels-header">Channels
          <span> ({publicListItems.length})</span>
        </h2>
        <ul className="public-channels-list">
          { publicListItems }
        </ul>
        <h2 className="private-channels-header">Direct Messages
          <span> ({privateListItems.length})</span>
        </h2>
        <ul className="private-channels-list">
          { privateListItems }
        </ul>
      </div>
    );
  }
}

export default ChannelList;
