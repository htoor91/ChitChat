import React from 'react';
import { withRouter } from 'react-router-dom';
import FAClose from 'react-icons/lib/fa/close';


class CreationForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      private: this.props.private,
      allUsers: "",
      selectedUsers: [this.props.user],
      errors: []
    };

    this.createChannel = this.createChannel.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.deselectUser = this.deselectUser.bind(this);
  }

  componentDidMount(){
    this.props.fetchUsers();
    if(this.state.private){
      this.setState({
        name: "DM"
      });
    }
  }

  update(field){
    return (e) => {
      this.setState({ errors: [] });
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  clearErrors(){
    this.props.clearErrors();
    this.setState({ errors: [] });
  }

  selectUser(user) {
    this.clearErrors();
    if (user.username !== this.props.user.username && !(this.state.selectedUsers.includes(user))) {
      let currentSelectedUsers = this.state.selectedUsers;
      currentSelectedUsers.push(user);
      this.setState({selectedUsers: currentSelectedUsers});
      $('#new-channel-add-users-input').focus();
    }
  }

  deselectUser(user) {
    event.preventDefault();
    this.clearErrors();
    let i = this.state.selectedUsers.indexOf(user);
    let newSelectedUsers = this.state.selectedUsers.slice(0, i).concat(this.state.selectedUsers.slice(i+1));
    this.setState({selectedUsers: newSelectedUsers});
  }

  isDuplicate(channelArr, channelName){
    const sortedChannelName = channelName.split('').sort().join();
    for(let i = 0; i < channelArr.length; i++){
      if(channelArr[i].split('').sort().join() === sortedChannelName){
        return true;
      }
    }
    return false;
  }

  createChannel(e){
    e.preventDefault();
    const allChannelNames = this.props.publicChannels.map((channel) => {
      return channel.name;
    });

    const allPrivateChannelNames = this.props.privateChannels
    .map(channel => channel.name);

    let duplicate = false;

    this.clearErrors();

    if(this.state.name === ""){
      let newErrors = this.state.errors;
      if(newErrors[0] !== "Please enter a title!"){
        newErrors.push("Please enter a title!");
      }
      this.setState({ errors: newErrors});
    } else if(!this.state.private && allChannelNames.includes(this.state.name)){
      let newErrors = this.state.errors;
      if(newErrors[0] !== "That channel name already exists!"){
        newErrors.push("That channel name already exists!");
      }
      this.setState({ errors: newErrors});
    } else if(this.state.private && this.state.selectedUsers.length < 2){
      let newErrors = this.state.errors;
      if(newErrors[0] !== "Please select at least one user to DM with!"){
        newErrors.push("Please select at least one user to DM with!");
      }
      this.setState({ errors: newErrors});
    } else {

      let channel = this.state;
      if(this.state.private){
        const usernames = this.state.selectedUsers
        .map((user) => user.username)
        .join(', ');

        if(this.isDuplicate(allPrivateChannelNames, usernames)){
          duplicate = true;
        } else{
          channel.name = usernames;
        }
      }

      if(duplicate){
        let newErrors = this.state.errors;
        if(newErrors[0] !== "That DM already exists!"){
          newErrors.push("That DM already exists!");
        }
        this.setState({ errors: newErrors });
      } else{
        channel.userIds = this.state.selectedUsers.map((user) => user._id);
        this.props.createChannel(channel).then((res) => {
          this.props.socket.emit('broadcast created channel',
          { channel: res, userIds: channel.userIds });
          this.props.fetchUserChannels(this.props.user._id);
          this.props.history.push(`/messages/${res.channel._id}/details`);
          this.clearErrors();
          this.props.closeModal();
        });
      }
    }
  }

  render(){
    const title = this.state.private ? "New Direct Message" : "New Channel";
    let channelInput;
    let userList;
    if(this.state.errors){
      this.state.errors.forEach((error) => {
        this.props.errors.push(error);
      });
    }

    const errors = this.props.errors.map((error, i) => (
      <li className="creation-form-error-item" key={`error-${i}`}>
        {error}
      </li>
    ));
    if(!this.state.private){
      channelInput = (
        <input type="text"
          id="new-channel-title"
          value={this.state.name}
          onChange={this.update('name')}
          className="new-channel-input"
          placeholder="Channel Name"
        />
      );
    }

    const selectedUsers = this.state.selectedUsers.map((selectedUser, idx) => {
      let deselect;
      if(idx > 0){
        deselect = (
        <i id="delete-selected-user"
          className="fa fa-times-circle-o"
          aria-hidden="true"
          onClick={() => this.deselectUser(selectedUser)}></i>
        );
      }

      return (
        <li className="selected-user" key={`selected-${selectedUser._id}`}>
          <img src={selectedUser.aviUrl}/>
          {selectedUser.username}
          {deselect}
        </li>
      );
    });

    if(this.props.allUsers !== null){
      let filteredUsers = this.props.allUsers.filter(
        (user) => {
          return user.username.indexOf(this.state.allUsers) !== -1;
        }
      );

      userList = filteredUsers.map((user) => {
        return(
          <li
            onClick={() => this.selectUser(user)}
            className="new-channel-user-list-item"
            key={`user-list-${user._id}`}>
            <img id="user-dropdown-logo" src={user.aviUrl} />
            {user.username}
          </li>
        );
      });

    }

    return (
      <div className="creation-form-container">
        <div id="exit-new-channel" onClick={() => {
            if(this.props.errors){
              this.clearErrors();
            }
            this.props.closeModal(); }}>
          <FAClose className="fa fa-times fa-3x" aria-hidden="true"/>
        </div>
        <div className="new-channel-window">
          <form className="creation-form">
            <ul className="creation-form-errors-list">
              {errors}
            </ul>
            <h1>{title}</h1>
            {channelInput}
            <div className="creation-form-user-filter">
              <input type="text"
                id="new-channel-add-users-input"
                value={this.state.allUsers}
                onChange={this.update('allUsers')}
                className="new-channel-input"
                placeholder="Filter by username" />

              <button onClick={this.createChannel}
                id="new-channel-button"
                type="submit"
                value="Submit">Submit</button>
            </div>
            <div id="selected-users">
              <ul id="selected-users-list">
                { selectedUsers }
              </ul>
            </div>
            <ul id="all-users-list">
              { userList }
            </ul>
          </form>
        </div>
      </div>
    );
  }
}


export default withRouter(CreationForm);
