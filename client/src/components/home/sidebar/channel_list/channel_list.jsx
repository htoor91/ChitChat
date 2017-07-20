import React from 'react';
import ChannelListItem from './list_item';
import Modal from 'react-modal';
import CreationForm from './creation_form';

class ChannelList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      channelModal: false,
      messageModal: false
    };

    this.modalStyle = {
      content : {
        top                   : '60%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '100%',
        height                : '140%'
      },
      overlay: {
        zIndex                : '1000'
      }
    };

    this.openChannelModal = this.openChannelModal.bind(this);
    this.openMessageModal = this.openMessageModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openChannelModal() {
    this.setState({ channelModal: true });
    this.setState({ modalOpen: true });
  }

  openMessageModal() {
    this.setState({ messageModal: true });
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ channelModal: false });
    this.setState({ messageModal: false });
    this.setState({ modalOpen: false });
  }


  render(){
    const publicListItems = this.props.publicChannels.map((channel) =>
      <ChannelListItem key={channel._id} channel={channel} />
    );
    const privateListItems = this.props.privateChannels.map((channel) =>
      <ChannelListItem key={channel._id} channel={channel} />
    );

    return (
      <div className="all-channels">
        <h2 className="public-channels-header">Channels
          <span> ({publicListItems.length})</span>
          <button
            onClick={this.openChannelModal}
            className="creation-button" />
        </h2>
        <ul className="public-channels-list">
          { publicListItems }
        </ul>

        <h2 className="private-channels-header">Direct Messages
          <span> ({privateListItems.length})</span>
          <button
            onClick={this.openMessageModal}
            className="creation-button" />
        </h2>
        <ul className="private-channels-list">
          { privateListItems }
        </ul>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={this.modalStyle}
          shouldCloseOnOverlayClick={false}
          contentLabel="Create channel modal">

          <CreationForm
            closeModal={this.closeModal}
            createChannel={this.props.createChannel}
            user={this.props.user}
            errors={this.props.errors}
            clearErrors={this.props.clearErrors}
            private={this.state.messageModal}
            allUsers={this.props.allUsers}
            fetchUsers={this.props.fetchUsers}
            fetchUserChannels={this.props.fetchUserChannels}
            publicChannels={this.props.publicChannels}/>
          </Modal>
      </div>
    );
  }
}

export default ChannelList;
